import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { getExploreMovies, getGenres, getTrendingMovies, getPopularMovies, getTopRatedMovies } from "../services/tmdb.js";
import Loader from "../components/Loader.jsx";

function Explore() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    const categoryTitles = {
        popular: "Popular Movies",
        trending: "Trending Movies",
        "top-rated": "Top Rated Movies",
    };

    const pageTitle = categoryTitles[category] || "Explore Movies";

    const [movies, setMovies] = useState([]);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

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
        const controller = new AbortController();
        const fetchMovies = async () => {
            if (isFetchingRef.current) {
                return
            }
            try {
                isFetchingRef.current = true
                setLoading(true)
                setError('')

                let data;
                if (category === "popular") {
                    data = await getPopularMovies(page, controller.signal);
                } else if (category === "trending") {
                    data = await getTrendingMovies(page, controller.signal);
                } else if (category === "top-rated") {
                    data = await getTopRatedMovies(page, controller.signal);
                } else {
                    data = await getExploreMovies(page, sortBy, genreId, controller.signal);
                }

                if (controller.signal.aborted) return;

                setMovies((prevMovies) => [...prevMovies, ...data.results])
                setTotalPages(data.total_pages)

            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setError("Failed to load movies. Please try again.");
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
    }, [page, sortBy, genreId, retryCount, category]);

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

    const handleGenreChange = (e) => {
        setGenreId(e.target.value)
        setPage(1)
        setMovies([])
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
        setPage(1)
        setMovies([])
    }

    return (
        <main className="mx-auto max-w-7xl px-5 py-10">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                    {pageTitle}
                </h1>

                {/* Genre */}
                <select
                    value={genreId}
                    onChange={handleGenreChange}
                    className="cursor-pointer rounded-lg border border-light-border bg-light-surface px-4 py-2 text-sm text-light-text outline-none dark:border-dark-border dark:bg-dark-surface dark:text-dark-text"
                >
                    <option value="">All Genres</option>

                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="cursor-pointer rounded-lg border border-light-border bg-light-surface px-4 py-2 text-sm text-light-text outline-none dark:border-dark-border dark:bg-dark-surface dark:text-dark-text"
                >
                    <option value="popularity.desc">Popularity</option>
                    <option value="vote_average.desc">Rating</option>
                    <option value="primary_release_date.desc">Release Date </option>
                </select>
            </div>

            {loading && movies.length === 0 && <Loader />}

            {error && movies.length === 0 && (
                <div className="flex min-h-60 flex-col items-center justify-center gap-4">
                    <p className="text-light-muted dark:text-dark-muted">
                        {error}
                    </p>

                    <button
                        onClick={() => setRetryCount((count) => count + 1)}
                        className="cursor-pointer rounded-lg bg-movie-primary px-5 py-2 font-semibold text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && movies.length === 0 && (
                <div className="flex min-h-60 items-center justify-center">
                    <p className="text-light-muted dark:text-dark-muted">
                        No movies found.
                    </p>
                </div>
            )}

            {movies.length > 0 && (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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

export default Explore;