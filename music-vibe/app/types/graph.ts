import { Song, Artist, Vibe } from "./index";

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
