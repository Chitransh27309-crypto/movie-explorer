import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import { searchMovies } from "../services/tmdb.js";
import backIcon from "../assets/back.png"

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loaderRef = useRef(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        setMovies([]);
        setPage(1);
        setTotalPages(1);
        setError("");
    }, [query]);

    useEffect(() => {
        if (!query) {
            return;
        }

        const controller = new AbortController();

        const fetchSearchResults = async () => {
            if (isFetchingRef.current) {
                return;
            }

            try {
                isFetchingRef.current = true;
                setLoading(true);
                setError("");

                const data = await searchMovies(query, page, controller.signal);

                if (controller.signal.aborted) {
                    return;
                }

                setMovies((prevMovies) => [
                    ...prevMovies,
                    ...data.results,
                ]);

                setTotalPages(data.total_pages);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setError("Failed to load search results.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    isFetchingRef.current = false;
                    setLoading(false);
                }
            }
        };

        fetchSearchResults();

        return () => {
            controller.abort();
            isFetchingRef.current = false;
        };
    }, [query, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (
                    firstEntry.isIntersecting &&
                    !isFetchingRef.current &&
                    page < totalPages
                ) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [page, totalPages, loading]);

    const navigate = useNavigate();

    return (
        <main className="mx-auto max-w-7xl px-5 py-10">

            <button
                onClick={() => navigate(-1)}
                className="mb-6 z-20 flex cursor-pointer items-center gap-2 rounded-lg bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-movie-primary"
            >
                <img src={backIcon} alt="Back Icon" className="h-4 invert" /> Back
            </button>

            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                Search Results
            </h1>

            {query && (
                <p className="mt-2 text-light-muted dark:text-dark-muted">
                    Results for "{query}"
                </p>
            )}

            {loading && movies.length === 0 && <Loader />}

            {error && movies.length === 0 && (
                <div className="flex min-h-60 flex-col items-center justify-center gap-4">
                    <p className="text-light-muted dark:text-dark-muted">
                        {error}
                    </p>
                </div>
            )}

            {!loading && !error && movies.length === 0 && query && (
                <div className="flex min-h-60 items-center justify-center">
                    <p className="text-light-muted dark:text-dark-muted">
                        No movies found.
                    </p>
                </div>
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

            <div
                ref={loaderRef}
                className="flex h-20 items-center justify-center"
            >
                {loading && movies.length > 0 && <Loader />}
            </div>

        </main>
    );
}

export default Search;