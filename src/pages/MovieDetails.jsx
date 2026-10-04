import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb.js";
import bookmarkOutline from "../assets/bookmark-outline.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import backIcon from "../assets/back.png"

function MovieDetails() {
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);

                const data = await getMovieDetails(movieId);
                setMovie(data);
                console.log(data)
                const savedMovies = JSON.parse(
                    localStorage.getItem("bookmarkedMovies") || "[]"
                );

                setIsBookmarked(
                    savedMovies.some(
                        (savedMovie) => savedMovie.id === data.id
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleBookmark = () => {
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
        } else {
            savedMovies.push(movie);

            localStorage.setItem(
                "bookmarkedMovies",
                JSON.stringify(savedMovies)
            );

            setIsBookmarked(true);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <p className="text-light-muted dark:text-dark-muted">
                    Loading movie details...
                </p>
            </main>
        );
    }

    if (!movie) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <p className="text-light-muted dark:text-dark-muted">
                    Movie details could not be loaded.
                </p>
            </main>
        );
    }

    const director = movie.credits?.crew?.find(
        (person) => person.job === "Director"
    );

    const writer = movie.credits?.crew?.find(
        (person) => person.job === "Writer"
    );
    return (
        <main className="bg-light-bg dark:bg-dark-bg">

            {/* Backdrop */}
            <section className="relative min-h-120 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                />

                <div className="absolute inset-0 bg-black/70" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-2 top-2 z-20 flex cursor-pointer items-center gap-2 rounded-lg bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-movie-primary"
                >
                    <img src={backIcon} alt="Back Icon" className="h-4 invert" /> Back
                </button>

                <div className="relative z-10 mx-auto my-15 flex min-h-125 max-w-7xl items-end ">
                    <div className="flex w-full flex-col gap-8 md:flex-row md:items-end">

                        {/* Poster */}
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-48 rounded-2xl shadow-2xl sm:w-56 md:w-64"
                        />

                        {/* Basic details */}
                        <div className="max-w-3xl">
                            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                                {movie.title}
                            </h1>

                            {movie.tagline && (
                                <p className="mt-3 text-lg italic text-slate-300">
                                    {movie.tagline}
                                </p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                                <span>
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>

                                <span>
                                    {movie.release_date?.slice(0, 4)}
                                </span>

                                {movie.runtime > 0 && (
                                    <span>
                                        {movie.runtime} min
                                    </span>
                                )}
                                {movie.adult && <span> "Adult" </span>}
                                <span>{movie.status} </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {movie.genres?.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={handleBookmark}
                                className="mt-6 flex cursor-pointer items-center gap-2 rounded-xl bg-movie-primary px-5 py-3 font-semibold text-white transition duration-200 hover:opacity-90"
                            >
                                <img
                                    src={isBookmarked ? bookmarkFilled : bookmarkOutline}
                                    alt="Bookmark Icon"
                                    className="h-5 w-5"
                                />
                                {isBookmarked ? "Bookmarked" : "Add to Bookmarks"}
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-7xl px-5 py-10">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Overview
                </h2>

                <p className="mt-4 max-w-4xl text-base leading-8 text-light-muted dark:text-dark-muted">
                    {movie.overview || "No overview available."}
                </p>
            </section>

            {/* Cast */}
            <section className="mx-auto max-w-7xl px-5 pb-10">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Cast
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {movie.credits?.cast?.slice(0, 6).map((actor) => (
                        <div key={actor.id}>
                            <div className="aspect-2/3 overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface">
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                            : "/movie-placeholder.jpg"
                                    }
                                    alt={actor.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-3 truncate font-semibold text-light-text dark:text-dark-text">
                                {actor.name}
                            </h3>

                            <p className="mt-1 truncate text-sm text-light-muted dark:text-dark-muted">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Crew */}
            <section className="mx-auto max-w-7xl px-5 pb-12">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Crew
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                    {director && (
                        <div>
                            <div className="aspect-2/3 overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface">
                                <img
                                    src={
                                        director.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${director.profile_path}`
                                            : "/movie-placeholder.jpg"
                                    }
                                    alt={director.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-3 truncate font-semibold text-light-text dark:text-dark-text">
                                {director.name}
                            </h3>

                            <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                                Director
                            </p>
                        </div>
                    )}

                    {writer && (
                        <div>
                            <div className="aspect-[2/3] overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface">
                                <img
                                    src={
                                        writer.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${writer.profile_path}`
                                            : "/movie-placeholder.jpg"
                                    }
                                    alt={writer.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-3 truncate font-semibold text-light-text dark:text-dark-text">
                                {writer.name}
                            </h3>

                            <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                                Writer
                            </p>
                        </div>
                    )}
                </div>
            </section>

        </main>
    );
}

export default MovieDetails;