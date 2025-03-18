'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdArrowBack, MdAdd, MdEdit, MdDelete, MdSave, MdClose } from 'react-icons/md';

interface Vibe {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  songs: any[];
}

export default function VibesPage() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [newVibe, setNewVibe] = useState({ 
    name: '', 
    description: '', 
    color: '#3B82F6' // Default blue color
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingVibe, setEditingVibe] = useState<{ id: string, name: string, description: string, color: string } | null>(null);
  
  const fetchVibes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/vibes');
      if (!res.ok) throw new Error('Failed to fetch vibes');
      const data = await res.json();
      setVibes(data);
      setError(null);
    } catch (err) {
      setError('Error loading vibes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVibes();
  }, []);
  
  const handleCreateVibe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVibe.name.trim()) {
      alert('Name is required');
      return;
    }
    
    try {
      const res = await fetch('/api/vibes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVibe),
      });
      
      if (!res.ok) throw new Error('Failed to create vibe');
      
      setNewVibe({ name: '', description: '', color: '#3B82F6' });
      fetchVibes();
      setIsCreating(false);
    } catch (err) {
      alert('Failed to create vibe. Please try again.');
      console.error(err);
    }
  };
  
  const handleDeleteVibe = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vibe?')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/vibes/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete vibe');
      
      fetchVibes();
    } catch (err) {
      alert('Failed to delete vibe. Please try again.');
      console.error(err);
    }
  };

  const handleStartEditing = (vibe: Vibe) => {
    setEditingVibe({
      id: vibe.id,
      name: vibe.name,
      description: vibe.description || '',
      color: vibe.color || '#3B82F6'
    });
  };

  const handleCancelEditing = () => {
    setEditingVibe(null);
  };

  const handleSaveEdit = async () => {
    if (!editingVibe) return;
    
    if (!editingVibe.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      const res = await fetch(`/api/vibes/${editingVibe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingVibe.name,
          description: editingVibe.description || null,
          color: editingVibe.color
        }),
      });
      
      if (!res.ok) throw new Error('Failed to update vibe');
      
      setEditingVibe(null);
      fetchVibes();
    } catch (err) {
      alert('Failed to update vibe. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen dark:bg-gray-900 pb-12">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Vibes</h1>
              <p className="text-purple-100">Manage all vibes in your database</p>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Vibe Management</h2>
            <p className="text-gray-600 dark:text-gray-300">Create, edit and manage vibes</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            <MdAdd className="text-xl" />
            <span>Add Vibe</span>
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
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Vibe</h2>
            <form onSubmit={handleCreateVibe}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-white">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newVibe.name}
                  onChange={e => setNewVibe({ ...newVibe, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-white">Description</label>
                <textarea
                  value={newVibe.description}
                  onChange={e => setNewVibe({ ...newVibe, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                  placeholder="Describe this vibe..."
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800 dark:text-white">Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={newVibe.color}
                    onChange={e => setNewVibe({ ...newVibe, color: e.target.value })}
                    className="w-12 h-10 border p-1 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{newVibe.color}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Create Vibe
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
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
        ) : vibes.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-center text-gray-800 dark:text-white">
            No vibes found. Add a vibe to get started.
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Songs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {vibes.map(vibe => (
                  <tr key={vibe.id}>
                    {editingVibe && editingVibe.id === vibe.id ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={editingVibe.name}
                          onChange={e => setEditingVibe({ ...editingVibe, name: e.target.value })}
                          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          autoFocus
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{vibe.name}</td>
                    )}

                    {editingVibe && editingVibe.id === vibe.id ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={editingVibe.color}
                            onChange={e => setEditingVibe({ ...editingVibe, color: e.target.value })}
                            className="w-12 h-10 border p-1"
                          />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{editingVibe.color}</span>
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vibe.color ? (
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: vibe.color }} />
                            <span className="text-gray-800 dark:text-white">{vibe.color}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No color</span>
                        )}
                      </td>
                    )}

                    {editingVibe && editingVibe.id === vibe.id ? (
                      <td className="px-6 py-4">
                        <textarea
                          value={editingVibe.description}
                          onChange={e => setEditingVibe({ ...editingVibe, description: e.target.value })}
                          className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows={2}
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        {vibe.description ? (
                          <p className="truncate max-w-xs text-gray-800 dark:text-white">{vibe.description}</p>
                        ) : (
                          <span className="text-gray-400">No description</span>
                        )}
                      </td>
                    )}

                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{vibe.songs.length} songs</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingVibe && editingVibe.id === vibe.id ? (
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
                            onClick={() => handleStartEditing(vibe)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                          >
                            <MdEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteVibe(vibe.id)}
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