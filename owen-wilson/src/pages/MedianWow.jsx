import React, { useState, useEffect } from 'react';
import { fetchWowByIndex } from '../services/api';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

const MedianWow = () => {
    const [medianWow, setMedianWow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMedianWow = async () => {
            try {
                let totalWows = 0;
                while (true) {
                    const response = await fetchWowByIndex(totalWows);
                    if (response.length === 0) break;
                    totalWows += 1;
                }
                const medianIndex = Math.floor(totalWows / 2);
                const median = await fetchWowByIndex(medianIndex);
                setMedianWow(median);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching median wow:', error);
            }
        };
        getMedianWow();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">"Wow" en la mediana</h2>
            <p className="text-lg mb-4">Aquí puedes ver el "wow" que se posiciona en la mediana de todos los "wows" dichos por Owen Wilson.</p>
            <div className="bg-gray-800 text-black rounded-lg">
                <p><strong>Película:</strong> {medianWow.movie}</p>
                <p><strong>Personaje:</strong> {medianWow.character}</p>
                <p><strong>Diálogo:</strong> {medianWow.full_line}</p>
                {medianWow.video && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Video del "wow" en la mediana</h4>
                        <video controls className="w-96 h-auto rounded-lg">
                            <source src={medianWow.video["1080p"]} type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
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