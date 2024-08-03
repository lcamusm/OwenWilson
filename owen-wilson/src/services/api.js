import axios from 'axios';

// const api_url = import.meta.env.API_URL;
const api_url = 'https://owen-wilson-wow-api.onrender.com';

export const fetchMovies = async () => {
    const response = await axios.get(`${api_url}/wows/movies`);
    return response.data;
};

export const fetchDirectors = async () => {
    const response = await axios.get(`${api_url}/wows/directors`);
    return response.data;
};

