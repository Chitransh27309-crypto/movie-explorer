import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import rightArrowIcon from "../assets/right-arrow.png"


function MovieSection({ title, getMovies, catagory }) {
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

                <Link
                    to={`/explore?category=${catagory}`}
                    className="cursor-pointer text-sm font-semibold text-light-text transition-colors duration-200 hover:text-movie-primary dark:text-dark-text"
                >
                    View All <img src={rightArrowIcon} alt="Arrow" className="h-4 dark:invert inline mx-1 mb-1" />
                </Link>
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
