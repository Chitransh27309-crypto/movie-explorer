import { useEffect, useRef, useState } from "react";
import { getGenres, getMoviesByGenre } from "../services/tmdb.js";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";

function Genres() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loaderRef = useRef(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data.genres);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        if (!selectedGenre) {
            return;
        }

        const controller = new AbortController();

        const fetchMovies = async () => {
            if (isFetchingRef.current) {
                return;
            }

            try {
                isFetchingRef.current = true;
                setLoading(true);
                setError("");

                const data = await getMoviesByGenre(
                    selectedGenre,
                    page,
                    controller.signal
                );

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
                    setError("Failed to load movies.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    isFetchingRef.current = false;
                    setLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            controller.abort();
            isFetchingRef.current = false;
        };
    }, [selectedGenre, page]);

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

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
        setMovies([]);
        setError("");
    };

    return (
        <main className="mx-auto max-w-7xl px-5 py-10">

            <h1 className="mb-6 text-2xl font-bold text-light-text dark:text-dark-text">
                Genres
            </h1>

            <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                    <button
                        onClick={() => handleGenreClick(genre.id)}
                        key={genre.id}
                        className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200 ${selectedGenre === genre.id
                                ? "border-movie-primary bg-movie-primary text-white"
                                : "border-light-border text-light-muted hover:border-movie-primary hover:text-movie-primary dark:border-dark-border dark:text-dark-muted"
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {loading && movies.length === 0 && <Loader />}

            {error && movies.length === 0 && (
                <div className="flex min-h-60 items-center justify-center">
                    <p className="text-light-muted dark:text-dark-muted">
                        {error}
                    </p>
                </div>
            )}

            {!loading &&
                !error &&
                selectedGenre &&
                movies.length === 0 && (
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

export default Genres;