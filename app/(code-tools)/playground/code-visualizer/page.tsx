import { scanPurchase } from "./scan";
import CodeVisualizer from "./visualizer";
export const dynamic = "force-dynamic";
export const metadata = { title: "Purchase · Code Visualizer" };
export default async function CodeVisualizerPage() {
  return <CodeVisualizer graph={await scanPurchase()} />;
}
