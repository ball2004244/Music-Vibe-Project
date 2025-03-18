export interface Artist {
  id: string;
  name: string;
  imageUrl: string | null;
  songs: any[];
}

export interface Song {
  id: string;
  title: string;
  duration: number;
  artistId: string;
  artist: {
    id: string;
    name: string;
  };
  vibes: {
    id: string;
    name: string;
    color?: string;
  }[];
}

export interface Vibe {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  songs: any[];
}