import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Star, Image as ImageIcon } from 'lucide-react';
import { projects } from '../data/projects';

interface CompletedProjectsProps {
  onNavigate: (page: string, projectId?: string) => void;
}

const CompletedProjects: React.FC<CompletedProjectsProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const completedProjects = projects.filter(project => project.type === 'completed');
  
  const locations = [...new Set(completedProjects.map(project => 
    project.location.split(',')[0].trim()
  ))];

  const filteredProjects = selectedFilter === 'all' 
    ? completedProjects 
    : completedProjects.filter(project => 
        project.location.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center text-gray-600 hover:text-amber-700 transition-colors mr-4"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Projects
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Completed Projects</h1>
                <p className="text-gray-600 mt-1">Discover our legacy of quality construction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              All Locations
            </button>
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedFilter(location)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === location
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedProjects.length}</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Families Settled</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600">Locations Covered</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => onNavigate('project-detail', project.id)}
            >
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all">
                      <ImageIcon size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="md:w-1/2 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {project.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                  <div className="space-y-3 mb-4">
                    {project.completionDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span>Completed: {new Date(project.completionDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2" />
                      <span>{project.unitTypes.length} Unit Types Available</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                      <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                      <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                      <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                      <Star size={14} className="mr-2 text-yellow-500 fill-current" />
                      <span className="text-gray-600">Excellent Reviews</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {project.amenities.length > 3 && (
                      <span className="text-gray-500 text-xs">+{project.amenities.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-amber-700">{project.price}</div>
                    <div className="text-amber-600 font-medium group-hover:text-amber-700">
                      View Gallery →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No completed projects found in this location.</p>
          </div>
        )}

        {/* Testimonials Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Vidya Builders delivered exactly what they promised. The quality of construction 
                and attention to detail is exceptional. We're very happy with our new home."
              </p>
              <div className="font-semibold text-gray-900">Rajesh Kumar</div>
              <div className="text-gray-600 text-sm">Vidya Grand Residency</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Professional team, timely delivery, and excellent customer service. 
                They made our home buying journey smooth and stress-free."
              </p>
              <div className="font-semibold text-gray-900">Priya Sharma</div>
              <div className="text-gray-600 text-sm">Satisfied Customer</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The amenities and build quality exceeded our expectations. 
                Vidya Builders has truly created a wonderful community for families."
              </p>
              <div className="font-semibold text-gray-900">Arjun Patel</div>
              <div className="text-gray-600 text-sm">Happy Homeowner</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;