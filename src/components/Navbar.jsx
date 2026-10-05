import { useState } from "react";
import movieIcon from "../assets/movieIcon.png";
import nightModeIcon from "../assets/night-mode.png";
import hamburgerIcon from "../assets/hamburger.png"
import cancelIcon from "../assets/letter-x.png"
import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { toggleTheme } = useTheme()

  const navigate = useNavigate();

  const handleNavbarSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery("");
  };

  const navLinkBase = "cursor-pointer transition-colors duration-200 text-sm font-medium";
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-movie-primary text-white">
            <img src={movieIcon} alt="Movie Icon" className="h-8 w-8 object-contain" />
          </div>

          <span className="text-lg font-bold text-light-text dark:text-dark-text">
            Movie Explorer
          </span>
        </div>

        <form
          onSubmit={handleNavbarSearch}
          className="hidden w-64 items-center overflow-hidden rounded-xl border border-light-border bg-light-surface md:flex dark:border-dark-border dark:bg-dark-surface"
        >
          <img
            src={searchIcon}
            alt="Search"
            className="ml-3 h-5 w-5 dark:invert"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-light-text outline-none placeholder:text-light-muted dark:text-dark-text dark:placeholder:text-dark-muted"
          />
        </form>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to='/' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
            Home
          </NavLink>

          <NavLink to="/explore" className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
            Explore
          </NavLink>

          <NavLink to="/genres" className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
            Genres
          </NavLink>

          <NavLink to='/bookmarks' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
            Bookmarks
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-light-border dark:border-dark-border">
            <img
              src={nightModeIcon}
              alt="Theme Switcher"
              className="h-7 w-7 dark:invert cursor-pointer"
              onClick={toggleTheme}
            />
          </button>

          <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-movie-secondary text-white sm:flex">
            U
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-light-border text-xl text-light-text dark:border-dark-border dark:text-dark-text md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <img
                src={cancelIcon}
                alt="Close menu"
                className="h-5 w-5 dark:invert"
              />
            ) : (
              <img
                src={hamburgerIcon}
                alt="Open menu"
                className="h-7 w-7 dark:invert"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-light-border py-4 dark:border-dark-border md:hidden">
          <div className="flex flex-col gap-4 px-4">
            <form
              onSubmit={handleNavbarSearch}
              className="flex items-center overflow-hidden rounded-xl border border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface"
            >
              <img
                src={searchIcon}
                alt="Search"
                className="ml-3 h-5 w-5 dark:invert"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-light-text outline-none placeholder:text-light-muted dark:text-dark-text dark:placeholder:text-dark-muted"
              />
            </form>

            <NavLink to='/' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
              Home
            </NavLink>

            <NavLink to="/explore" className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
              Explore
            </NavLink>

            <NavLink to="/genres" className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
              Genres
            </NavLink>

            <NavLink to='/bookmarks' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`} >
              Bookmarks
            </NavLink>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-movie-secondary text-white sm:hidden">
              U
            </div>

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
