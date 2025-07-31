import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download, Eye } from 'lucide-react';
import mypic from '../assets/mypic.jpg';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
      {/* Additional animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 relative animate-float">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-700 p-2 animate-pulse">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-5xl font-bold text-red-500 overflow-hidden">
              <img 
                src={mypic} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Hello, I'm <span className="text-red-500">ABHINAV K</span>
          </h1>
          <div className="text-2xl md:text-4xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span>I'm a </span>
            <span className="text-red-500 font-semibold border-r-2 border-red-500 animate-pulse ml-2">
              {currentText}
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating exceptional digital experiences through innovative design and cutting-edge technology.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="#contact"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center space-x-2 animate-bounce"
          >
            <Mail size={20} />
            Get In Touch
          </a>
          <a
            href="#projects"
            className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          >
            <Eye size={20} />
            View Work
          </a>
          <a
            href="#"
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 animate-bounce"
            style={{ animationDelay: '0.4s' }}
          >
            <Download size={20} />
            <span>Resume</span>
          </a>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
            <Github size={28} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
            <Linkedin size={28} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
            <Mail size={28} />
          </a>
        </div>

        <div className="animate-bounce" style={{ animationDuration: '2s' }}>
          <ChevronDown size={32} className="mx-auto text-red-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;