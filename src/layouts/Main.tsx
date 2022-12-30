import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Notes from '../pages/Notes/Notes';
import DigitalClock from '../components/ui/DigitalClock';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <DigitalClock />
      <Notes />
    </>
  );
};

export default Main;
