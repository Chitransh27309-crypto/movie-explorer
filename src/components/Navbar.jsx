import { useState } from "react";
import movieIcon from "../assets/movieIcon.png";
import nightModeIcon from "../assets/night-mode.png";
import hamburgerIcon from "../assets/hamburger.png"
import cancelIcon from "../assets/letter-x.png"
import { useTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toggleTheme } = useTheme()

  const navLinkBase = "cursor-pointer transition-colors duration-200 text-sm font-medium";
  return (
    <nav className="sticky w-full border-b border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface">
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

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to='/' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
            Home
          </NavLink>

          <NavLink className="cursor-pointer transition-colors duration-200 text-sm font-medium text-light-muted hover:text-movie-primary dark:text-dark-muted">
            Explore
          </NavLink>

          <NavLink className="cursor-pointer transition-colors duration-200 text-sm font-medium text-light-muted hover:text-movie-primary dark:text-dark-muted">
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

            <NavLink to='/' className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-movie-primary' : 'text-light-muted dark:text-dark-muted hover:text-movie-primary'}`}>
              Home
            </NavLink>

            <NavLink className="cursor-pointer text-sm font-medium text-light-muted transition-colors duration-200 hover:text-movie-primary dark:text-dark-muted">
              Explore
            </NavLink>

            <NavLink className="cursor-pointer text-sm font-medium text-light-muted transition-colors duration-200 hover:text-movie-primary dark:text-dark-muted">
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
