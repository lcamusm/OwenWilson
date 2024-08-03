import axios from 'axios';

const api_url = 'https://owen-wilson-wow-api.onrender.com';

export const fetchMovies = async () => {
    const response = await axios.get(`${api_url}/wows/movies`);
    return response.data;
};

export const fetchDirectors = async () => {
    const response = await axios.get(`${api_url}/wows/directors`);
    return response.data;
};

export const fetchWowDetails = async (movie) => {
    const response = await axios.get(`${api_url}/wows/random?movie=${movie}`);
    return response.data;
}

export const fetchWowByIndex = async (index) => {
    const response = await axios.get(`${api_url}/wows/ordered/${index}`);
    return response.data;
}