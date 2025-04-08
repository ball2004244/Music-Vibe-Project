"use client";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeData } from '@/app/types';

interface NodeProps {
    x: number;
    y: number;
    radius: number;
    id: string;
    color?: string;
    label?: string;
    type?: 'song' | 'artist' | 'vibe';
    onClick?: () => void;
    svgBounds: { width: number; height: number };
}

export const Node: React.FC<NodeProps> = ({
    x,
    y,
    radius,
    id,
    color = '#a39af7',
    label,
    type = 'vibe',
    onClick,
    svgBounds
}) => {
    const nodeRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!nodeRef.current) return;

        const nodeSelection = d3.select<SVGGElement, NodeData>(nodeRef.current);
        // Remove any previous children
        nodeSelection.selectAll('*').remove();

        // Append the appropriate shape based on the node type
        if (type === 'vibe') {
            nodeSelection.append('circle')
                .attr('r', radius)
                .attr('fill', color);
        } else if (type === 'song') {
            nodeSelection.append('polygon')
                .attr('points', `0,${-radius} ${radius},${radius} ${-radius},${radius}`)
                .attr('fill', color);
        } else if (type === 'artist') {
            nodeSelection.append('rect')
                .attr('x', -radius)
                .attr('y', -radius)
                .attr('width', radius * 2)
                .attr('height', radius * 2)
                .attr('fill', color);
        }

        // Append text if provided
        if (label) {
            nodeSelection.append('text')
                .attr('dy', radius + 12)
                .attr('text-anchor', 'middle')
                .attr('fill', 'white')
                .attr('font-size', radius > 10 ? 12 : 10)
                .text(label);
        }

        // Attach the click listener if available
        if (onClick) {
            nodeSelection.on('click', onClick);
        }

    }, [radius, color, label, type, onClick]);

    // Initial transform is set from the props, but will be updated by the simulation
    return <g 
        ref={nodeRef} 
        transform={`translate(${x},${y})`} 
        data-id={id}
        data-type={type}
    />;
};