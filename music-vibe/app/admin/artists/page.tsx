"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdDeleteForever } from "react-icons/md";
import AdminLayout from "../AdminLayout";
import { ErrorAlert, LoadingSpinner } from "@/app/components/common";
import { Button, DataTable, AdminPageHeader, CreateEditForm } from "@/app/components/admin";
import type { Artist } from "@/app/types";
import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  resetDatabase,
} from "@/app/services";

const ArtistsPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newArtist, setNewArtist] = useState({ name: "", imageUrl: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [editingArtist, setEditingArtist] = useState<{
    id: string;
    name: string;
    imageUrl: string;
  } | null>(null);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const data = await getArtists();
      setArtists(data);
      setError(null);
    } catch (err) {
      setError("Error loading artists. Please try again.");
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
      alert("Name is required");
      return;
    }

    try {
      await createArtist(newArtist);
      setNewArtist({ name: "", imageUrl: "" });
      fetchArtists();
      setIsCreating(false);
    } catch (err) {
      alert("Failed to create artist. Please try again.");
      console.error(err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingArtist) return;

    if (!editingArtist.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      await updateArtist(editingArtist.id, editingArtist);
      setEditingArtist(null);
      fetchArtists();
    } catch (err) {
      alert("Failed to update artist. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteArtist = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this artist? This will also delete all associated songs."
      )
    ) {
      return;
    }

    try {
      await deleteArtist(id);
      fetchArtists();
    } catch (err) {
      alert("Failed to delete artist. Please try again.");
      console.error(err);
    }
  };

  const handleResetDatabase = async () => {
    if (
      !confirm(
        "⚠️ WARNING! This will delete ALL data from the database including all artists, songs, and vibes. This action CANNOT be undone. Are you absolutely sure?"
      )
    ) {
      return;
    }
    
    // Double confirmation
    if (
      !confirm(
        "Last chance! Type 'DELETE' in the prompt to confirm database reset."
      ) &&
      prompt("Type DELETE to confirm") !== "DELETE"
    ) {
      return;
    }

    try {
      setLoading(true);
      await resetDatabase();
      fetchArtists();
      alert("Database has been reset successfully.");
    } catch (err) {
      alert("Failed to reset database. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: (artist: Artist) =>
        editingArtist?.id === artist.id ? (
          <input
            type="text"
            value={editingArtist.name}
            onChange={(e) =>
              setEditingArtist({ ...editingArtist, name: e.target.value })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : (
          artist.name
        ),
    },
    {
      header: "Image",
      accessor: (artist: Artist) =>
        editingArtist?.id === artist.id ? (
          <input
            type="text"
            value={editingArtist.imageUrl}
            onChange={(e) =>
              setEditingArtist({ ...editingArtist, imageUrl: e.target.value })
            }
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
        ),
    },
    {
      header: "Songs",
      accessor: (artist: Artist) =>
        `${artist.songs.length} ${
          artist.songs.length === 1 ? "song" : "songs"
        }`,
    },
    {
      header: "Actions",
      accessor: (artist: Artist) =>
        editingArtist?.id === artist.id ? (
          <div className="flex gap-2">
            <Button variant="success" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditingArtist(null)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={MdEdit}
              onClick={() =>
                setEditingArtist({
                  id: artist.id,
                  name: artist.name,
                  imageUrl: artist.imageUrl || "",
                })
              }
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
        ),
    },
  ];

  const createFormFields = [
    {
      name: "name",
      label: "Name",
      type: "text" as const,
      required: true,
      value: newArtist.name,
      onChange: (value: string) => setNewArtist({ ...newArtist, name: value }),
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "text" as const,
      placeholder: "https://example.com/image.jpg",
      value: newArtist.imageUrl,
      onChange: (value: string) => setNewArtist({ ...newArtist, imageUrl: value }),
    },
  ];

  return (
    <AdminLayout title="Artists" subtitle="Manage all artists in your database">
      <AdminPageHeader
        title="Artist Management"
        description="Create, edit and manage artists"
        actionButton={{
          label: "Add Artist",
          icon: MdAdd,
          onClick: () => setIsCreating(true),
        }}
        additionalButtons={
          <Button 
            variant="danger" 
            icon={MdDeleteForever} 
            onClick={handleResetDatabase}
          >
            Reset Database
          </Button>
        }
      />

      {error && <ErrorAlert message={error} />}

      {isCreating && (
        <CreateEditForm
          title="Add New Artist"
          onSubmit={handleCreateArtist}
          onCancel={() => setIsCreating(false)}
          fields={createFormFields}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : artists.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
          <p className="text-yellow-800 dark:text-yellow-200 text-lg">
            No artists found. Add an artist to get started.
          </p>
        </div>
      ) : (
        <DataTable data={artists} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default ArtistsPage;
