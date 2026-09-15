export type Kind = "page" | "component" | "store" | "context" | "schema" | "utility";
export type CodeNode = { id: string; name: string; kind: Kind; source: string; exports: string[]; hooks: string[]; props: string[]; imports: string[]; client: boolean };
export type CodeEdge = { from: string; to: string; kind: "renders" | "calls" | "imports" | "type import"; symbols: string[]; line: number };
export type CodeGraph = { nodes: CodeNode[]; edges: CodeEdge[] };
