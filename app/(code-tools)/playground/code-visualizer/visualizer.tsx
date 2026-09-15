"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Atom, Search, Folder, Network, Files, Database, GitBranch, Box, FileCode2, Layers, Filter, Maximize, Plus, Minus, RotateCcw, ArrowUpRight } from "lucide-react";
import type { CodeGraph, CodeNode, Kind } from "./types";
import s from "./visualizer.module.css";

type Point = { x: number; y: number };
type View = "components" | "dependencies" | "files";
const colors: Record<Kind, string> = { page: "#429fff", component: "#32d69e", store: "#b17aff", context: "#eab54e", schema: "#f27c99", utility: "#7c9dba" };
const kinds = Object.keys(colors) as Kind[];
const W = 206, H = 66;
function layout(nodes: CodeNode[], edges: CodeGraph["edges"], dependencyView: boolean): Record<string, Point> {
  if (dependencyView) {
    const ordered = [...nodes].sort((a, b) => kinds.indexOf(a.kind) - kinds.indexOf(b.kind));
    return Object.fromEntries(ordered.map((n, i) => [n.id, { x: 40 + (i % 5) * 250, y: 40 + Math.floor(i / 5) * 140 }]));
  }
  // Render hierarchy determines component rows; state and schemas have separate lanes.
  const depths = new Map<string, number>();
  const page = nodes.find(n => n.id.endsWith("/new/page.tsx"));
  if (page) depths.set(page.id, 0);
  for (let i = 0; i < nodes.length; i++) for (const e of edges) {
    if (e.kind !== "renders" || !depths.has(e.from) || depths.has(e.to)) continue;
    depths.set(e.to, Math.min(5, depths.get(e.from)! + 1));
  }
  const rows = new Map<number, CodeNode[]>();
  for (const n of nodes) {
    const row = depths.get(n.id) ?? (n.kind === "store" || n.kind === "context" ? 2 : n.kind === "schema" ? 5 : 4);
    rows.set(row, [...(rows.get(row) ?? []), n]);
  }
  const result: Record<string, Point> = {};
  const columns = Math.min(4, Math.max(1, ...[...rows.values()].map(row => row.length)));
  let y = 40;
  [...rows.entries()].sort((a, b) => a[0] - b[0]).forEach(([, row]) => {
    row.forEach((n, i) => { result[n.id] = { x: 40 + ((columns - Math.min(4, row.length - Math.floor(i / 4) * 4)) * 250) / 2 + (i % 4) * 250, y: y + Math.floor(i / 4) * 140 }; });
    y += Math.ceil(row.length / 4) * 145;
  });
  return result;
}
function Source({ source }: { source: string }) {
  return <pre className={s.code}><code>{source.split("\n").map((line, i) => <span key={i} className={s.codeLine}><span className={s.lineNumber}>{i + 1}</span>{line.split(/(\b(?:import|export|from|const|function|return|type|interface|if|async|await)\b)/g).map((part, j) => <span key={j} className={/^(import|export|from|const|function|return|type|interface|if|async|await)$/.test(part) ? s.token : undefined}>{part}</span>)}</span>)}</code></pre>;
}
export default function CodeVisualizer({ graph }: { graph: CodeGraph }) {
  const [view, setView] = useState<View>("components");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(graph.nodes.find(n => n.name === "NewPurchaseView")?.id ?? graph.nodes[0].id);
  const [tab, setTab] = useState("Overview");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [enabled, setEnabled] = useState<Kind[]>(kinds);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const [dimensions, setDimensions] = useState({ width: 900, height: 590 });
  const canvas = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ start: Point; camera: typeof camera; node?: string; origin?: Point; moved: boolean } | null>(null);
  const selected = graph.nodes.find(n => n.id === selectedId)!;
  const incoming = graph.edges.filter(e => e.to === selectedId);
  const outgoing = graph.edges.filter(e => e.from === selectedId);
  const neighbors = new Set([...incoming.map(e => e.from), ...outgoing.map(e => e.to), selectedId]);
  const visible = useMemo(() => {
    const renderNodes = new Set(graph.edges.filter(e => e.kind === "renders").flatMap(e => [e.from, e.to]));
    return graph.nodes.filter(n => enabled.includes(n.kind) && (view !== "components" || renderNodes.has(n.id) || n.kind === "store" || n.kind === "context") && (!query || `${n.id} ${n.exports.join(" ")} ${n.hooks.join(" ")}`.toLowerCase().includes(query.toLowerCase())));
  }, [graph, view, query, enabled]);
  const visibleIds = new Set(visible.map(n => n.id));
  const visibleEdges = graph.edges.filter(e => visibleIds.has(e.from) && visibleIds.has(e.to) && (view !== "components" || e.kind === "renders" || graph.nodes.find(n => n.id === e.to)?.kind === "context" || graph.nodes.find(n => n.id === e.to)?.kind === "store"));
  const automatic = useMemo(() => layout(visible, graph.edges, view === "dependencies"), [visible, graph.edges, view]);
  const position = (id: string) => positions[id] ?? automatic[id] ?? { x: 0, y: 0 };
  const bounds = useMemo(() => ({ width: Math.max(450, ...Object.values(automatic).map(p => p.x + W + 40)), height: Math.max(300, ...Object.values(automatic).map(p => p.y + H + 70)) }), [automatic]);
  useEffect(() => {
    if (!canvas.current) return;
    const observer = new ResizeObserver(([entry]) => setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(canvas.current); return () => observer.disconnect();
  }, []);
  const fitted = { zoom: Math.min(1.1, dimensions.width / bounds.width, dimensions.height / bounds.height), x: 0, y: 0 };
  // Camera is relative to the fitted graph, so resizing never loses the diagram.
  const zoom = (dimensions.width < 600 ? Math.max(.65, fitted.zoom) : fitted.zoom) * camera.zoom;
  function choose(id: string) { setSelectedId(id); setTab("Overview"); }
  function fit() { setCamera({ x: 0, y: 0, zoom: 1 }); setPositions({}); }
  function changeView(next: View) { setView(next); setQuery(""); fit(); }
  function zoomBy(factor: number) { setCamera(c => ({ ...c, zoom: Math.min(4, Math.max(.35, c.zoom * factor)) })); }
  return <div className={s.shell}>
    <header className={s.header}><div className={s.brand}><Atom size={39} strokeWidth={1.5} /><div><h1>React Code Visualizer</h1><span className={s.muted}>Explore · Understand · Build better</span></div></div><label className={s.search}><Search size={18} /><input aria-label="Search files, components, or hooks" placeholder="Search components, files, hooks…" value={query} onChange={e => setQuery(e.target.value)} /><span className={s.muted}>{visible.length}</span></label><div className={s.project}><Folder size={23} /><div>tiny-gong<div className={s.muted}>Purchase feature · {graph.nodes.length} files</div></div></div></header>
    <div className={s.workspace}>
      <nav className={s.sidebar} aria-label="Code views"><span className={s.muted} style={{ padding: "0 12px 12px" }}>WORKSPACE</span><button className={s.nav} aria-pressed={view === "components"} onClick={() => changeView("components")}><Network size={18} />Component graph</button><button className={s.nav} aria-pressed={view === "files"} onClick={() => changeView("files")}><Files size={18} />File explorer</button><button className={s.nav} aria-pressed={view === "dependencies"} onClick={() => changeView("dependencies")}><GitBranch size={18} />Dependencies</button><footer><strong>Purchase scope</strong><div>{graph.nodes.length} source files</div><div>{graph.edges.length} local connections</div><div>{graph.nodes.filter(n => n.kind === "schema").length} schema files</div><Link href="/playground">← Back to playground</Link></footer></nav>
      <main className={s.center}>
        <div className={s.toolbar}><button className={s.button} aria-pressed={view === "components"} onClick={() => changeView("components")}><Network size={15} />Component graph</button><button className={s.button} aria-pressed={view === "dependencies"} onClick={() => changeView("dependencies")}><GitBranch size={15} />Dependencies</button><span className={s.spacer} /><button className={s.button} onClick={fit}><RotateCcw size={14} />Layout</button><button className={s.button} aria-pressed={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={14} />Filters</button></div>
        {filtersOpen && <div className={s.filters}>{kinds.map(kind => <label key={kind}><input type="checkbox" checked={enabled.includes(kind)} onChange={() => setEnabled(list => list.includes(kind) ? list.filter(k => k !== kind) : [...list, kind])} />{kind}</label>)}</div>}
        <div ref={canvas} className={s.canvas}>
          {view === "files" ? <div className={s.fileList}>{visible.map(n => <button key={n.id} onClick={() => choose(n.id)} aria-pressed={selectedId === n.id}><FileCode2 size={15} style={{ display: "inline", marginRight: 9, color: colors[n.kind] }} />{n.id}</button>)}</div> : <>
            <svg className={s.svg} aria-label="Purchase source code relationship graph" onPointerDown={e => { if (e.button !== 0) return; gesture.current = { start: { x: e.clientX, y: e.clientY }, camera, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => {
              const g = gesture.current; if (!g) return;
              const dx = e.clientX - g.start.x, dy = e.clientY - g.start.y;
              if (Math.abs(dx) + Math.abs(dy) > 3) g.moved = true;
              if (g.node && g.origin) setPositions(p => ({ ...p, [g.node!]: { x: g.origin!.x + dx / zoom, y: g.origin!.y + dy / zoom } }));
              else setCamera({ ...g.camera, x: g.camera.x + dx, y: g.camera.y + dy });
            }} onPointerUp={() => { gesture.current = null; }} onPointerCancel={() => { gesture.current = null; }}>
              <defs><marker id="cv-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6085ac" /></marker></defs>
              <g transform={`translate(${camera.x + (dimensions.width - bounds.width * zoom) / 2},${camera.y + (dimensions.height - bounds.height * zoom) / 2}) scale(${zoom})`}>
                {visibleEdges.map((e, i) => { const a = position(e.from), b = position(e.to); const x1 = a.x + W / 2, y1 = a.y + H, x2 = b.x + W / 2, y2 = b.y; const sameRow = a.y === b.y; const startX = sameRow ? a.x + (b.x > a.x ? W : 0) : x1; const endX = sameRow ? b.x + (b.x > a.x ? 0 : W) : x2; const startY = sameRow ? a.y + H / 2 : y1; const endY = sameRow ? b.y + H / 2 : y2; const middle = (startY + endY) / 2; const active = e.from === selectedId || e.to === selectedId;
                  return <g key={i} opacity={active ? 1 : .35}><path d={sameRow ? `M${startX},${startY} L${endX},${endY}` : `M${startX},${startY} C${startX},${middle} ${endX},${middle} ${endX},${endY}`} fill="none" stroke={active ? "#69b3ff" : "#527799"} strokeWidth={active ? 2 : 1.3} strokeDasharray={e.kind === "renders" ? undefined : "5 5"} markerEnd="url(#cv-arrow)" /><text x={(startX + endX) / 2} y={middle - 8} fill="#b3c7de" fontSize="12" textAnchor="middle" paintOrder="stroke" stroke="#09131d" strokeWidth="5">{e.kind}</text></g>;
                })}
                {visible.map(n => { const p = position(n.id); const active = n.id === selectedId; return <g key={n.id} transform={`translate(${p.x},${p.y})`} role="button" tabIndex={0} aria-label={`${n.name}, ${n.kind}`} aria-pressed={active} style={{ cursor: "grab", outline: "revert" }} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(n.id); } }} onPointerDown={e => { e.stopPropagation(); choose(n.id); gesture.current = { start: { x: e.clientX, y: e.clientY }, camera, node: n.id, origin: p, moved: false }; e.currentTarget.ownerSVGElement?.setPointerCapture(e.pointerId); }} opacity={neighbors.has(n.id) ? 1 : .65}>
                  <rect width={W} height={H} rx={12} fill={active ? "#123c3a" : "#122335"} stroke={colors[n.kind]} strokeWidth={active ? 2.5 : 1.5} /><rect x={13} y={20} width={22} height={25} rx={4} fill={`${colors[n.kind]}22`} stroke={colors[n.kind]} /><path d="M18 27h12m-12 6h9m-9 6h12" stroke={colors[n.kind]} /><text x={46} y={28} fill="#eef5ff" fontSize={17}>{n.name.length > 17 ? `${n.name.slice(0,16)}…` : n.name}</text><text x={46} y={48} fill={colors[n.kind]} fontSize={14}>{n.kind}</text><title>{n.id}</title>
                </g>; })}
              </g>
            </svg>
            <div className={s.tools}><button className={s.button} aria-label="Zoom in" onClick={() => zoomBy(1.25)}><Plus size={16} /></button><button className={s.button} aria-label="Zoom out" onClick={() => zoomBy(.8)}><Minus size={16} /></button><button className={s.button} aria-label="Fit graph" onClick={fit}><Maximize size={16} /></button></div><div className={s.legend}>{kinds.map(kind => <span key={kind}><i className={s.dot} style={{ background: colors[kind] }} />{kind}</span>)}</div>
          </>}
          {visible.length === 0 && <div className={s.empty}><p>No matching files</p><p>Change the search or enable more file types.</p></div>}
        </div>
        <div className={s.status}><span>{visible.length} files · {visibleEdges.length} connections · {Math.round(zoom * 100)}% zoom</span><span>Drag nodes or canvas · Select a node to inspect</span></div>
        <div className={s.bottom}><section className={s.panel}><div className={s.panelTitle}>Related files <span className={s.muted}>{neighbors.size - 1}</span></div><div className={s.list}>{graph.nodes.filter(n => neighbors.has(n.id) && n.id !== selectedId).map(n => <button key={n.id} className={s.related} onClick={() => choose(n.id)}><FileCode2 size={14} style={{ color: colors[n.kind], flexShrink: 0 }} />{n.name}</button>)}{neighbors.size === 1 && <p className={s.muted}>No connections in this scope.</p>}</div></section><section className={s.panel}><div className={s.panelTitle}><span>Code preview <span className={s.muted}> / {selected.name}</span></span><span className={s.muted}>Read only</span></div><Source source={selected.source} /></section></div>
      </main>
      <aside className={s.inspector} aria-label="Selected file details"><h2>File details</h2><div className={s.identity}><Box size={32} style={{ color: colors[selected.kind], flexShrink: 0 }} /><div><h3>{selected.name}</h3><span className={s.muted}>{selected.kind} · {selected.client ? "use client" : "no client directive"}</span></div></div><div className={s.file}>{selected.id}</div><div className={s.tabs} role="group" aria-label="File detail sections">{["Overview", "Props", "Hooks", "Imports"].map(t => <button key={t} className={s.button} aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}</div>
        {tab === "Overview" && <><div className={s.facts}><span>Type</span><span>{selected.kind}</span><span>Used by</span><span>{incoming.length} files in scope</span><span>Exports</span><span style={{ overflowWrap: "anywhere" }}>{selected.exports.join(", ") || "No named export detected"}</span></div><h3>Dependencies</h3>{outgoing.map(e => <button key={e.to} className={s.related} onClick={() => choose(e.to)}><Database size={14} style={{ flexShrink: 0 }} /><span>{graph.nodes.find(n => n.id === e.to)?.name}<br /><small>{e.kind} · line {e.line}</small></span></button>)}{outgoing.length === 0 && <p className={s.muted}>No local dependencies in scope.</p>}<h3 style={{ marginTop: 22 }}>Used by</h3>{incoming.map(e => <button key={e.from} className={s.related} onClick={() => choose(e.from)}><ArrowUpRight size={14} />{graph.nodes.find(n => n.id === e.from)?.name} · {e.kind}</button>)}</>}
        {tab === "Props" && <div className={s.file}>{selected.props.length ? selected.props.map(p => <p key={p}>{p}</p>) : "No standalone Props type literal detected. Inline, inferred, and imported props may still exist; see the source."}</div>}
        {tab === "Hooks" && <div>{selected.hooks.map(h => <p key={h} className={s.related}><Layers size={14} />{h}()</p>)}{!selected.hooks.length && <p className={s.muted}>No direct use-prefixed hook calls found.</p>}</div>}
        {tab === "Imports" && <div className={s.file}>{selected.imports.map(i => <p key={i}>{i}</p>)}</div>}
        <div className={s.note}><strong>Source-backed connections</strong><p>Nodes represent files. Solid arrows mean an imported symbol appears in JSX. Dashed arrows show calls, imports, or type imports.</p><p>Static analysis covers purchase/new, purchase/_schemas, purchase/_helpers, and lib/categories. It does not infer runtime state propagation, resolve re-exports, or expand shared UI packages.</p></div>
      </aside>
    </div>
  </div>;
}
