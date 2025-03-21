import { Artist } from "@/app/types";

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch("/api/artists");
  if (!res.ok) throw new Error("Failed to fetch artists");
  return res.json();
}

export async function createArtist(data: Partial<Artist>) {
  const res = await fetch("/api/artists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create artist");
  return res.json();
}

export async function updateArtist(id: string, data: Partial<Artist>) {
  const res = await fetch(`/api/artists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update artist");
  return res.json();
}

export async function deleteArtist(id: string) {
  const res = await fetch(`/api/artists/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete artist");
}
