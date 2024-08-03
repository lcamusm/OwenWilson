import React, { useState, useEffect } from 'react';
import { fetchDirectors } from '../services/api';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

const DirectorsList = () => {
    const [directors, setDirectors] = useState([]);
    const [originalDirectors, setOriginalDirectors] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDirectors = async () => {
            const data = await fetchDirectors();
            setDirectors(data.filter(director => director));
            setOriginalDirectors(data.filter(director => director));
        };
        getDirectors();
        setLoading(false);
    }, []);

    const handleSort = (order) => {
        if (order === "reset") {
            setDirectors([...originalDirectors]);
            setSortOrder("asc");
            return;
        }

        const sortedDirectors = [...directors].sort((a, b) => {
            if (order === "asc") {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
        setDirectors(sortedDirectors);
        setSortOrder(order);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-5 mt-1 space-y-4">
            <h2 className="text-3xl font-semibold mb-2">Directores de películas donde Owen Wilson dice “wow”</h2>
            <p className="text-lg mb-4">Aquí puedes ver una lista de todos los directores de las películas en las que Owen Wilson dice "wow".</p>
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
                    {directors.map((director, index) => (
                        <li key={index} className="mb-1">{director}</li>
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

export default DirectorsList;
