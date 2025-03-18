'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdAdd, MdEdit, MdDelete, MdSave, MdClose, MdArrowBack } from 'react-icons/md';

interface Artist {
  id: string;
  name: string;
  imageUrl: string | null;
  songs: any[];
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [newArtist, setNewArtist] = useState({ name: '', imageUrl: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [editingArtist, setEditingArtist] = useState<{ id: string, name: string, imageUrl: string } | null>(null);
  
  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/artists');
      if (!res.ok) throw new Error('Failed to fetch artists');
      const data = await res.json();
      setArtists(data);
      setError(null);
    } catch (err) {
      setError('Error loading artists. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArtists();
  }, []);
  
  const handleCreateArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtist.name.trim()) {
      alert('Name is required');
      return;
    }
    
    try {
      const res = await fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArtist),
      });
      
      if (!res.ok) throw new Error('Failed to create artist');
      
      setNewArtist({ name: '', imageUrl: '' });
      fetchArtists();
      setIsCreating(false);
    } catch (err) {
      alert('Failed to create artist. Please try again.');
      console.error(err);
    }
  };

  const handleStartEditing = (artist: Artist) => {
    setEditingArtist({
      id: artist.id, 
      name: artist.name, 
      imageUrl: artist.imageUrl || ''
    });
  };

  const handleCancelEditing = () => {
    setEditingArtist(null);
  };

  const handleSaveEdit = async () => {
    if (!editingArtist) return;
    
    if (!editingArtist.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      const res = await fetch(`/api/artists/${editingArtist.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingArtist.name,
          imageUrl: editingArtist.imageUrl || null,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to update artist');
      
      setEditingArtist(null);
      fetchArtists();
    } catch (err) {
      alert('Failed to update artist. Please try again.');
      console.error(err);
    }
  };
  
  const handleDeleteArtist = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artist? This will also delete all associated songs.')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/artists/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete artist');
      
      fetchArtists();
    } catch (err) {
      alert('Failed to delete artist. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen dark:bg-gray-900 pb-12">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Artists</h1>
              <p className="text-purple-100">Manage all artists in your database</p>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Artist Management</h2>
            <p className="text-gray-600 dark:text-gray-300">Create, edit and manage artists</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            <MdAdd className="text-xl" /> 
            <span>Add Artist</span>
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
        
        {isCreating && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Artist</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleCreateArtist} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newArtist.name}
                  onChange={e => setNewArtist({ ...newArtist, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newArtist.imageUrl}
                  onChange={e => setNewArtist({ ...newArtist, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                >
                  Create Artist
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : artists.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
            <p className="text-yellow-800 dark:text-yellow-200 text-lg">No artists found. Add an artist to get started.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Songs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {artists.map(artist => (
                    <tr 
                      key={artist.id} 
                      className="transition-colors duration-150 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 group relative"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium border-l-4 border-transparent group-hover:border-purple-500">
                        {editingArtist && editingArtist.id === artist.id ? (
                          <input
                            type="text"
                            value={editingArtist.name}
                            onChange={e => setEditingArtist({ ...editingArtist, name: e.target.value })}
                            className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            autoFocus
                          />
                        ) : (
                          artist.name
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingArtist && editingArtist.id === artist.id ? (
                          <input
                            type="text"
                            value={editingArtist.imageUrl}
                            onChange={e => setEditingArtist({ ...editingArtist, imageUrl: e.target.value })}
                            className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="https://example.com/image.jpg"
                          />
                        ) : (
                          artist.imageUrl ? (
                            <img 
                              src={artist.imageUrl} 
                              alt={artist.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">No image</span>
                          )
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {artist.songs.length} {artist.songs.length === 1 ? 'song' : 'songs'}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingArtist && editingArtist.id === artist.id ? (
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
                              onClick={() => handleStartEditing(artist)}
                              className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                            >
                              <MdEdit className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteArtist(artist.id)}
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
          </div>
        )}
      </main>
    </div>
  );
}