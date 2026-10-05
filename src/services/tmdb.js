const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbFetch = async (endpoint, signal) => {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
        signal
    });
    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const getPopularMovies = (page = 1, signal) => {
    return tmdbFetch(
        `/movie/popular?language=en-US&page=${page}`,
        signal
    );
};

export const getTrendingMovies = (page = 1, signal) => {
    return tmdbFetch(
        `/trending/movie/week?language=en-US&page=${page}`,
        signal
    );
};

export const getTopRatedMovies = (page = 1, signal) => {
    return tmdbFetch(
        `/movie/top_rated?language=en-US&page=${page}`,
        signal
    );
};
export const getGenres = () => {
    return tmdbFetch("/genre/movie/list?language=en");
};

export const getMoviesByGenre = (genreId) => {
    return tmdbFetch(
        `/discover/movie?with_genres=${genreId}&language=en-US&page=1`
    );
};

export const getMovieDetails = (movieId) => {
    return tmdbFetch(`/movie/${movieId}?language=en-US&append_to_response=credits`);
};

export const getExploreMovies = (page = 1, sortBy = "popularity.desc", genreId = "", signal) => {
    let endpoint = `/discover/movie?language=en-US&page=${page}&sort_by=${sortBy}`;

    if (genreId) {
        endpoint += `&with_genres=${genreId}`;
    }

    return tmdbFetch(endpoint, signal);
};

export const searchMovies = (query, page = 1, signal) => {
    return tmdbFetch(
        `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
        signal
    );
};