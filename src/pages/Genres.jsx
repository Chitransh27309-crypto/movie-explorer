import { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre } from "../services/tmdb.js";
import MovieCard from "../components/MovieCard.jsx";

function Genres() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);

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

    const handleGenreClick = async (genreId) => {
        try {
            setSelectedGenre(genreId);

            const data = await getMoviesByGenre(genreId);
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-5 py-10">
            <h2 className="mb-6 text-2xl font-bold text-light-text dark:text-dark-text">
                Genres
            </h2>

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
        </section>
    );
}

export default Genres;