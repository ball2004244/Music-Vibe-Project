"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import AdminLayout from "../AdminLayout";
import { ErrorAlert, LoadingSpinner } from "@/app/components/common";
import {
  Button,
  DataTable,
  AdminPageHeader,
  EmptyState,
  SongForm,
} from "@/app/components/admin";
import type { Song, Artist, Vibe } from "@/app/types";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getArtists,
  getVibes,
} from "@/app/services";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SongsPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newSong, setNewSong] = useState({
    title: "",
    duration: 0,
    artistId: "",
    vibeIds: [] as string[],
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingSong, setEditingSong] = useState<{
    id: string;
    title: string;
    duration: number;
    artistId: string;
    vibeIds: string[];
  } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [songsData, artistsData, vibesData] = await Promise.all([
        getSongs(),
        getArtists(),
        getVibes(),
      ]);
      setSongs(songsData);
      setArtists(artistsData);
      setVibes(vibesData);
      setError(null);
    } catch (err) {
      setError("Error loading data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong.title.trim() || !newSong.artistId) {
      alert("Title and artist are required");
      return;
    }

    try {
      await createSong(newSong);
      setNewSong({ title: "", duration: 0, artistId: "", vibeIds: [] });
      fetchData();
      setIsCreating(false);
    } catch (err) {
      alert("Failed to create song. Please try again.");
      console.error(err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingSong) return;

    if (!editingSong.title.trim() || !editingSong.artistId) {
      alert("Title and artist are required");
      return;
    }

    try {
      await updateSong(editingSong.id, editingSong);
      setEditingSong(null);
      fetchData();
    } catch (err) {
      alert("Failed to update song. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) {
      return;
    }

    try {
      await deleteSong(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete song. Please try again.");
      console.error(err);
    }
  };

  const handleVibeChange = (vibeId: string, isEditing = false) => {
    if (isEditing) {
      setEditingSong((prev) => {
        if (!prev) return prev;
        const vibeIds = prev.vibeIds.includes(vibeId)
          ? prev.vibeIds.filter((id) => id !== vibeId)
          : [...prev.vibeIds, vibeId];
        return { ...prev, vibeIds };
      });
    } else {
      setNewSong((prev) => {
        const vibeIds = prev.vibeIds.includes(vibeId)
          ? prev.vibeIds.filter((id) => id !== vibeId)
          : [...prev.vibeIds, vibeId];
        return { ...prev, vibeIds };
      });
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setNewSong((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    {
      header: "Title",
      accessor: (song: Song) =>
        editingSong?.id === song.id ? (
          <input
            type="text"
            value={editingSong.title}
            onChange={(e) =>
              setEditingSong({ ...editingSong, title: e.target.value })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : (
          song.title
        ),
    },
    {
      header: "Artist",
      accessor: (song: Song) =>
        editingSong?.id === song.id ? (
          <select
            value={editingSong.artistId}
            onChange={(e) =>
              setEditingSong({ ...editingSong, artistId: e.target.value })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        ) : (
          song.artist.name
        ),
    },
    {
      header: "Duration",
      accessor: (song: Song) =>
        editingSong?.id === song.id ? (
          <input
            type="number"
            value={editingSong.duration}
            onChange={(e) =>
              setEditingSong({
                ...editingSong,
                duration: parseInt(e.target.value) || 0,
              })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
        ) : (
          formatDuration(song.duration)
        ),
    },
    {
      header: "Vibes",
      accessor: (song: Song) =>
        editingSong?.id === song.id ? (
          <div className="grid grid-cols-2 gap-2">
            {vibes.map((vibe) => (
              <div key={vibe.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`edit-vibe-${vibe.id}`}
                  checked={editingSong.vibeIds.includes(vibe.id)}
                  onChange={() => handleVibeChange(vibe.id, true)}
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
        ) : (
          <div className="flex flex-wrap gap-1">
            {song.vibes.map((vibe) => (
              <span
                key={vibe.id}
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: vibe.color || "#e2e8f0",
                  color: vibe.color ? "#ffffff" : "#1f2937",
                }}
              >
                {vibe.name}
              </span>
            ))}
            {song.vibes.length === 0 && (
              <span className="text-gray-400 text-sm">No vibes</span>
            )}
          </div>
        ),
    },
    {
      header: "Actions",
      accessor: (song: Song) =>
        editingSong?.id === song.id ? (
          <div className="flex gap-2">
            <Button variant="success" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditingSong(null)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={MdEdit}
              onClick={() =>
                setEditingSong({
                  id: song.id,
                  title: song.title,
                  duration: song.duration,
                  artistId: song.artistId,
                  vibeIds: song.vibes.map((v) => v.id),
                })
              }
            >
              Edit
            </Button>
            <Button
              variant="danger"
              icon={MdDelete}
              onClick={() => handleDeleteSong(song.id)}
            >
              Delete
            </Button>
          </div>
        ),
    },
  ];

  return (
    <AdminLayout title="Songs" subtitle="Manage all songs in your database">
      <AdminPageHeader
        title="Song Management"
        description="Create, edit and manage songs"
        actionButton={{
          label: "Add Song",
          icon: MdAdd,
          onClick: () => setIsCreating(true),
          disabled: artists.length === 0,
        }}
      />

      {error && <ErrorAlert message={error} />}

      {artists.length === 0 && (
        <EmptyState
          message="You need to add an artist before you can add songs."
          type="warning"
        />
      )}

      {isCreating && (
        <SongForm
          title="Add New Song"
          formData={newSong}
          artists={artists}
          vibes={vibes}
          onSubmit={handleCreateSong}
          onCancel={() => setIsCreating(false)}
          onChange={handleFormChange}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : songs.length === 0 ? (
        <EmptyState message="No songs found. Add a song to get started." />
      ) : (
        <DataTable data={songs} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default SongsPage;
