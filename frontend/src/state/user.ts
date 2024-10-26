import { useEffect, useState } from "react";
import useStore from "./store";
import UserService from "../../services/UserService";
import { useAuth } from "@clerk/clerk-react";
import { ConnectionUser } from "../lib/services/types";

/**
 * Custom hook for managing user state
 *
 * This hook:
 * 1. Initializes user state from the global store
 * 2. Fetches the current user data on component mount using the Clerk token
 * 3. Updates the global store with the fetched user data
 * 4. Returns the user object and loading state for use in components
 */

const useUserStore = () => {
  const { user, setUser } = useStore();
  const [userLoading, setUserLoading] = useState(true);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        if (!isSignedIn) {
          setUser(null);
          return;
        }

        const token = await getToken();
        if (!token) {
          throw new Error("No token received");
        }
        const userService = UserService();
        const userData = await userService.getCurrentUser(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [getToken, setUser, isSignedIn]);

  const updateUser = async (userData: ConnectionUser) => {
    if (!user) {
      return;
    }
    const token = await getToken();
    if (!token) {
      throw new Error("No token received");
    }
    const userService = UserService();
    await userService.updateUser(token, userData);
  };

  return { user, userLoading, updateUser };
};

export default useUserStore;