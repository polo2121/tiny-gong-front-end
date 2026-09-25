import { readFile } from "node:fs/promises";
import path from "node:path";
import DataFlowExplorer from "./visualizer";

const files = {
  purchase: "lib/purchase-draft/new-purchase-schema.ts",
  product: "lib/purchase-draft/new-purchase-schema.ts",
  variant: "lib/purchase-draft/new-purchase-schema.ts",
  group: "lib/purchase-draft/image-groups.ts",
  image: "lib/purchase-draft/new-purchase-schema.ts",
};

export default async function DataFlowPage() {
  const sources = Object.fromEntries(await Promise.all(
    Object.entries(files).map(async ([id, file]) => [id, { file, code: await readFile(path.join(process.cwd(), file), "utf8") }]),
  ));
  return <DataFlowExplorer sources={sources} />;
}
