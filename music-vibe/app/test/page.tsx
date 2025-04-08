"use client";
import React, { useState, useEffect, useRef } from "react";
import { Node } from "@/app/components/graph/Node";
import { Edge } from "@/app/components/graph/Edge";
import * as d3 from 'd3';
import { NodeData, EdgeData } from "@/app/types";

const TestPage = () => {
  // Refs for simulation and SVG container
  const simulationRef = useRef<d3.Simulation<NodeData, undefined> | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // State for nodes and edges with proper typing
  const [nodes, setNodes] = useState<NodeData[]>(Array.from({ length: 10 }, (_, i) => ({
    id: `node-${i}`,
    x: Math.random() * 1600 + 100,
    y: Math.random() * 600 + 100,
    radius: 30,
    type: ['song', 'artist', 'vibe'][Math.floor(Math.random() * 3)] as 'song' | 'artist' | 'vibe',
    color: ['#a39af7', '#f79a9a', '#9af7c5'][Math.floor(Math.random() * 3)]
  })));

  const [edges, setEdges] = useState<EdgeData[]>(Array.from({ length: 20 }, (_, i) => {
    const sourceIndex = Math.floor(Math.random() * nodes.length);
    let targetIndex;
    do {
      targetIndex = Math.floor(Math.random() * nodes.length);
    } while (targetIndex === sourceIndex); // Ensure no self-loops

    return {
      id: `edge-${i}`,
      sourceId: nodes[sourceIndex].id,
      targetId: nodes[targetIndex].id,
      color: "#999",
      strokeWidth: 2
    };
  }));

  useEffect(() => {
    if (!nodes.length || !svgRef.current) return;

    // Create a map for quick node lookup by ID
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    // Convert edges to format required by d3.forceLink
    const linkData = edges.map(edge => ({
      source: edge.sourceId,
      target: edge.targetId,
      id: edge.id
    }));
    
    // Create the simulation with proper typing
    const simulation = d3.forceSimulation<NodeData>()
      .nodes(nodes)
      .force("link", d3.forceLink<NodeData, d3.SimulationLinkDatum<NodeData>>(linkData)
        .id(d => d.id)
        .distance(150)
        .strength(0.1))
      .force("charge", d3.forceManyBody()
        .strength(-300))
      .force("center", d3.forceCenter(900, 400))
      .force("collision", d3.forceCollide<NodeData>()
        .radius(d => d.radius + 10))
      .alphaTarget(0)
      .alphaDecay(0.05);
    
    // Update node positions on each tick of the simulation
    simulation.on("tick", () => {
      // Apply position constraints to keep nodes within bounds
      nodes.forEach(node => {
        node.x = Math.max(node.radius, Math.min(1800 - node.radius, node.x || 0));
        node.y = Math.max(node.radius, Math.min(800 - node.radius, node.y || 0));
        
        // Update node element position
        const nodeElement = document.querySelector(`g[data-id="${node.id}"]`);
        if (nodeElement) {
          nodeElement.setAttribute('transform', `translate(${node.x},${node.y})`);
        }
      });
    });
    
    // Store the simulation in ref for cleanup
    simulationRef.current = simulation;
    
    // Custom drag behavior that works with the simulation
    const drag = d3.drag<SVGGElement, NodeData>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        // Clamp to boundaries
        d.fx = Math.max(d.radius, Math.min(1800 - d.radius, event.x));
        d.fy = Math.max(d.radius, Math.min(800 - d.radius, event.y));
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    
    // Apply drag behavior to node elements
    d3.selectAll<SVGGElement, NodeData>('g[data-id^="node-"]').call(drag);
    
    // Cleanup
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [nodes, edges]);
  
  // Function to restart simulation when needed
  const restartSimulation = () => {
    if (simulationRef.current) {
      simulationRef.current.alpha(1).restart();
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Force-Directed Graph</h1>
        <button 
          onClick={restartSimulation}
          className="px-4 py-2 bg-purple-600 text-white rounded mb-4"
        >
          Restart Simulation
        </button>
        <svg width="1800" height="800" ref={svgRef}>
          {edges.map((edge) => (
            <Edge
              key={edge.id}
              id={edge.id}
              sourceId={edge.sourceId}
              targetId={edge.targetId}
              color={edge.color}
              strokeWidth={edge.strokeWidth}
            />
          ))}
          {nodes.map((node) => (
            <Node
              key={node.id}
              x={node.x || 0}
              y={node.y || 0}
              radius={node.radius}
              id={node.id}
              color={node.color}
              type={node.type}
              label={node.id}
              svgBounds={{ width: 1800, height: 800 }}
            />
          ))}
        </svg>
      </div>
    </main>
  );
};

export default TestPage;