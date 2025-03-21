import { useCallback } from "react";

type NodeRendererProps = {
  getNodeSize: (nodeId: string, nodeType: string) => number;
};

export const useNodeRenderer = ({ getNodeSize }: NodeRendererProps) => {
  const drawNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      // Calculate size based on number of connections
      const size = getNodeSize(node.id, node.type);
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
    [getNodeSize]
  );

  const getPointerAreaPainter = useCallback(
    (getNodeSize: (nodeId: string, nodeType: string) => number) =>
      (node: any, color: string, ctx: CanvasRenderingContext2D) => {
        // Increase the clickable/draggable area for all nodes
        const size = getNodeSize(node.id, node.type) * 1.5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
        ctx.fill();
      },
    []
  );

  return {
    drawNode,
    nodePointerAreaPaint: getPointerAreaPainter(getNodeSize),
  };
};
