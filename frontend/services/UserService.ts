import { CommentContent } from "../src/components/base/Comments/PostComment";
import { ConnectionUser } from "../src/lib/services/types";

// export type User = {
//   id: string;
//   username: string;
//   email: string;
// };

// type Response<T> = Promise<{ data: T; error: string }>;

const UserService = () => {
  return {
    getCurrentUser: async (token: string) => {
      console.log("trying to call getCurrentUser");
      const response = await fetch(`${process.env.VITE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Failed to fetch user data", response);
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    },
    // May need to update the user data sent to the backend,
    // may make this a put request

    updateUser: async (token: string, userData: ConnectionUser) => {
      const response = await fetch(`${process.env.VITE_API_URL}/api/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      return response.json();
    },
    postMovieComment: async (
      token: string,
      movieId: string,
      content: CommentContent
    ) => {
      console.log("postMovieComment content", content);
      const response = await fetch(
        `${process.env.VITE_API_URL}/api/profile/yaps/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post movie comment");
      }
      return response.json();
    },
    watchMovie: async (token: string, movieId: string) => {
      const response = await fetch(
        `${process.env.VITE_API_URL}/api/profile/watched/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to watch movie");
      }
      return response.json();
    },
    likeMovie: async (token: string, movieId: string) => {
      const response = await fetch(
        `${process.env.VITE_API_URL}/api/profile/films/liked/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like movie");
      }
      return response.json();
    },
  };
};

export default UserService;
