export type UserOutputDto = {
  id: string;
  email: string;
  name?: string;
};

export type UserInputDto = {
  email: string;
  name?: string;
};

export type Follower = {
  createdAt: string;
  followerId: string;
  followingId: string;
  id: string;
  updatedAt: string;
};

export type ConnectionUser = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  imageUrl: string;
  followers: Follower[];
  following: Follower[];
  liked: Film[];
  watched: Film[];
  likedFilms: Film[];
  watchedFilms: { [key: string]: Film };
};

export type UserConnections = ConnectionUser[];

export type Film = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  year: number;
  directedBy: string;
  imageUrl: string;
  initialRating: number;
  currentRating: number;
  genre: string[];
};

// or
// export interface Film {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   title: string;
//   description: string;
//   year: number;
//   directedBy: string;
//   initialRating: number;
//   currentRating: number;
//   genre: string[];
//   imageUrl: string;
// }

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

export interface UpdateData {
  yapContent?: string;
  ratingValue?: number;
}
