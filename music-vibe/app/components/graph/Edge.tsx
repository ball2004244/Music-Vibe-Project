"use client";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface EdgeProps {
    id: string;
    sourceId: string;
    targetId: string;
    color?: string;
    strokeWidth?: number;
}

export const Edge: React.FC<EdgeProps> = ({
    id,
    sourceId,
    targetId,
    color = '#999',
    strokeWidth = 1,
}) => {
    const edgeRef = useRef<SVGLineElement>(null);

    useEffect(() => {
        if (!edgeRef.current) return;

        // Function to update the edge position
        const updatePosition = () => {
            // Find the source and target nodes by their data-id attributes
            const sourceNode = document.querySelector(`g[data-id="${sourceId}"]`);
            const targetNode = document.querySelector(`g[data-id="${targetId}"]`);
            
            if (!sourceNode || !targetNode) return;

            // Get the transform attribute values
            const sourceTransform = sourceNode.getAttribute('transform');
            const targetTransform = targetNode.getAttribute('transform');
            
            if (!sourceTransform || !targetTransform) return;

            // Extract the translate values from the transform attributes
            const sourceMatch = sourceTransform.match(/translate\(([^,]+),([^)]+)\)/);
            const targetMatch = targetTransform.match(/translate\(([^,]+),([^)]+)\)/);
            
            if (!sourceMatch || !targetMatch) return;
            
            const sourceX = parseFloat(sourceMatch[1]);
            const sourceY = parseFloat(sourceMatch[2]);
            const targetX = parseFloat(targetMatch[1]);
            const targetY = parseFloat(targetMatch[2]);
            
            // Update the line coordinates
            const line = d3.select(edgeRef.current);
            line
                .attr('x1', sourceX)
                .attr('y1', sourceY)
                .attr('x2', targetX)
                .attr('y2', targetY);
        };
        
        // Initial position update
        updatePosition();
        
        // Set up MutationObserver to watch for node position changes
        const observer = new MutationObserver(updatePosition);
        
        // Watch for changes to transform attributes on both source and target nodes
        const sourceNode = document.querySelector(`g[data-id="${sourceId}"]`);
        const targetNode = document.querySelector(`g[data-id="${targetId}"]`);
        
        if (sourceNode && targetNode) {
            observer.observe(sourceNode, { attributes: true, attributeFilter: ['transform'] });
            observer.observe(targetNode, { attributes: true, attributeFilter: ['transform'] });
        }
        
        return () => {
            observer.disconnect();
        };
    }, [sourceId, targetId]);

    return (
        <line
            ref={edgeRef}
            data-id={id}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={0.6}
        />
    );
};