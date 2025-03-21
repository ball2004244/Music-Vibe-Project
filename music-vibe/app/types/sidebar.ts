import { Song, Artist, Vibe } from "./index";

export interface SidebarProps {
  data: {
    songs: Song[];
    artists: Artist[];
    vibes: Vibe[];
  };
  onItemSelect?: (item: Song | Artist | Vibe) => void;
}
