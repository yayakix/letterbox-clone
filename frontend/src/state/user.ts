import { useEffect, useState } from "react";
import useStore from "./store";
import UserService from "../../services/UserService";
import { useAuth } from "@clerk/clerk-react";

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
  const [loading, setLoading] = useState(true);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data...");
        console.log("Is user signed in?", isSignedIn);

        if (!isSignedIn) {
          console.log("User is not signed in");
          setUser(null);
          return;
        }

        const token = await getToken();
        console.log("Got token:", token ? "Token received" : "No token");
        const userService = UserService();
        const userData = await userService.getCurrentUser(token);
        console.log("Received user data:", userData);

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [getToken, setUser, isSignedIn]);

  return { user, loading };
};

export default useUserStore;
