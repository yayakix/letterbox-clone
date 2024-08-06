declare global {
  interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    directedBy: string;
    year: number;
    description: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    genre: string[];
  }

  interface Yap {
    id: string;
    yap: string;
    createdAt: Date;
    updatedAt: Date;
    filmId: string;
    profileId: string;
  }

  interface MovieProfileProps {
    movieId: string;
  }
}

export { };