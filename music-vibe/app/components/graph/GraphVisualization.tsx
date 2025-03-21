"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, useEffect, useRef } from "react";
import type {
  Node,
  Link,
  GraphData,
  GraphVisualizationProps,
  ViewMode,
} from "@/app/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function GraphVisualization({
  data,
  onNodeClick,
}: GraphVisualizationProps) {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [viewMode, setViewMode] = useState<ViewMode>("vibe");
  const fgRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth * 0.7,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const drawNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const size = node.type === "vibe" || node.type === "artist" ? 15 : 6;
      const label = node.label;
      const fontSize =
        node.type === "vibe" || node.type === "artist"
          ? 14 / globalScale
          : 12 / globalScale;

      ctx.fillStyle = node.color;
      ctx.beginPath();

      switch (node.type) {
        case "vibe":
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
          break;
        case "song":
          const triangleSize = size * 0.8;
          ctx.moveTo(node.x, node.y - triangleSize);
          ctx.lineTo(node.x + triangleSize, node.y + triangleSize);
          ctx.lineTo(node.x - triangleSize, node.y + triangleSize);
          break;
        case "artist":
          const squareSize = size * 1.5;
          ctx.rect(
            node.x - squareSize / 2,
            node.y - squareSize / 2,
            squareSize,
            squareSize
          );
          break;
      }

      ctx.fill();

      ctx.font = `${fontSize}px Inter`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, node.x, node.y + size + fontSize);
    },
    []
  );

  const graphData = useCallback((): GraphData => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Always add songs first
    data.songs.forEach((song) => {
      const clusterTarget =
        viewMode === "vibe"
          ? song.vibes[0]
            ? `vibe-${song.vibes[0].id}`
            : undefined
          : `artist-${song.artistId}`;

      nodes.push({
        id: `song-${song.id}`,
        label: song.title,
        color: "#9333ea",
        type: "song",
        cluster: clusterTarget,
      });
    });

    if (viewMode === "vibe") {
      // In vibe view, only show vibes and songs
      data.vibes.forEach((vibe) => {
        nodes.push({
          id: `vibe-${vibe.id}`,
          label: vibe.name,
          color: vibe.color || "#22c55e",
          type: "vibe",
        });
      });

      // Add links between songs and vibes
      data.songs.forEach((song) => {
        if (song.vibes[0]) {
          links.push({
            source: `song-${song.id}`,
            target: `vibe-${song.vibes[0].id}`,
            color: song.vibes[0].color || "#22c55e",
          });
        }
      });
    } else {
      // In artist view, only show artists and songs
      data.artists.forEach((artist) => {
        nodes.push({
          id: `artist-${artist.id}`,
          label: artist.name,
          color: "#4f46e5",
          type: "artist",
        });
      });

      // Add links between songs and artists
      data.songs.forEach((song) => {
        links.push({
          source: `song-${song.id}`,
          target: `artist-${song.artistId}`,
          color: "#6366f1",
        });
      });
    }

    return { nodes, links };
  }, [data, viewMode]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading graph...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gray-900">
      <div className="absolute top-4 left-4 bg-gray-800 p-2 rounded-lg shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("vibe")}
            className={`px-3 py-1 rounded ${
              viewMode === "vibe"
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Vibe View
          </button>
          <button
            onClick={() => setViewMode("artist")}
            className={`px-3 py-1 rounded ${
              viewMode === "artist"
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Artist View
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
        <h3 className="text-white font-semibold mb-2">Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#22c55e]"></div>
            <span className="text-white text-sm">Vibe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 transform rotate-45 bg-[#9333ea]"></div>
            <span className="text-white text-sm">Song</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4f46e5]"></div>
            <span className="text-white text-sm">Artist</span>
          </div>
        </div>
      </div>

      <ForceGraph2D
        ref={fgRef}
        graphData={graphData()}
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
        nodePointerAreaPaint={(
          node: any,
          color: string,
          ctx: CanvasRenderingContext2D
        ) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
          ctx.fill();
        }}
        enableNodeDrag={true}
      />
    </div>
  );
}
