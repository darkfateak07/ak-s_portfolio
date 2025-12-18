import React, { useState, useEffect } from 'react';
import { Award, Trophy, ExternalLink, Medal, ChevronLeft, ChevronRight } from 'lucide-react';

const Certifications = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const certifications = [
    {
      title: 'Certification Name 1',
      issuer: 'Issuing Organization',
      date: 'Month Year',
      image: './public/cert1.png',
      certificateUrl: '#'
    },
    {
      title: 'Certification Name 2',
      issuer: 'Issuing Organization',
      date: 'Month Year',
      image: './public/cert2.png',
      certificateUrl: '#'
    }
  ];

  const achievements = [
    {
      title: 'HACKGENIX (SATHYABHAMA INSTITUTE OF SCIENCE AND TECHNOLOGY)',
      description: 'Participated and gained hands-on experience in innovative problem-solving using technology.',
      icon: Trophy,
      date: 'September 2025',
        prize: 'Participation Certificate'
    },
    {
      title: 'INTELLECT 24 GCT-Coimbatore',
      description: 'Partcipated and won Second Prize in Problem SOlving Competition',
      icon: Award,
      date: 'October 2024',
      prize: 'Medal'
    },
    {
      title: 'BYTS 2024 AI Hackathon',
      description: 'Participated in Final round of BYTS 2024 AI Hackathon',
      icon: Medal,
      date: 'April 2025',
      prize: 'Certificate'
    },
    {
      title: 'Vivere - KEC College',
      description: 'Third Prize in Paper Presentation on ML',
      icon: Award,
      date: '2024',
      prize: 'Certificate'
    },
    {
      title: 'Vivere - KEC College',
      description: 'Won third prize in web development competition',
      icon: Trophy,
      date: 'March 2024',
      prize: 'Certificate'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % achievements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, achievements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <section id="certifications" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Certifications & <span className="text-red-500">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My journey of continuous learning and recognition
          </p>
        </div>

        {/* Certifications Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-red-500" />
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative h-64 bg-gray-700 overflow-hidden flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="flex items-center justify-center"><svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg></div>';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-white">{cert.title}</h4>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs mb-4">{cert.date}</p>
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-semibold transition-colors"
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section - Carousel */}
        <div>
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-red-500" />
            Notable Achievements
          </h3>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 shadow-2xl">
                        {/* Image Placeholder */}
                        <div className="relative h-80 bg-gray-700 flex items-center justify-center overflow-hidden">
                          <img
                            src={`./public/achievement${index + 1}.png`}
                            alt={achievement.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="flex flex-col items-center justify-center gap-4"><div class="bg-red-500/10 rounded-2xl p-6"><svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg></div><span class="text-gray-400 text-base font-medium">Achievement Image</span></div>';
                            }}
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-red-500/10 rounded-xl p-3 hover:bg-red-500/20 transition-colors">
                              <Icon className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-2xl font-bold text-white mb-2">{achievement.title}</h4>
                              <p className="text-gray-400 text-base leading-relaxed">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                            <span className="text-base text-gray-400">{achievement.date}</span>
                            <span className="text-xl font-bold text-red-500">{achievement.prize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-12 h-3 bg-red-500'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
