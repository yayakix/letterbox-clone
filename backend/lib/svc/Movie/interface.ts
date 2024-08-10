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

export interface Yap {
  id: string;
  yap: string;
  createdAt: Date;
  updatedAt: Date;
  filmId: string;
  profileId: string;
  profile: {
    name: string;
    imageUrl: string;
  };
}
export interface IFilmService {
  getAllFilms(): Promise<Film[]>;
  getFilmById(id: string, userId: string): Promise<Film>;
  getYapsOnFilm(filmId: string, userId: string): Promise<Yap[]>;
}
