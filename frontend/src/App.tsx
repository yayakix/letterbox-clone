import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MovieProfile from "./components/pages/MovieProfile.tsx";
import Home from "./components/pages/Home.tsx";
import UserProfile from "./components/pages/UserProfile.tsx";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "./components/compound/Navbar.tsx";
import EditProfile from "./components/base/Profile/EditProfile.tsx";

export default function App() {

  const { isSignedIn, isLoaded } = useAuth();
  console.log('isSignedIn', { isSignedIn, isLoaded })

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/edit" element={ <EditProfile />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}