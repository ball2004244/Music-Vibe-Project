'use client';

import { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import AdminLayout from '../AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import Button from '../../components/admin/Button';
import DataTable from '../../components/admin/DataTable';
import { Artist } from '../../types';
import { getArtists, createArtist, updateArtist, deleteArtist } from '../../services/api';

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newArtist, setNewArtist] = useState({ name: '', imageUrl: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [editingArtist, setEditingArtist] = useState<{ id: string, name: string, imageUrl: string } | null>(null);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const data = await getArtists();
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
      await createArtist(newArtist);
      setNewArtist({ name: '', imageUrl: '' });
      fetchArtists();
      setIsCreating(false);
    } catch (err) {
      alert('Failed to create artist. Please try again.');
      console.error(err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingArtist) return;
    
    if (!editingArtist.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      await updateArtist(editingArtist.id, editingArtist);
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
      await deleteArtist(id);
      fetchArtists();
    } catch (err) {
      alert('Failed to delete artist. Please try again.');
      console.error(err);
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: (artist: Artist) => 
        editingArtist?.id === artist.id ? (
          <input
            type="text"
            value={editingArtist.name}
            onChange={e => setEditingArtist({ ...editingArtist, name: e.target.value })}
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : artist.name
    },
    {
      header: 'Image',
      accessor: (artist: Artist) => 
        editingArtist?.id === artist.id ? (
          <input
            type="text"
            value={editingArtist.imageUrl}
            onChange={e => setEditingArtist({ ...editingArtist, imageUrl: e.target.value })}
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
        ) : artist.imageUrl ? (
          <img 
            src={artist.imageUrl} 
            alt={artist.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )
    },
    {
      header: 'Songs',
      accessor: (artist: Artist) => `${artist.songs.length} ${artist.songs.length === 1 ? 'song' : 'songs'}`
    },
    {
      header: 'Actions',
      accessor: (artist: Artist) => 
        editingArtist?.id === artist.id ? (
          <div className="flex gap-2">
            <Button variant="success" onClick={handleSaveEdit}>Save</Button>
            <Button variant="secondary" onClick={() => setEditingArtist(null)}>Cancel</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              icon={MdEdit}
              onClick={() => setEditingArtist({
                id: artist.id,
                name: artist.name,
                imageUrl: artist.imageUrl || ''
              })}
            >
              Edit
            </Button>
            <Button 
              variant="danger"
              icon={MdDelete}
              onClick={() => handleDeleteArtist(artist.id)}
            >
              Delete
            </Button>
          </div>
        )
    }
  ];

  return (
    <AdminLayout 
      title="Artists" 
      subtitle="Manage all artists in your database"
    >
      <section className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Artist Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Create, edit and manage artists</p>
        </div>
        <Button 
          icon={MdAdd}
          onClick={() => setIsCreating(true)}
        >
          Add Artist
        </Button>
      </section>

      {error && <ErrorAlert message={error} />}

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Artist</h3>
            <Button variant="secondary" onClick={() => setIsCreating(false)}>Cancel</Button>
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
              <Button type="submit">Create Artist</Button>
              <Button variant="secondary" type="button" onClick={() => setIsCreating(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : artists.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
          <p className="text-yellow-800 dark:text-yellow-200 text-lg">No artists found. Add an artist to get started.</p>
        </div>
      ) : (
        <DataTable
          data={artists}
          columns={columns}
        />
      )}
    </AdminLayout>
  );
}