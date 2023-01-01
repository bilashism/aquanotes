import React from 'react';
import Goals from './Goals';

const Notes = () => {
  return (
    <main className="relative isolate z-10 xl:h-[calc(100vh-25rem)] overflow-auto scrollbar-hide">
      <div className="container mx-auto px-4">
        <Goals />
      </div>
    </main>
  );
};

export default Notes;
