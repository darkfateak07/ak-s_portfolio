import React from 'react';
import { Code, Palette, Zap, Award, Coffee, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code with best practices'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Creative Design',
      description: 'Crafting beautiful and intuitive user interfaces'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality',
      description: 'Delivering high-quality solutions that exceed expectations'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Dedication',
      description: 'Passionate about continuous learning and improvement'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working effectively in teams and with stakeholders'
    }
  ];

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-red-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-lg bg-gradient-to-r from-red-500 to-red-700 p-1 animate-pulse mb-6">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="About Me" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
             I'm an enthusiastic full-stack developer and AI explorer, diving deep into MERN stack and Machine Learning. 
I love building smart, eye-catching digital experiences—from sleek UIs to intelligent backend systems. 
Whether it's automating ideas or launching fresh startup concepts, I’m all about turning passion into powerful code.

            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing my knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {['React','HTML and CSS', 'Node.js', 'Python', 'AWS', 'Docker','MONGODB'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-red-500/30 transition-all duration-300 transform hover:scale-105 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-red-500 mb-3">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;