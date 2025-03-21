"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import AdminLayout from "../AdminLayout";
import { ErrorAlert, LoadingSpinner } from "@/app/components/common";
import { 
  Button, 
  DataTable, 
  AdminPageHeader, 
  CreateEditForm,
  EmptyState 
} from "@/app/components/admin";
import type { Vibe } from "@/app/types";
import { getVibes, createVibe, updateVibe, deleteVibe } from "@/app/services";

const VibesPage = () => {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newVibe, setNewVibe] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingVibe, setEditingVibe] = useState<{
    id: string;
    name: string;
    description: string;
    color: string;
  } | null>(null);

  const fetchVibes = async () => {
    try {
      setLoading(true);
      const data = await getVibes();
      setVibes(data);
      setError(null);
    } catch (err) {
      setError("Error loading vibes. Please try again.");
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
      alert("Name is required");
      return;
    }

    try {
      await createVibe(newVibe);
      setNewVibe({ name: "", description: "", color: "#3B82F6" });
      fetchVibes();
      setIsCreating(false);
    } catch (err) {
      alert("Failed to create vibe. Please try again.");
      console.error(err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingVibe) return;

    if (!editingVibe.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      await updateVibe(editingVibe.id, editingVibe);
      setEditingVibe(null);
      fetchVibes();
    } catch (err) {
      alert("Failed to update vibe. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteVibe = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vibe?")) {
      return;
    }

    try {
      await deleteVibe(id);
      fetchVibes();
    } catch (err) {
      alert("Failed to delete vibe. Please try again.");
      console.error(err);
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: (vibe: Vibe) =>
        editingVibe?.id === vibe.id ? (
          <input
            type="text"
            value={editingVibe.name}
            onChange={(e) =>
              setEditingVibe({ ...editingVibe, name: e.target.value })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : (
          vibe.name
        ),
    },
    {
      header: "Color",
      accessor: (vibe: Vibe) =>
        editingVibe?.id === vibe.id ? (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={editingVibe.color}
              onChange={(e) =>
                setEditingVibe({ ...editingVibe, color: e.target.value })
              }
              className="w-12 h-8 p-1 rounded border dark:border-gray-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {editingVibe.color}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: vibe.color || "#3B82F6" }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {vibe.color || "#3B82F6"}
            </span>
          </div>
        ),
    },
    {
      header: "Description",
      accessor: (vibe: Vibe) =>
        editingVibe?.id === vibe.id ? (
          <input
            type="text"
            value={editingVibe.description}
            onChange={(e) =>
              setEditingVibe({ ...editingVibe, description: e.target.value })
            }
            className="w-full px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add a description..."
          />
        ) : (
          vibe.description || (
            <span className="text-gray-400">No description</span>
          )
        ),
    },
    {
      header: "Songs",
      accessor: (vibe: Vibe) =>
        `${vibe.songs.length} ${vibe.songs.length === 1 ? "song" : "songs"}`,
    },
    {
      header: "Actions",
      accessor: (vibe: Vibe) =>
        editingVibe?.id === vibe.id ? (
          <div className="flex gap-2">
            <Button variant="success" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditingVibe(null)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={MdEdit}
              onClick={() =>
                setEditingVibe({
                  id: vibe.id,
                  name: vibe.name,
                  description: vibe.description || "",
                  color: vibe.color || "#3B82F6",
                })
              }
            >
              Edit
            </Button>
            <Button
              variant="danger"
              icon={MdDelete}
              onClick={() => handleDeleteVibe(vibe.id)}
            >
              Delete
            </Button>
          </div>
        ),
    },
  ];

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text" as const,
      required: true,
      value: newVibe.name,
      onChange: (value: string) => setNewVibe({ ...newVibe, name: value }),
    },
    {
      name: "color",
      label: "Color",
      type: "text" as const,
      value: newVibe.color,
      onChange: (value: string) => setNewVibe({ ...newVibe, color: value }),
      render: () => (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={newVibe.color}
            onChange={(e) => setNewVibe({ ...newVibe, color: e.target.value })}
            className="w-12 h-10 p-1 rounded border dark:border-gray-600"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {newVibe.color}
          </span>
        </div>
      ),
    },
    {
      name: "description",
      label: "Description",
      type: "text" as const,
      value: newVibe.description,
      onChange: (value: string) => setNewVibe({ ...newVibe, description: value }),
      render: () => (
        <textarea
          value={newVibe.description}
          onChange={(e) => setNewVibe({ ...newVibe, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
          placeholder="Describe this vibe..."
        />
      ),
    },
  ];

  return (
    <AdminLayout title="Vibes" subtitle="Manage all vibes in your database">
      <AdminPageHeader
        title="Vibe Management"
        description="Create, edit and manage vibes"
        actionButton={{
          label: "Add Vibe",
          icon: MdAdd,
          onClick: () => setIsCreating(true),
        }}
      />

      {error && <ErrorAlert message={error} />}

      {isCreating && (
        <CreateEditForm
          title="Add New Vibe"
          onSubmit={handleCreateVibe}
          onCancel={() => setIsCreating(false)}
          fields={formFields}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : vibes.length === 0 ? (
        <EmptyState message="No vibes found. Add a vibe to get started." />
      ) : (
        <DataTable data={vibes} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default VibesPage;
