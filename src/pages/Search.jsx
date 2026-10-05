import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import { searchMovies } from "../services/tmdb.js";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) {
            setMovies([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await searchMovies(query);
                setMovies(data.results);
            } catch (error) {
                console.error(error);
                setError("Failed to load search results.");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <main className="mx-auto max-w-7xl px-5 py-10">

            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                Search Results
            </h1>

            {query && (
                <p className="mt-2 text-light-muted dark:text-dark-muted">
                    Results for "{query}"
                </p>
            )}

            {loading && <Loader />}

            {error && (
                <p className="mt-8 text-center text-light-muted dark:text-dark-muted">
                    {error}
                </p>
            )}

            {!loading && !error && movies.length === 0 && query && (
                <p className="mt-8 text-center text-light-muted dark:text-dark-muted">
                    No movies found.
                </p>
            )}

            {movies.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}

        </main>
    );
}

export default Search;