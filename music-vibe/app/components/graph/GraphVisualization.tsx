import { useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Song, Artist, Vibe } from '@/app/admin/types';

interface Node {
  id: string;
  label: string;
  color: string;
  type: 'song' | 'artist' | 'vibe';
}

interface Link {
  source: string;
  target: string;
  color: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface GraphVisualizationProps {
  data: {
    songs: Song[];
    artists: Artist[];
    vibes: Vibe[];
  };
  onNodeClick?: (node: Node) => void;
}

export default function GraphVisualization({ data, onNodeClick }: GraphVisualizationProps) {
  const graphData = useCallback((): GraphData => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Add artists as nodes
    data.artists.forEach(artist => {
      nodes.push({
        id: `artist-${artist.id}`,
        label: artist.name,
        color: '#4f46e5', // indigo-600
        type: 'artist'
      });
    });

    // Add songs as nodes and create links to artists
    data.songs.forEach(song => {
      nodes.push({
        id: `song-${song.id}`,
        label: song.title,
        color: '#9333ea', // purple-600
        type: 'song'
      });

      // Link song to artist
      links.push({
        source: `song-${song.id}`,
        target: `artist-${song.artistId}`,
        color: '#6366f1' // indigo-500
      });

      // Link song to vibes
      song.vibes.forEach(vibe => {
        // Add vibe node if it doesn't exist
        if (!nodes.find(n => n.id === `vibe-${vibe.id}`)) {
          nodes.push({
            id: `vibe-${vibe.id}`,
            label: vibe.name,
            color: vibe.color || '#22c55e', // green-500 as default
            type: 'vibe'
          });
        }

        links.push({
          source: `song-${song.id}`,
          target: `vibe-${vibe.id}`,
          color: vibe.color || '#22c55e'
        });
      });
    });

    return { nodes, links };
  }, [data]);

  return (
    <ForceGraph2D
      graphData={graphData()}
      nodeLabel="label"
      nodeColor={(node: any) => node.color}
      linkColor={(link: any) => link.color}
      backgroundColor="#111827" // dark:bg-gray-900
      width={window.innerWidth * 0.7}
      height={window.innerHeight}
      onNodeClick={(node: any) => onNodeClick?.(node)}
      nodeRelSize={8}
      linkWidth={2}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.005}
    />
  );
}