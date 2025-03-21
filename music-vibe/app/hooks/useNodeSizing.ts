import { useCallback } from 'react';

export const useNodeSizing = (connectionCounts: Record<string, number>) => {
  const getNodeSize = useCallback((nodeId: string, nodeType: string) => {
    const connectionCount = connectionCounts[nodeId] || 0;
    
    // Base size for each node type
    const baseSize = nodeType === "song" ? 6 : 15;
    
    // Only scale vibes and artists, not songs
    if (nodeType === "song") return baseSize;
    
    // Scale factor - adjust this to control how much size increases with connections
    const scaleFactor = 0.5;
    
    // Calculate size based on connections (with a minimum size)
    return baseSize + Math.sqrt(connectionCount) * scaleFactor;
  }, [connectionCounts]);

  return { getNodeSize };
};
