export type Film = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  year: number;
  directedBy: string;
  rating: number;
  genre: string[];
  imageUrl: string;
  watchedBy?: { id: string }[];
};