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
    console.log("useEffect running");

    const fetchUser = async () => {
      console.log("fetchUser function called");
      try {
        console.log("Attempting to get token");
        const token = await getToken();
        console.log("Token received:", token ? "Token exists" : "No token");

        if (!token) {
          console.log("No token received");
          setUserLoading(false);
          return;
        }

        console.log("Initializing UserService");
        const userService = UserService();
        console.log("UserService initialized:", userService);

        console.log("Calling userService.getCurrentUser");
        const userData = await userService.getCurrentUser(token);
        console.log("User data received:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error in fetchUser:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    if (isSignedIn) {
      console.log("User is signed in, calling fetchUser");
      fetchUser();
    } else {
      console.log("User is not signed in");
      setUserLoading(false);
    }
  }, [getToken, isSignedIn, setUser]);

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
