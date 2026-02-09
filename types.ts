
export interface BoxItem {
  id: string;
  name: string;
  price: number;
  segments: string[]; // hex colors for the wheel
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}
