"use client";
import { useState, useEffect } from "react";
import type { GraphVisualizationProps, ViewMode } from "@/app/types";
import {
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

    // Use modular hooks
    const { graphData, connectionCounts } = useGraphData(data, viewMode);
    const { getNodeSize } = useNodeSizing(connectionCounts);

    const svgWidth = 1800; // Defined width from viewBox
    const svgHeight = 800; // Defined height from viewBox

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

            <svg
                className="w-full h-full"
                width="100%"
                height="100%"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} // Use variables for viewBox
            >
                {/* Render nodes here. Adjust the x,y positions based on your graph data */}
                <Node
                    x={svgWidth / 2} // Center x based on viewBox
                    y={svgHeight / 2} // Center y based on viewBox
                    radius={30}
                    id="mock-node-1"
                    svgBounds={{ width: svgWidth, height: svgHeight }} // Pass bounds
                />
            </svg>
        </div>
    );
};