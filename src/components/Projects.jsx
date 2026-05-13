import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      title: 'News Aggregator',
      description: 'A web application that aggregates news from various sources, allowing users to filter by categories and save their favorite articles and can know the credibility.',
      technologies: ['HTML', 'Node.js', 'MongoDB', 'CSS','Bootstrap', 'News API'],
      image: '/news.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'fullstack',
    },
    {
      title: 'Resume Parser',
      description: 'A tool that extracts key information from resumes and generates a structured format for easy review and analysis.',
      technologies: ['Node.js', 'React', 'JavaScript', 'MongoDB'],
      image: '/resume.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'fullstack',
    },
    {
      title: 'Retail Demand Forecaster',
      description: 'An AI-driven application that predicts product demand for retail businesses using historical sales data and market trends.',
      technologies: ['React js', 'Python', 'ML', 'Tailwind CSS','Prophet'],
      image: '/retail.png',
      liveUrl: 'https://github.com/darkfateak07/Retail-demad-forecaster',
      githubUrl: 'https://github.com/darkfateak07/Retail-demad-forecaster',
      category: 'ai-ml',
    },
    {
      title: 'Smart Travel Planner',
      description: 'An AI-powered travel planner that suggests personalized itineraries based on user preferences, budget, and travel history.',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript','API Integration'],
      image: '/travel.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'ai-ml',
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const currentProject = filteredProjects[currentIndex];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-semibold">My Work</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
            Featured <span className="block">Projects</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Swipe through my latest work and explore innovative solutions
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {['all', 'fullstack', 'ai-ml'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              {cat === 'ai-ml' ? 'AI & ML' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Main carousel section */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left side - Project details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <h3 className="text-5xl font-bold text-white">{currentProject.title}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              </div>

              <p className="text-lg text-gray-400 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/40 text-red-300 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-4">
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-800 border-2 border-gray-700 text-white font-bold rounded-lg"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
              </div>

              {/* Project counter and navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                <span className="text-sm text-gray-500">
                  {currentIndex + 1} of {filteredProjects.length}
                </span>
                
                <div className="flex gap-3">
                  <button
                    onClick={prevProject}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextProject}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Project image carousel */}
            <div className="relative h-96 lg:h-full">
              {/* Main image */}
              <div className="relative h-full rounded-2xl overflow-hidden border-2 border-gray-700">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm font-semibold text-red-400 mb-2">Featured Project</p>
                  <h4 className="text-2xl font-bold text-white">{currentProject.title}</h4>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">{currentProject.description}</p>
                </div>
              </div>

              {/* Image indicators */}
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-8 bg-gradient-to-r from-red-500 to-orange-500'
                        : 'w-3 bg-gray-700'
                    }`}
                  />
                ))}
              </div>

              {/* Side decorative blocks - other project previews */}
              <div className="absolute -right-4 top-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-700 opacity-40 hidden lg:block">
                <img
                  src={filteredProjects[(currentIndex + 1) % filteredProjects.length].image}
                  alt="next"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -left-4 bottom-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-700 opacity-40 hidden lg:block">
                <img
                  src={filteredProjects[(currentIndex - 1 + filteredProjects.length) % filteredProjects.length].image}
                  alt="prev"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* All projects grid view at bottom */}
        <div className="mt-24 pt-12 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-8">All Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveCategory(project.category);
                  setCurrentIndex(projects.filter(p => p.category === project.category).indexOf(project));
                }}
                className="group relative h-40 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent opacity-90 flex items-end p-4">
                  <div>
                    <h4 className="text-white font-bold text-sm line-clamp-1">{project.title}</h4>
                    <p className="text-gray-300 text-xs mt-1">{project.category === 'ai-ml' ? 'AI & ML' : 'Full Stack'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;