import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Bookmarks from "./pages/Bookmarks.jsx"

function App() {

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  )
}

export default App
