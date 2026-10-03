import MovieSection from '../components/MovieSection'
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from '../services/tmdb'
import Hero from '../components/Hero'

function Home() {
    return (
        <div>
            <Hero />
            <MovieSection title="Popular Movies" getMovies={getPopularMovies} />
            <MovieSection title="Trending Movies" getMovies={getTrendingMovies} />
            <MovieSection title="Top Rated Movies" getMovies={getTopRatedMovies} />
        </div>
    )
}

export default Home
