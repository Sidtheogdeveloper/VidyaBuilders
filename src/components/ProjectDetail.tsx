import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, FileText, Download, Play, Image as ImageIcon, Phone, Mail, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

interface ProjectDetailProps {
  projectId: string;
  onNavigate: (page: string, projectId?: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <button
            onClick={() => onNavigate('projects')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center text-gray-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Image/3D Model */}
            <div className="lg:w-2/3">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={project.images[selectedImage]}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.type)}`}>
                    {project.status}
                  </span>
                </div>
                {project.modelUrl && (
                  <button className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <Play size={16} className="mr-2" />
                    3D Model
                  </button>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:w-1/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{project.location}</span>
              </div>

              <div className="text-3xl font-bold text-amber-700 mb-6">{project.price}</div>

              <div className="space-y-4 mb-6">
                {project.launchDate && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    <span className="text-gray-700">
                      Launch Date: {new Date(project.launchDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                {project.completionDate && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    <span className="text-gray-700">
                      Completion: {new Date(project.completionDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {project.reraNumber && (
                  <div className="flex items-center">
                    <FileText size={16} className="mr-3 text-gray-400" />
                    <span className="text-gray-700">RERA: {project.reraNumber}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {project.progress && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Construction Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                >
                  Schedule Site Visit
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                  Get Brochure
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-amber-600 hover:text-amber-700 py-3 px-6 rounded-lg font-semibold transition-all">
                  Check EMI Calculator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Unit Types */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Unit Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.unitTypes.map((unit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{unit.type}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">Area: {unit.area}</p>
                  <p className="text-2xl font-bold text-amber-700">{unit.price}</p>
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Download Floor Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="space-y-6">
            {project.specifications.map((spec, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{spec.category}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {spec.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <iframe
              src={project.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${project.name} Location`}
            ></iframe>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Interested in This Project?</h2>
            <p className="text-xl text-amber-100">
              Get in touch with our experts for personalized assistance
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center">
              <Phone size={20} className="mr-2" />
              Call Now
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center">
              <Mail size={20} className="mr-2" />
              Email Inquiry
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              <ExternalLink size={20} className="mr-2" />
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;