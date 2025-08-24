import axios from 'axios';

const API_KEY = 'f438648e8cd3fb324fcafe9ce59c584a'; // 🔑 paste your real TMDB key here
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch movies', error);
    return [];
  }
};
