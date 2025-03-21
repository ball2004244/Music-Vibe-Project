import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
      <h3 className="text-white font-semibold mb-2">Legend</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#22c55e]"></div>
          <span className="text-white text-sm">Vibe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 transform rotate-45 bg-[#9333ea]"></div>
          <span className="text-white text-sm">Song</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#4f46e5]"></div>
          <span className="text-white text-sm">Artist</span>
        </div>
        <div className="mt-2 text-xs text-gray-300">
          <p>* Node size indicates number of connections</p>
        </div>
      </div>
    </div>
  );
};
