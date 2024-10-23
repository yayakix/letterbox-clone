import api from "../network/api";
import { useAuth } from "@clerk/clerk-react";

export type User = {
  id: string;
  username: string;
  email: string;
};

// type Response<T> = Promise<{ data: T; error: string }>;

const UserService = () => {
  return {
    getCurrentUser: async (token: string) => {
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    },
  };
};

export default UserService;
