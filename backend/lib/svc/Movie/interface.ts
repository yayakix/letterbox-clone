export interface Film {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  year: number;
  directedBy: string;
  initialRating: number;
  currentRating: number;
  genre: string[];
  imageUrl: string;
}
export interface IFilmService {
  getAllFilms(): Promise<Film[]>;
  getFilmById(id: string): Promise<Film>;
}
