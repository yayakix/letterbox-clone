import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MovieProfile from "./components/pages/MovieProfile.tsx";
import Home from "./components/pages/Home.tsx";
import UserProfile from "./components/pages/UserProfile.tsx";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "./components/compound/Navbar.tsx";

export type Film = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  title: string,
  description: string,
  year: number,
  directedBy: string,
  rating: number,
  genre: string[],
  imageUrl: string,
}

export default function App() {

  const { sessionId, actor, isSignedIn, isLoaded } = useAuth();
  console.log('isSignedIn', { sessionId, actor, isSignedIn, isLoaded })

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}