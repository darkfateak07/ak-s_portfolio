import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Database, Server, Smartphone } from 'lucide-react';
import mypic from '../assets/mypic.jpg'; // <-- Make sure this path is correct

const IntroScreen = ({ onEnter }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const texts = ['Full Stack Developer', 'Frontend Specialist', 'Node.js Expert', 'UI/UX Designer'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    const typeText = () => {
      const text = texts[currentIndex];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        setCurrentText(text.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === text.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            const deleteInterval = setInterval(() => {
              charIndex--;
              setCurrentText(text.substring(0, charIndex));

              if (charIndex === 0) {
                clearInterval(deleteInterval);
                setCurrentIndex((prev) => (prev + 1) % texts.length);
              }
            }, 50);
          }, 2000);
        }
      }, 100);
    };

    typeText();
  }, [currentIndex]);

  const techIcons = [
    { icon: <Code className="w-8 h-8" />, label: 'Frontend' },
    { icon: <Server className="w-8 h-8" />, label: 'Backend' },
    { icon: <Database className="w-8 h-8" />, label: 'Database' },
    { icon: <Smartphone className="w-8 h-8" />, label: 'Mobile' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Animated background for intro */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black"></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-red-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-700 p-1 animate-pulse">
            <img
              src={mypic}
              alt="Abhinav K"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-500 bg-clip-text text-transparent animate-pulse">
          ABHINAV K
        </h1>

        <div className="text-2xl md:text-4xl text-gray-300 mb-8 h-16 flex items-center justify-center">
          <span className="text-red-500 font-semibold border-r-2 border-red-500 animate-pulse pr-2">
            {currentText}
          </span>
        </div>

        {/* Tech Icons */}
        <div className="flex justify-center space-x-8 mb-12">
          {techIcons.map((tech, index) => (
            <div
              key={index}
              className="text-red-400 hover:text-red-300 transition-all duration-300 transform hover:scale-110 animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {tech.icon}
              <p className="text-xs mt-2">{tech.label}</p>
            </div>
          ))}
        </div>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center space-x-3 mx-auto animate-bounce"
        >
          <span>Enter Portfolio</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Subtitle */}
        <p className="text-gray-400 mt-8 text-lg animate-fade-in">
          Click to explore my digital world
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
