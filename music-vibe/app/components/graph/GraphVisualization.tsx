"use client";

import dynamic from "next/dynamic";
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

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

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

      {/* Force Graph */}
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="label"
        nodeColor={(node: any) => node.color}
        linkColor={(link: any) => link.color}
        backgroundColor="#111827"
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={(node: any) => onNodeClick?.(node)}
        nodeRelSize={6}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.004}
        cooldownTime={2000}
        nodeCanvasObject={drawNode}
        nodePointerAreaPaint={nodePointerAreaPaint}
        enableNodeDrag={true}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
      />
    </div>
  );
};
