import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, Users, Award, MapPin, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';

interface HomepageProps {
  onNavigate: (page: string, projectId?: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProjects = projects.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const handleProjectClick = (projectId: string) => {
    onNavigate('project-detail', projectId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-amber-900 to-amber-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg)',
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Building Dreams in <span className="text-amber-300">Chennai</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Three decades of excellence in construction, delivering premium homes that stand the test of time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('projects')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Explore Projects
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => onNavigate('portal')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Discover our latest developments across Chennai</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProjects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div className="relative h-96 md:h-[500px]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-3xl font-bold mb-2">{project.name}</h3>
                        <p className="text-lg mb-4 flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {project.location}
                        </p>
                        <p className="text-gray-200 mb-6 max-w-2xl">{project.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <button 
                            onClick={() => handleProjectClick(project.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                          >
                            View Details
                          </button>
                          {project.modelUrl && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center">
                              <Play size={16} className="mr-2" />
                              3D Model
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vidya Builders */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Vidya Builders?</h2>
            <p className="text-xl text-gray-600">Three decades of trust, innovation, and excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Award size={32} className="text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">30+ Years Experience</h3>
              <p className="text-gray-600">
                Three decades of successful construction projects across Chennai, delivering quality homes to thousands of families.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Users size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">10,000+ Happy Families</h3>
              <p className="text-gray-600">
                We've helped over 10,000 families find their dream homes with our commitment to quality and customer satisfaction.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <MapPin size={32} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prime Locations</h3>
              <p className="text-gray-600">
                Strategic locations across Chennai with excellent connectivity, educational institutions, and modern amenities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Schedule a personalized consultation with our experts and explore our latest projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              <Calendar size={20} className="mr-2" />
              Schedule Appointment
            </button>
            <button 
              onClick={() => onNavigate('projects')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              <ExternalLink size={20} className="mr-2" />
              Browse All Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;