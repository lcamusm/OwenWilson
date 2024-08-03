import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import { Link } from 'react-router-dom';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchMovies();
            setMovies(data.filter(movie => movie));
            setOriginalMovies(data.filter(movie => movie));
        };
        getMovies();
    }, []);

    const handleSort = (order) => {
        if (order === "reset") {
            setMovies([...originalMovies]);
            setSortOrder("asc");
            return;
        }

        const sortedMovies = [...movies].sort((a, b) => {
            if (order === "asc") {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
        setMovies(sortedMovies);
        setSortOrder(order);
    };

    return (
        <div className="p-5 mt-1 space-y-4">
            <h2 className="text-3xl font-semibold mb-2">Películas donde Owen Wilson dice “wow”</h2>
            <p className="text-lg mb-4">Aquí puedes ver una lista de todas las películas en las que Owen Wilson dice "wow".</p>
            <div className="bg-black text-white p-4 rounded-lg max-w-xl mx-auto">
                <div className="mb-4">
                    <select 
                        onChange={(e) => handleSort(e.target.value)} 
                        className="border border-gray-300 rounded-lg py-2 px-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white">
                        <option value="reset">Orden original</option>
                        <option value="asc">Orden ascendente</option>
                        <option value="desc">Orden descendente</option>
                    </select>
                </div>
                <ul className="list-disc pl-5 max-h-[50vh] overflow-y-auto">
                    {movies.map((movie, index) => (
                        <li key={index} className="mb-1">{movie}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center mt-5">
                <Link to="/" className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default MoviesList;
