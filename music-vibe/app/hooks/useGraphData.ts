import { useState, useEffect } from "react";
import type { Node, Link, GraphData, ViewMode } from "@/app/types";

type GraphDataHookResult = {
  graphData: GraphData;
  connectionCounts: Record<string, number>;
};

export const useGraphData = (
  data: {
    songs: any[];
    artists: any[];
    vibes: any[];
  },
  viewMode: ViewMode
): GraphDataHookResult => {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [connectionCounts, setConnectionCounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    const connCount: Record<string, number> = {};

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
        // Initialize connection count
        connCount[`vibe-${vibe.id}`] = 0;
      });

      // Add links between songs and ALL their vibes
      data.songs.forEach((song) => {
        song.vibes.forEach((vibe: any) => {
          links.push({
            source: `song-${song.id}`,
            target: `vibe-${vibe.id}`,
            color: vibe.color || "#22c55e",
          });

          // Increment connection count for this vibe
          connCount[`vibe-${vibe.id}`] =
            (connCount[`vibe-${vibe.id}`] || 0) + 1;
          // Also track song connections
          connCount[`song-${song.id}`] =
            (connCount[`song-${song.id}`] || 0) + 1;
        });
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
        // Initialize connection count
        connCount[`artist-${artist.id}`] = 0;
      });

      // Add links between songs and artists
      data.songs.forEach((song) => {
        links.push({
          source: `song-${song.id}`,
          target: `artist-${song.artistId}`,
          color: "#6366f1",
        });

        // Increment connection count for this artist
        connCount[`artist-${song.artistId}`] =
          (connCount[`artist-${song.artistId}`] || 0) + 1;
        // Also track song connections
        connCount[`song-${song.id}`] = (connCount[`song-${song.id}`] || 0) + 1;
      });
    }

    setConnectionCounts(connCount);
    setGraphData({ nodes, links });
  }, [data, viewMode]);

  return { graphData, connectionCounts };
};
