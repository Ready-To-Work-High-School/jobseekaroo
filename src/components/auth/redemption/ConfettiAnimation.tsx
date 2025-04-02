
import React from 'react';

const ConfettiAnimation: React.FC = () => {
  return (
    <div className="confetti-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;
