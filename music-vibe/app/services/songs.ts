import { Song } from "@/app/types";

export async function getSongs(): Promise<Song[]> {
  const res = await fetch("/api/songs");
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function createSong(data: Partial<Song>) {
  const res = await fetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create song");
  return res.json();
}

export async function updateSong(id: string, data: Partial<Song>) {
  const res = await fetch(`/api/songs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update song");
  return res.json();
}

export async function deleteSong(id: string) {
  const res = await fetch(`/api/songs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete song");
}
