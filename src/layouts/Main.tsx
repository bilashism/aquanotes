import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import DigitalClock from '../components/ui/DigitalClock';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <DigitalClock />
    </>
  );
};

export default Main;
