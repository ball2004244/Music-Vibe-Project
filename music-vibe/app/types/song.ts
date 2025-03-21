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
