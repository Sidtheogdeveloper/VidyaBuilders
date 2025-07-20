import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Percent, Clock, Gift, Bell } from 'lucide-react';
import { projects } from '../data/projects';
import { contactService } from '../services/contactService';

interface NewUpcomingProjectsProps {
  onNavigate: (page: string, projectId?: string) => void;
}

const NewUpcomingProjects: React.FC<NewUpcomingProjectsProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'ongoing' | 'upcoming'>('all');
  const [emailNotification, setEmailNotification] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  
  const newAndUpcomingProjects = projects.filter(project => 
    project.type === 'ongoing' || project.type === 'upcoming'
  );
  
  const filteredProjects = selectedType === 'all' 
    ? newAndUpcomingProjects 
    : newAndUpcomingProjects.filter(project => project.type === selectedType);

  const handleNotificationSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage('');
    
    contactService.subscribeNewsletter(emailNotification)
      .then(() => {
        setSubscribeMessage('Thank you! We\'ll notify you about new project launches and exclusive offers.');
        setEmailNotification('');
      })
      .catch((error) => {
        console.error('Error subscribing:', error);
        setSubscribeMessage('Sorry, there was an error. Please try again.');
      })
      .finally(() => {
        setIsSubscribing(false);
      });
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const offers = [
    {
      title: 'Early Bird Discount',
      description: 'Book now and save up to ₹2 Lakhs',
      icon: Percent,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Limited Time Offer',
      description: 'Special financing options available',
      icon: Clock,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Launch Bonuses',
      description: 'Exclusive amenities for first 50 bookings',
      icon: Gift,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center text-amber-100 hover:text-white transition-colors mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </button>
          </div>
          
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">New & Upcoming Projects</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Be the first to discover our latest developments and secure the best deals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Special Offers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Limited Time Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-full ${offer.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600">{offer.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Notification Signup */}
        <div className="bg-white rounded-xl p-8 mb-12 shadow-sm">
          <div className="text-center mb-6">
            <Bell size={32} className="text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
            <p className="text-gray-600">Get notified about new project launches and exclusive early bird offers</p>
          </div>
          
          {subscribeMessage && (
            <div className={`mb-4 p-3 rounded text-center ${
              subscribeMessage.includes('error') || subscribeMessage.includes('Sorry') 
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-green-100 border border-green-400 text-green-700'
            }`}>
              {subscribeMessage}
            </div>
          )}
          
          <form onSubmit={handleNotificationSignup} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={emailNotification}
                onChange={(e) => setEmailNotification(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setSelectedType('ongoing')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'ongoing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                Under Construction
              </button>
              <button
                onClick={() => setSelectedType('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'upcoming'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                Coming Soon
              </button>
            </div>
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
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.type)}`}>
                    {project.type === 'ongoing' ? 'Under Construction' : 'Coming Soon'}
                  </span>
                </div>
                {project.type === 'upcoming' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      Launch Offer
                    </span>
                  </div>
                )}
                {project.progress && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white bg-opacity-90 rounded-lg p-3">
                      <div className="flex justify-between text-sm text-gray-700 mb-2">
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {project.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span>{project.location}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

                <div className="space-y-2 mb-4">
                  {project.launchDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      <span>
                        {project.type === 'upcoming' ? 'Expected Launch' : 'Launched'}: {' '}
                        {new Date(project.launchDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {project.completionDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2" />
                      <span>Expected Completion: {new Date(project.completionDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {project.reraNumber && (
                    <div className="text-xs text-gray-500">RERA: {project.reraNumber}</div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.unitTypes.slice(0, 3).map((unit, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {unit.type}
                    </span>
                  ))}
                  {project.unitTypes.length > 3 && (
                    <span className="text-gray-500 text-xs">+{project.unitTypes.length - 3} more</span>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">{project.price}</div>
                  {project.type === 'upcoming' && (
                    <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Pre-launch Prices
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('contact');
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
                  >
                    {project.type === 'upcoming' ? 'Register Interest' : 'Book Site Visit'}
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-amber-700 to-amber-800 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl text-amber-100 mb-6">
            These exclusive launch offers won't last long. Secure your dream home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Schedule Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all">
              Call Now: +91 44 2345 6789
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUpcomingProjects;