import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MovieProfile from "./components/pages/MovieProfile.tsx";
import Home from "./components/pages/Home.tsx";
import UserProfile from "./components/pages/UserProfile.tsx";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "./components/compound/Navbar.tsx";

export default function App() {

  const { sessionId, actor, isSignedIn, isLoaded } = useAuth();
  console.log('isSignedIn', { sessionId, actor, isSignedIn, isLoaded })

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieProfile movieId="clzhhaqku000147fatnwla93m" />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
