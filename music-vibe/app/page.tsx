"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { GraphVisualization } from "@/app/components/graph";
import { LoadingSpinner, ErrorAlert } from "@/app/components/common";
import { Artist, Song, Vibe } from "@/app/types";
import { getArtists, getSongs, getVibes } from "@/app/services/api";

export default function Home() {
  const [data, setData] = useState<{
    songs: Song[];
    artists: Artist[];
    vibes: Vibe[];
  }>({
    songs: [],
    artists: [],
    vibes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [songs, artists, vibes] = await Promise.all([
          getSongs(),
          getArtists(),
          getVibes(),
        ]);
        setData({ songs, artists, vibes });
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemSelect = (item: Song | Artist | Vibe) => {
    // TODO: Implement item selection behavior
    console.log("Selected item:", item);
  };

  const handleNodeClick = (node: any) => {
    // TODO: Implement node click behavior
    console.log("Clicked node:", node);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <ErrorAlert message={error} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar data={data} onItemSelect={handleItemSelect} />
      <div className="w-[70%] h-screen">
        <GraphVisualization data={data} onNodeClick={handleNodeClick} />
      </div>
    </div>
  );
}
