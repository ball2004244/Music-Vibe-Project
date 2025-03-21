import React from "react";
import { Button } from "./Button";
import type { Artist, Vibe } from "@/app/types";

interface SongFormProps {
  title: string;
  formData: {
    title: string;
    duration: number;
    artistId: string;
    vibeIds: string[];
  };
  artists: Artist[];
  vibes: Vibe[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

const SongForm: React.FC<SongFormProps> = ({
  title,
  formData,
  artists,
  vibes,
  onSubmit,
  onCancel,
  onChange,
}) => {
  const handleVibeChange = (vibeId: string) => {
    const newVibeIds = formData.vibeIds.includes(vibeId)
      ? formData.vibeIds.filter(id => id !== vibeId)
      : [...formData.vibeIds, vibeId];
    onChange("vibeIds", newVibeIds);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration (seconds) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => onChange("duration", parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Artist <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.artistId}
            onChange={(e) => onChange("artistId", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vibes
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {vibes.map((vibe) => (
              <div key={vibe.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`vibe-${vibe.id}`}
                  checked={formData.vibeIds.includes(vibe.id)}
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
        </div>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
