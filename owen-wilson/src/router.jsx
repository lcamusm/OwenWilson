import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import Landing from './pages/Landing';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies" element={<MoviesList />} />
        {/* Agrega más rutas aquí si necesitas más vistas */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
