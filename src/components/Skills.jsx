import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const allSkills = [
    { name: 'React.js', category: 'frontend' },
    { name: 'JavaScript', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'HTML/CSS', category: 'frontend' },
    { name: 'Vite', category: 'frontend' },
    
    { name: 'Node.js', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'MongoDB', category: 'backend' },
    
    { name: 'Git/GitHub', category: 'tools' },
    { name: 'AWS', category: 'tools' },
    { name: 'Figma', category: 'tools' },
    { name: 'Canva', category: 'tools' },
    { name: 'Postman', category: 'tools' }
  ];

  // Generate random floating orbs
  const floatingOrbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 150 + 80,
    duration: Math.random() * 5 + 8,
    delay: Math.random() * 2
  }));

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' }
  ];

  return (
    <section id="skills" className="relative py-20 px-6 overflow-hidden">
      {/* Random floating orbs background */}
      {floatingOrbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `linear-gradient(135deg, ${
              orb.id % 3 === 0 ? 'rgba(239, 68, 68, 0.4)' : 
              orb.id % 3 === 1 ? 'rgba(249, 115, 22, 0.4)' : 
              'rgba(234, 179, 8, 0.4)'
            })`,
            animation: `floatOrb ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-semibold">My Expertise</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
            My Skills
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Floating Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 transition-all duration-500">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative h-32 md:h-40 flex items-center justify-center"
              style={{
                animation: `float ${3 + (Math.random() * 2)}s ease-in-out infinite`,
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Floating Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-2xl border border-red-500/30 backdrop-blur-sm transition-all duration-300 group-hover:border-red-400/60 group-hover:shadow-lg group-hover:shadow-red-500/20 flex flex-col items-center justify-center p-4">
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                
                {/* Skill name */}
                <span className="text-center font-bold text-sm md:text-base text-white group-hover:text-red-300 transition-colors duration-300 line-clamp-2">
                  {skill.name}
                </span>
                
                {/* Icon dots */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No skills found in this category</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-12px) translateX(4px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) translateX(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-12px) translateX(4px) rotate(-2deg);
          }
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-30px, 30px);
          }
        }

        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Skills;