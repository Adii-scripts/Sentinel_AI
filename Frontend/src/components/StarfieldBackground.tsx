import React from 'react';
import { useStarfield } from '@/hooks/useStarfield';

const StarfieldBackground: React.FC = () => {
  useStarfield('starfield-canvas');

  return (
    <canvas
      id="starfield-canvas"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarfieldBackground;