const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbFetch = async (endpoint) => {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });
    console.log("API KEY ", import.meta.env.VITE_TMDB_TOKEN)
    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const getPopularMovies = () => {
    return tmdbFetch("/movie/popular?language=en-US&page=1");
};