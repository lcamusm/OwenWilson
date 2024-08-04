import React, { useState, useEffect } from 'react';
import { fetchWowByIndex } from '../services/api';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

const MedianWow = () => {
    const [medianWows, setMedianWows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMedianWows = async () => {
            try {
                let totalWows = 0;
                while (true) {
                    const response = await fetchWowByIndex(totalWows);
                    if (response.length === 0) break;
                    totalWows += 1;
                }

                const medianIndex = Math.floor(totalWows / 2);
                const isEven = totalWows % 2 === 0;

                const indices = isEven ? [medianIndex - 1, medianIndex] : [medianIndex];
                const fetchPromises = indices.map(index => fetchWowByIndex(index));
                const results = await Promise.all(fetchPromises);

                setMedianWows(results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching median wows:', error);
            }
        };
        getMedianWows();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">"Wow" en la mediana</h2>
            {medianWows.length === 1 ? (
                <p className="text-lg mb-4">Aquí puedes ver el "wow" que se posiciona en la mediana de todos los "wows" dichos por Owen Wilson.</p>
            ) : (
                <p className="text-lg mb-4">Aquí puedes ver los "wows" que se posicionan en la mediana de todos los "wows" dichos por Owen Wilson.</p>
            )}
            <div className="bg-gray-800 text-black rounded-lg">
                {medianWows.length === 1 ? (
                    <>
                        <p><strong>Película:</strong> {medianWows[0].movie}</p>
                        <p><strong>Personaje:</strong> {medianWows[0].character}</p>
                        <p><strong>Diálogo:</strong> {medianWows[0].full_line}</p>
                        {medianWows[0].video && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Video del "wow" en la mediana</h4>
                                <video controls className="w-96 h-auto rounded-lg">
                                    <source src={medianWows[0].video["1080p"]} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <div className="mb-4">
                            <h4 className="text-xl font-semibold mb-2">"Wow" anterior a la mediana</h4>
                            <p><strong>Película:</strong> {medianWows[0].movie}</p>
                            <p><strong>Personaje:</strong> {medianWows[0].character}</p>
                            <p><strong>Diálogo:</strong> {medianWows[0].full_line}</p>
                            {medianWows[0].video && (
                                <div className="mt-4">
                                    <video controls className="w-96 h-auto rounded-lg">
                                        <source src={medianWows[0].video["1080p"]} type="video/mp4" />
                                        Tu navegador no soporta el elemento de video.
                                    </video>
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">"Wow" siguiente a la mediana</h4>
                            <p><strong>Película:</strong> {medianWows[1].movie}</p>
                            <p><strong>Personaje:</strong> {medianWows[1].character}</p>
                            <p><strong>Diálogo:</strong> {medianWows[1].full_line}</p>
                            {medianWows[1].video && (
                                <div className="mt-4">
                                    <video controls className="w-96 h-auto rounded-lg">
                                        <source src={medianWows[1].video["1080p"]} type="video/mp4" />
                                        Tu navegador no soporta el elemento de video.
                                    </video>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-5">
                <Link to="/" className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default MedianWow;
