import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

function Bookmarks() {
    const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
        return JSON.parse(
            localStorage.getItem("bookmarkedMovies") || "[]"
        );
    });

    const handleBookmarkChange = (movieId, isBookmarked) => {
        if (!isBookmarked) {
            setBookmarkedMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.id !== movieId)
            );
        }
    };

    return (
        <main className="mx-auto max-w-7xl px-5 py-10">
            <h1 className="mb-8 text-3xl font-bold text-light-text dark:text-dark-text">
                My Bookmarks
            </h1>

            {bookmarkedMovies.length === 0 ? (
                <div className="flex min-h-60 items-center justify-center">
                    <p className="text-light-muted dark:text-dark-muted">
                        You haven't bookmarked any movies yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {bookmarkedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onBookmarkChange={handleBookmarkChange}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Bookmarks;