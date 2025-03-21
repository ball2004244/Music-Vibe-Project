import { Vibe } from "@/app/types";

export async function getVibes(): Promise<Vibe[]> {
  const res = await fetch("/api/vibes");
  if (!res.ok) throw new Error("Failed to fetch vibes");
  return res.json();
}

export async function createVibe(data: Partial<Vibe>) {
  const res = await fetch("/api/vibes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create vibe");
  return res.json();
}

export async function updateVibe(id: string, data: Partial<Vibe>) {
  const res = await fetch(`/api/vibes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update vibe");
  return res.json();
}

export async function deleteVibe(id: string) {
  const res = await fetch(`/api/vibes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete vibe");
}
