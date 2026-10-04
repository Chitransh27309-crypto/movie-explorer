import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Bookmarks from "./pages/Bookmarks.jsx"
import Genres from "./pages/Genres.jsx"
import MovieDetails from "./pages/MovieDetails.jsx"
import Explore from "./pages/Explore.jsx"

function App() {

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  )
}

export default App
