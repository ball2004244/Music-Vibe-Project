import { Song, Artist, Vibe } from "./index";
import { SimulationNodeDatum } from 'd3-force';

export interface NodeData extends SimulationNodeDatum {
  id: string;
  radius: number;
  type: 'song' | 'artist' | 'vibe';
  color: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface EdgeData {
  id: string;
  sourceId: string;
  targetId: string;
  color: string;
  strokeWidth: number;
  source?: string | NodeData;
  target?: string | NodeData;
}

export interface Node {
  id: string;
  label: string;
  color: string;
  type: "song" | "artist" | "vibe";
  cluster?: string;
}

export interface Link {
  source: string;
  target: string;
  color: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface GraphVisualizationProps {
  data: {
    songs: Song[];
    artists: Artist[];
    vibes: Vibe[];
  };
  onNodeClick?: (node: Node) => void;
}

export type ViewMode = "vibe" | "artist";
