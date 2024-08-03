import React, { useState, useEffect } from 'react';
import { fetchWowByIndex } from '../services/api';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

const FirstAndLastWow = () => {
    const [firstWow, setFirstWow] = useState(null);
    const [lastWow, setLastWow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWows = async () => {
        try {
            let totalWows = 0;
            while (true) {
                const response = await fetchWowByIndex(totalWows);
                if (response.length === 0) break;
                totalWows += 1;
            }
            const first = await fetchWowByIndex(0);
            setFirstWow(first);
            if (totalWows > 1) {
                const last = await fetchWowByIndex(totalWows - 1);
                setLastWow(last);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching wows:', error);
        }
        };
        getWows();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">Primer y Último "wow"</h2>
            <div className="bg-gray-800 text-black p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-semibold mb-2">Primer "wow"</h3>
                <p><strong>Película:</strong> {firstWow.movie}</p>
                <p><strong>Personaje:</strong> {firstWow.character}</p>
                <p><strong>Diálogo:</strong> {firstWow.full_line}</p>
                {firstWow.video && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Video del primer "wow"</h4>
                        <video controls className="w-96 h-auto rounded-lg">
                        <source src={firstWow.video["1080p"]} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                )}
            </div>
            <div className="bg-gray-800 text-black p-4 rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">Último "wow"</h3>
                <p><strong>Película:</strong> {lastWow.movie}</p>
                <p><strong>Personaje:</strong> {lastWow.character}</p>
                <p><strong>Diálogo:</strong> {lastWow.full_line}</p>
                {lastWow.video && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Video del último "wow"</h4>
                        <video controls className="w-96 h-auto rounded-lg">
                        <source src={lastWow.video["1080p"]} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                <Link to="/" className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default FirstAndLastWow;
