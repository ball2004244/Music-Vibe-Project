"use client";
import { useState, useEffect, useRef } from "react";
import type { GraphVisualizationProps, ViewMode } from "@/app/types";
import {
  useDimensions,
  useGraphData,
  useNodeSizing,
  useNodeRenderer,
} from "@/app/hooks";
import { ViewControls } from "./ViewControls";
import { Legend } from "./Legend";
import { Node } from "./Node";

export const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  data,
  onNodeClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("vibe");
  const fgRef = useRef<any>(null);

  // Use modular hooks
  const dimensions = useDimensions();
  const { graphData, connectionCounts } = useGraphData(data, viewMode);
  const { getNodeSize } = useNodeSizing(connectionCounts);
  const { drawNode, nodePointerAreaPaint } = useNodeRenderer({ getNodeSize });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading graph...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gray-900">
      {/* UI Controls */}
      <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
      <Legend />

      {/* Graph with mock Nodes */}
      <Node 
        x={400}    // Center x position
        y={300}    // Center y position
        radius={30} // Node size
        id="mock-node-1"
      />
      
    </div>
  );
};
