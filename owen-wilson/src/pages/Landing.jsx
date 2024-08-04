import React from 'react';
import logo from '../../public/img/Logo.3b55998c204f27064b30.png';
import Buttons from '../components/Buttons';

const Landing = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <img src={logo} alt="Logo" className="w-60 h-60" />
      <h1 className="mt-8 text-4xl font-bold">¿Qué quieres saber?</h1>
      <Buttons />
      {children}
    </div>
  );
};

export default Landing;