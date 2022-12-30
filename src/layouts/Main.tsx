import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
    </>
  );
};

export default Main;
