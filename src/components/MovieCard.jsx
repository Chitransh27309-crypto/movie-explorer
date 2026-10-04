import { useState } from "react";
import bookmarkOutline from "../assets/bookmark-outline.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import { Link } from "react-router-dom";

function MovieCard({ movie, onBookmarkChange }) {
    const [isBookmarked, setIsBookmarked] = useState(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem("bookmarkedMovies") || "[]"
        );

        return savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    });

    const handlebookMark = () => {
        const savedMovies = JSON.parse(
            localStorage.getItem("bookmarkedMovies") || "[]"
        );

        if (isBookmarked) {
            const updatedMovies = savedMovies.filter(
                (savedMovie) => savedMovie.id !== movie.id
            );

            localStorage.setItem(
                "bookmarkedMovies",
                JSON.stringify(updatedMovies)
            );

            setIsBookmarked(false);
            onBookmarkChange?.(movie.id, false);
        } else {
            savedMovies.push(movie);

            localStorage.setItem(
                "bookmarkedMovies",
                JSON.stringify(savedMovies)
            );

            setIsBookmarked(true);
            onBookmarkChange?.(movie.id, true);
        }
    }
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-light-border bg-light-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-dark-border dark:bg-dark-surface">
            <Link to={`/movie/${movie.id}`} >
                <div className="relative aspect-2/3 overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />


                </div>

                <div className="p-4">
                    <h3 className="truncate text-base font-bold text-light-text dark:text-dark-text">
                        {movie.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-light-muted dark:text-dark-muted">
                            {movie.release_date?.slice(0, 4)}
                        </span>

                        <span className="font-semibold text-movie-primary">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </Link>

            <button
                onClick={handlebookMark}
                className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white backdrop-blur-sm transition-colors duration-200 hover:bg-movie-primary"
            >
                <img
                    src={isBookmarked ? bookmarkFilled : bookmarkOutline}
                    alt={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    className="h-5 w-5"
                />
            </button>
        </article>
    );
}

export default MovieCard;