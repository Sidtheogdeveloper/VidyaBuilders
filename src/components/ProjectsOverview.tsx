import React, { useState } from 'react';
import { MapPin, Calendar, Filter, Search, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';

interface ProjectsOverviewProps {
  onNavigate: (page: string, projectId?: string) => void;
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing' | 'upcoming'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.type === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (type: string) => {
    switch (type) {
      case 'completed':
        return 'Completed';
      case 'ongoing':
        return 'Under Construction';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our portfolio of premium residential developments across Chennai, 
            each designed with modern amenities and thoughtful architecture.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {['all', 'completed', 'ongoing', 'upcoming'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === filterType
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                }`}
              >
                <Filter size={16} className="inline mr-2" />
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('completed-projects')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            View Completed Projects
          </button>
          <button
            onClick={() => onNavigate('new-upcoming-projects')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            New & Upcoming Projects
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              onClick={() => onNavigate('project-detail', project.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.type)}`}>
                    {getStatusText(project.type)}
                  </span>
                </div>
                {project.progress && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white bg-opacity-90 rounded-lg p-2">
                      <div className="flex justify-between text-xs text-gray-700 mb-1">
                        <span>Construction Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {project.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span>{project.location}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">{project.price}</div>
                  {project.launchDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {new Date(project.launchDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.unitTypes.slice(0, 2).map((unit, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {unit.type}
                      </span>
                    ))}
                    {project.unitTypes.length > 2 && (
                      <span className="text-gray-500 text-xs">+{project.unitTypes.length - 2} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                    <span className="mr-1">View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsOverview;