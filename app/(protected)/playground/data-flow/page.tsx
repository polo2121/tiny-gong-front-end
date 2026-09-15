import { readFile } from "node:fs/promises";
import path from "node:path";
import DataFlowExplorer from "./visualizer";

const files = {
  purchase: "app/(protected)/purchase/_schemas/purchase-schema.ts",
  product: "app/(protected)/purchase/_schemas/purchase-schema.ts",
  variant: "app/(protected)/purchase/_schemas/purchase-schema.ts",
  group: "app/(protected)/purchase/new/_components/products/Images.tsx",
  image: "app/(protected)/purchase/_schemas/purchase-schema.ts",
};

export default async function DataFlowPage() {
  const sources = Object.fromEntries(await Promise.all(
    Object.entries(files).map(async ([id, file]) => [id, { file, code: await readFile(path.join(process.cwd(), file), "utf8") }]),
  ));
  return <DataFlowExplorer sources={sources} />;
}
