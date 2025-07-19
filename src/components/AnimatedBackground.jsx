import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900 opacity-90"></div>
      
      {/* Code-like floating elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500/20 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['<div>', '</div>', 'function()', '{}', '[]', '=>', 'const', 'let', 'var', 'return'][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>

      {/* Moving particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Animated red orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-xl opacity-10 animate-bounce" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-red-700 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-ping" style={{ animationDuration: '4s' }}></div>
      
      {/* Binary rain effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 font-mono text-xs animate-pulse"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s',
            }}
          >
            {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;