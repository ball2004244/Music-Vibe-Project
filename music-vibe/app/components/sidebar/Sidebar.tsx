import { useState } from 'react';
import { MdSearch, MdMusicNote } from 'react-icons/md';
import { Song, Artist, Vibe } from '@/app/types';
import { SidebarProps } from '@/app/types';


export default function Sidebar({ data, onItemSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery ? [
    ...data.songs.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...data.artists.filter(artist => 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...data.vibes.filter(vibe => 
      vibe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ] : [...data.songs];

  const getItemColor = (item: Song | Artist | Vibe): string => {
    if ('title' in item) return '#9333ea'; // Song - purple-600
    if ('imageUrl' in item) return '#4f46e5'; // Artist - indigo-600
    return item.color || '#22c55e'; // Vibe - use its color or default to green-500
  };

  const getItemName = (item: Song | Artist | Vibe): string => {
    if ('title' in item) return item.title;
    return item.name;
  };

  const getItemSubtext = (item: Song | Artist | Vibe): string | undefined => {
    if ('title' in item) return item.artist.name;
    if ('imageUrl' in item) return `${item.songs.length} songs`;
    return `${item.songs.length} songs`;
  };

  return (
    <div className="w-[30%] border-r border-gray-200 dark:border-gray-700">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6">
        <h1 className="text-2xl font-bold text-white">Music Vibe Graph</h1>
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, artists, or vibes..."
            className="w-full bg-white/10 text-white placeholder-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MdSearch className="absolute left-3 top-3 text-gray-300 text-lg" />
        </div>
      </div>

      {/* List Container */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No results found
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => onItemSelect?.(item)}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `${getItemColor(item)}20` }}
                >
                  <MdMusicNote 
                    className="h-5 w-5"
                    style={{ color: getItemColor(item) }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {getItemName(item)}
                  </h3>
                  {getItemSubtext(item) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getItemSubtext(item)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}