import React from "react";
import type { ViewMode } from "@/app/types";

type ViewControlsProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

export const ViewControls: React.FC<ViewControlsProps> = ({
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="absolute top-4 left-4 bg-gray-800 p-2 rounded-lg shadow-lg z-10">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode("vibe")}
          className={`px-3 py-1 rounded ${
            viewMode === "vibe"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Vibe View
        </button>
        <button
          onClick={() => setViewMode("artist")}
          className={`px-3 py-1 rounded ${
            viewMode === "artist"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Artist View
        </button>
      </div>
    </div>
  );
};
