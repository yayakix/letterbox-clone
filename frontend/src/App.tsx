import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieProfile from "./components/pages/MovieProfile";
import Navbar from "./components/compound/Navbar";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/movie/:movieId" element={<MovieProfile movieId="clzhhaqku000147fatnwla93m" />} />
        </Routes>
      </Router>
    </div>
  )
}
