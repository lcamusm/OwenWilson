import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchWowDetails } from '../services/api';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

const LongestMovie = () => {
    const [longestMovie, setLongestMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMoviesAndDetails = async () => {
            try {
                const movies = await fetchMovies();
                setMovies(movies);

                let longestMovie = null;
                let longestDuration = 0;

                for (const movie of movies) {
                    const details = await fetchWowDetails(movie);
                    console.log("Details for", movie, details);
                    details.forEach((detail) => {
                        const durationInMinutes = parseDuration(detail.movie_duration);
                        if (durationInMinutes > longestDuration) {
                        longestDuration = durationInMinutes;
                        longestMovie = {
                            ...details[0],
                        };
                        }
                    });
                }
                setLongestMovie(longestMovie);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMoviesAndDetails();
    }, []);

    const parseDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(":");
        return parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="longest-movie-container p-6">
            <div className="bg-gray-800 text-black p-4 rounded-lg">
              <h2 className="text-3xl font-semibold mb-2">La película más larga</h2>
              <p className="text-lg mb-4">
                A continuación se presentan los detalles de la película con la mayor duración en la que Owen Wilson dice "wow".
              </p>
              <div className="mb-4">
                <p><strong>Película:</strong> {longestMovie.movie}</p>
                <p><strong>Director:</strong> {longestMovie.director}</p>
                <p><strong>Duración:</strong> {longestMovie.movie_duration}</p>
                <p><strong>Cantidad de "wows":</strong> {longestMovie.total_wows_in_movie}</p>
              </div>
              <img src={longestMovie.poster} alt={longestMovie.movie} className="w-44 h-auto mt-4 rounded-lg" />
            </div>
            <div className="flex justify-center">
                <Link to="/" className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
                    Volver al inicio
                </Link>
            </div>
        </div>    
    );
};

export default LongestMovie;
