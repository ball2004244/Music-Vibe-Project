'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdArrowBack, MdAdd, MdEdit, MdDelete, MdSave, MdClose } from 'react-icons/md';

interface Song {
  id: string;
  title: string;
  duration: number;
  artistId: string;
  artist: {
    id: string;
    name: string;
  };
  vibes: {
    id: string;
    name: string;
    color?: string;
  }[];
}

interface Artist {
  id: string;
  name: string;
}

interface Vibe {
  id: string;
  name: string;
  color?: string;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [newSong, setNewSong] = useState({ 
    title: '', 
    duration: 0, 
    artistId: '', 
    vibeIds: [] as string[]
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingSong, setEditingSong] = useState<{
    id: string;
    title: string;
    duration: number;
    artistId: string;
    vibeIds: string[];
  } | null>(null);
  
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/songs');
      if (!res.ok) throw new Error('Failed to fetch songs');
      const data = await res.json();
      setSongs(data);
      setError(null);
    } catch (err) {
      setError('Error loading songs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchArtistsAndVibes = async () => {
    try {
      // Fetch artists
      const artistsRes = await fetch('/api/artists');
      if (!artistsRes.ok) throw new Error('Failed to fetch artists');
      const artistsData = await artistsRes.json();
      setArtists(artistsData);
      
      // Fetch vibes
      const vibesRes = await fetch('/api/vibes');
      if (!vibesRes.ok) throw new Error('Failed to fetch vibes');
      const vibesData = await vibesRes.json();
      setVibes(vibesData);
    } catch (err) {
      console.error('Error fetching artists or vibes:', err);
      setError('Error loading data. Some options may not be available.');
    }
  };
  
  useEffect(() => {
    fetchSongs();
    fetchArtistsAndVibes();
  }, []);
  
  const handleCreateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong.title.trim() || !newSong.artistId) {
      alert('Title and artist are required');
      return;
    }
    
    try {
      const res = await fetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSong),
      });
      
      if (!res.ok) throw new Error('Failed to create song');
      
      setNewSong({ title: '', duration: 0, artistId: '', vibeIds: [] });
      fetchSongs();
      setIsCreating(false);
    } catch (err) {
      alert('Failed to create song. Please try again.');
      console.error(err);
    }
  };
  
  const handleDeleteSong = async (id: string) => {
    if (!confirm('Are you sure you want to delete this song?')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/songs/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete song');
      
      fetchSongs();
    } catch (err) {
      alert('Failed to delete song. Please try again.');
      console.error(err);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleVibeChange = (vibeId: string) => {
    setNewSong(prev => {
      if (prev.vibeIds.includes(vibeId)) {
        return {
          ...prev,
          vibeIds: prev.vibeIds.filter(id => id !== vibeId)
        };
      } else {
        return {
          ...prev,
          vibeIds: [...prev.vibeIds, vibeId]
        };
      }
    });
  };

  const handleStartEditing = (song: Song) => {
    setEditingSong({
      id: song.id,
      title: song.title,
      duration: song.duration,
      artistId: song.artistId,
      vibeIds: song.vibes.map(v => v.id)
    });
  };

  const handleCancelEditing = () => {
    setEditingSong(null);
  };

  const handleSaveEdit = async () => {
    if (!editingSong) return;
    
    if (!editingSong.title.trim() || !editingSong.artistId) {
      alert('Title and artist are required');
      return;
    }

    try {
      const res = await fetch(`/api/songs/${editingSong.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSong),
      });
      
      if (!res.ok) throw new Error('Failed to update song');
      
      setEditingSong(null);
      fetchSongs();
    } catch (err) {
      alert('Failed to update song. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen dark:bg-gray-900 pb-12">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Songs</h1>
              <p className="text-purple-100">Manage all songs in your database</p>
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-1 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              <MdArrowBack />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <section className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Song Management</h2>
            <p className="text-gray-600 dark:text-gray-300">Create, edit and manage songs</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            disabled={artists.length === 0}
            className="flex items-center gap-1 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdAdd className="text-xl" />
            <span>Add Song</span>
          </button>
        </section>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {artists.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            You need to add an artist before you can add songs.
          </div>
        )}
        
        {isCreating && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Song</h2>
            <form onSubmit={handleCreateSong}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-gray-200">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSong.title}
                  onChange={e => setNewSong({ ...newSong, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-gray-200">
                  Duration (seconds) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newSong.duration}
                  onChange={e => setNewSong({ ...newSong, duration: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-gray-200">
                  Artist <span className="text-red-500">*</span>
                </label>
                <select
                  value={newSong.artistId}
                  onChange={e => setNewSong({ ...newSong, artistId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select an artist</option>
                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-gray-200">Vibes</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  {vibes.map(vibe => (
                    <div key={vibe.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`vibe-${vibe.id}`}
                        checked={newSong.vibeIds.includes(vibe.id)}
                        onChange={() => handleVibeChange(vibe.id)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`vibe-${vibe.id}`}
                        className="text-sm flex items-center text-gray-800 dark:text-gray-200"
                      >
                        {vibe.color && (
                          <span 
                            className="inline-block w-3 h-3 rounded-full mr-1"
                            style={{ backgroundColor: vibe.color }}
                          />
                        )}
                        {vibe.name}
                      </label>
                    </div>
                  ))}
                </div>
                {vibes.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    No vibes available. <Link href="/admin/vibes" className="text-blue-500 hover:underline">Create some vibes</Link> first.
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                >
                  Create Song
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8 text-gray-800 dark:text-gray-200">Loading songs...</div>
        ) : songs.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-center text-gray-800 dark:text-gray-200">
            No songs found. Add a song to get started.
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vibes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {songs.map(song => (
                  <tr key={song.id}>
                    {editingSong && editingSong.id === song.id ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={editingSong.title}
                          onChange={e => setEditingSong({ ...editingSong, title: e.target.value })}
                          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          autoFocus
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{song.title}</td>
                    )}

                    {editingSong && editingSong.id === song.id ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={editingSong.artistId}
                          onChange={e => setEditingSong({ ...editingSong, artistId: e.target.value })}
                          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          {artists.map(artist => (
                            <option key={artist.id} value={artist.id}>
                              {artist.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{song.artist.name}</td>
                    )}

                    {editingSong && editingSong.id === song.id ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={editingSong.duration}
                          onChange={e => setEditingSong({ ...editingSong, duration: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          min="1"
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{formatDuration(song.duration)}</td>
                    )}

                    {editingSong && editingSong.id === song.id ? (
                      <td className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-2">
                          {vibes.map(vibe => (
                            <div key={vibe.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`edit-vibe-${vibe.id}`}
                                checked={editingSong.vibeIds.includes(vibe.id)}
                                onChange={() => {
                                  setEditingSong(prev => {
                                    if (!prev) return prev;
                                    return {
                                      ...prev,
                                      vibeIds: prev.vibeIds.includes(vibe.id)
                                        ? prev.vibeIds.filter(id => id !== vibe.id)
                                        : [...prev.vibeIds, vibe.id]
                                    };
                                  });
                                }}
                                className="mr-2"
                              />
                              <label 
                                htmlFor={`edit-vibe-${vibe.id}`}
                                className="text-sm flex items-center text-gray-800 dark:text-white"
                              >
                                {vibe.color && (
                                  <span 
                                    className="inline-block w-3 h-3 rounded-full mr-1"
                                    style={{ backgroundColor: vibe.color }}
                                  />
                                )}
                                {vibe.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {song.vibes.map(vibe => (
                            <span 
                              key={vibe.id}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: vibe.color || '#e2e8f0',
                                color: vibe.color ? '#ffffff' : '#1f2937'
                              }}
                            >
                              {vibe.name}
                            </span>
                          ))}
                          {song.vibes.length === 0 && (
                            <span className="text-gray-400 text-sm">No vibes</span>
                          )}
                        </div>
                      </td>
                    )}

                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingSong && editingSong.id === song.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
                          >
                            <MdSave className="mr-1" /> Save
                          </button>
                          <button
                            onClick={handleCancelEditing}
                            className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <MdClose className="mr-1" /> Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEditing(song)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                          >
                            <MdEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song.id)}
                            className="inline-flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                          >
                            <MdDelete className="mr-1" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}