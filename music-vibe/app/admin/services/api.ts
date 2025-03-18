import { Artist, Song, Vibe } from '../types';

// Artists API
export async function getArtists(): Promise<Artist[]> {
  const res = await fetch('/api/artists');
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}

export async function createArtist(data: Partial<Artist>) {
  const res = await fetch('/api/artists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create artist');
  return res.json();
}

export async function updateArtist(id: string, data: Partial<Artist>) {
  const res = await fetch(`/api/artists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update artist');
  return res.json();
}

export async function deleteArtist(id: string) {
  const res = await fetch(`/api/artists/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete artist');
}

// Songs API
export async function getSongs(): Promise<Song[]> {
  const res = await fetch('/api/songs');
  if (!res.ok) throw new Error('Failed to fetch songs');
  return res.json();
}

export async function createSong(data: Partial<Song>) {
  const res = await fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create song');
  return res.json();
}

export async function updateSong(id: string, data: Partial<Song>) {
  const res = await fetch(`/api/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update song');
  return res.json();
}

export async function deleteSong(id: string) {
  const res = await fetch(`/api/songs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete song');
}

// Vibes API
export async function getVibes(): Promise<Vibe[]> {
  const res = await fetch('/api/vibes');
  if (!res.ok) throw new Error('Failed to fetch vibes');
  return res.json();
}

export async function createVibe(data: Partial<Vibe>) {
  const res = await fetch('/api/vibes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create vibe');
  return res.json();
}

export async function updateVibe(id: string, data: Partial<Vibe>) {
  const res = await fetch(`/api/vibes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update vibe');
  return res.json();
}

export async function deleteVibe(id: string) {
  const res = await fetch(`/api/vibes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete vibe');
}