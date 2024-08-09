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
  isFollowing?: boolean;
  followers?: Follower[];
  following?: Follower[];
};

export type UserConnections = ConnectionUser[];

export type Film = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  year: number;
  directedBy: string;
  imageUrl: string;
  initialRating: number;
  currentRating: number;
  watchedBy?: { id: string }[];
};
