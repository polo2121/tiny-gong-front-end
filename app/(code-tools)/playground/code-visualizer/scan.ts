import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import type { CodeGraph, CodeNode, Kind } from "./types";

// Explicit source scope: no arbitrary paths, environment files, or runtime execution.
const roots = ["app/(protected)/purchase/new", "app/(protected)/purchase/_schemas", "app/(protected)/purchase/_helpers", "lib/categories"];
async function collect(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  return (await Promise.all(entries.map(e => e.isDirectory() ? collect(`${dir}/${e.name}`) : /\.[jt]sx?$/.test(e.name) ? [`${dir}/${e.name}`] : []))).flat();
}
export async function scanPurchase(): Promise<CodeGraph> {
  const files = (await Promise.all(roots.map(collect))).flat().sort();
  const known = new Set(files);
  const records = await Promise.all(files.map(async id => ({ id, source: await fs.readFile(id, "utf8") })));
  const nodes: CodeNode[] = [];
  const edges: CodeGraph["edges"] = [];
  for (const { id, source } of records) {
    const ast = ts.createSourceFile(id, source, ts.ScriptTarget.Latest, true, id.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const exports: string[] = [], hooks = new Set<string>(), props = new Set<string>(), imports: string[] = [];
    const rendered = new Set<string>(), called = new Set<string>();
    function visit(n: ts.Node) {
      if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) rendered.add(n.tagName.getText(ast));
      if (ts.isCallExpression(n)) { const name = n.expression.getText(ast); called.add(name); if (/^use[A-Z]/.test(name)) hooks.add(name); }
      if (ts.isTypeAliasDeclaration(n) && /Props$/.test(n.name.text) && ts.isTypeLiteralNode(n.type)) n.type.members.forEach(m => props.add(m.getText(ast)));
      if (ts.isFunctionDeclaration(n) && n.name && n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) exports.push(n.name.text);
      if (ts.isVariableStatement(n) && n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) n.declarationList.declarations.forEach(d => exports.push(d.name.getText(ast)));
      ts.forEachChild(n, visit);
    }
    visit(ast);
    for (const statement of ast.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
      const specifier = statement.moduleSpecifier.text; imports.push(specifier);
      const base = specifier.startsWith("@/") ? specifier.slice(2) : specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(id), specifier)) : "";
      const target = [base, ...[".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"].map(ext => base + ext)].find(p => known.has(p));
      if (!base || !target) continue;
      const clause = statement.importClause;
      const symbols: { name: string; type: boolean }[] = [];
      if (clause?.name) symbols.push({ name: clause.name.text, type: clause.isTypeOnly });
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) clause.namedBindings.elements.forEach(e => symbols.push({ name: e.name.text, type: clause.isTypeOnly || e.isTypeOnly }));
      if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)) symbols.push({name: clause.namedBindings.name.text, type: clause.isTypeOnly});
      const active = symbols.filter(s => !s.type);
      const kind = active.some(s => rendered.has(s.name)) ? "renders" : active.some(s => called.has(s.name)) ? "calls" : symbols.length > 0 && symbols.every(s => s.type) ? "type import" : "imports";
      edges.push({ from: id, to: target, kind, symbols: symbols.map(s => s.name), line: ast.getLineAndCharacterOfPosition(statement.getStart(ast)).line + 1 });
    }
    const kind: Kind = /\/page\./.test(id) ? "page" : id.includes("_stores/") ? "store" : id.includes("_context/") ? "context" : (id.includes("/schemas/") || id.includes("/_schemas/")) ? "schema" : rendered.size > 0 ? "component" : "utility";
    nodes.push({ id, name: path.basename(id).replace(/\.[^.]+$/, ""), kind, source, exports, hooks: [...hooks], props: [...props], imports, client: /^['"]use client['"]/.test(source.trim()) });
  }
  return { nodes, edges };
}
