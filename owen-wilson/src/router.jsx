import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import Landing from './pages/Landing';
import DirectorsList from './pages/DirectorsList';
import LongestMovie from './pages/LongestMovie';
import FirstAndLastWow from './pages/FirstAndLastWow';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/directors" element={<DirectorsList />} />
        <Route path="/longest-movie" element={<LongestMovie />} />
        <Route path="/first-last" element={<FirstAndLastWow />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
