export interface Yap {
  id: string;
  yap: string;
  createdAt: Date;
  updatedAt: Date;
  filmId: string;
  profileId: string;
}

export interface IRatingService {
  getUserRating: (filmId: string, profileId: string) => Promise<number | null>;
  updateRating: (
    filmId: string,
    profileId: string,
    value: number
  ) => Promise<void>;
}
