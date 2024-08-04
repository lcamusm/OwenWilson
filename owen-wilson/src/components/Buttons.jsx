import React from 'react';
import { Link } from 'react-router-dom';

function Buttons() {
  return (
    <div className="flex flex-row justify-center space-x-4 mt-8 w-full max-w-4xl"> 
      <Link to="/movies" className="flex-grow max-w-xs">
        <button className="w-full bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
          Lista de películas
        </button>
      </Link>
      <Link to="/directors" className="flex-grow max-w-xs">
        <button className="w-full bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
          Lista de directores
        </button>
      </Link>
      <Link to="/longest-movie" className="flex-grow max-w-xs">
        <button className="w-full bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
          Película más larga
        </button>
      </Link>
      <Link to="/first-last" className="flex-grow max-w-xs">
        <button className="w-full bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
          Primer y último "wow"
        </button>
      </Link>
      <Link to="/median" className="flex-grow max-w-xs">
        <button className="w-full bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
          "Wow" de la mediana
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
