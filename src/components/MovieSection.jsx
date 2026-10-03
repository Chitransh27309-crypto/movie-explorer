import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';


function MovieSection({ title, getMovies }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-5 py-10">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    {title}
                </h2>

                <button className="cursor-pointer text-sm font-semibold text-movie-primary">
                    View All →
                </button>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </section>
    );
}
export default MovieSection
