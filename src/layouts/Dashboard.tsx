import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const Dashboard = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <h1 className="container mx-auto text-3xl px-4 min-h-[85vh] grid place-content-center">
        Coming soon...
      </h1>
    </>
  );
};

export default Dashboard;
