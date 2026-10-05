import MovieSection from '../components/MovieSection'
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from '../services/tmdb'
import Hero from '../components/Hero'

function Home() {
    return (
        <div>
            <Hero />
            <MovieSection title="Popular Movies" catagory='popular' getMovies={getPopularMovies} />
            <MovieSection title="Trending Movies" catagory='trending' getMovies={getTrendingMovies} />
            <MovieSection title="Top Rated Movies" catagory='top-rated' getMovies={getTopRatedMovies} />
        </div>
    )
}

export default Home
