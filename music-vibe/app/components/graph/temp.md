flowchart TD
    subgraph "Graph Data Structure"
        Data[graphData object] --> Nodes
        Data --> Links
    end

    subgraph "Node Properties"
        Nodes --> N1[id: unique identifier]
        Nodes --> N2[label: display text]
        Nodes --> N3[color: visual color]
        Nodes --> N4[size: calculated from connectionCounts]
        Nodes --> N5[fx/fy: fixed position coords if dragged]
        Nodes --> N6[x/y: current position]
    end

    subgraph "Link Properties"
        Links --> L1[source: source node id]
        Links --> L2[target: target node id]
        Links --> L3[color: line color]
    end

    subgraph "Relationships"
        N1 --> L1
        N1 --> L2
        connectionCounts[connectionCounts] --> N4
    end

interface GraphNode {
  id: string;       // Unique identifier for the node
  label: string;    // Display text for the node
  color: string;    // Node color (e.g., "#ff0000")
  x?: number;       // Current x position (set by simulation)
  y?: number;       // Current y position (set by simulation)
  fx?: number;      // Fixed x position (when dragged)
  fy?: number;      // Fixed y position (when dragged)
  // Additional metadata may be present depending on node type
}

interface GraphLink {
  source: string | GraphNode;  // ID of source node or node object
  target: string | GraphNode;  // ID of target node or node object
  color: string;               // Link color
}