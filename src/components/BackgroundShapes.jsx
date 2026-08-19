import React from 'react';

export const BackgroundShapes = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};
