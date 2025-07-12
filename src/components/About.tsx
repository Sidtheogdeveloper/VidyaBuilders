import React from 'react';
import { Award, Users, Building, Clock, Target, Heart, CheckCircle } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const milestones = [
    { year: '1990', event: 'Company Founded', description: 'Started with a vision to build quality homes in Chennai' },
    { year: '1995', event: 'First Major Project', description: 'Completed our first residential complex in Velachery' },
    { year: '2000', event: '1,000 Units Delivered', description: 'Reached the milestone of 1,000 happy families' },
    { year: '2010', event: 'RERA Certification', description: 'Became one of the first RERA certified builders' },
    { year: '2015', event: '5,000 Units Milestone', description: 'Expanded operations across Chennai suburbs' },
    { year: '2020', event: 'Green Building Initiative', description: 'Launched eco-friendly construction practices' },
    { year: '2024', event: '10,000+ Happy Families', description: 'Continuing our legacy of quality construction' }
  ];

  const leadership = [
    {
      name: 'Rajesh Vidya',
      position: 'Chairman & Managing Director',
      experience: '30+ years',
      description: 'Visionary leader with three decades of experience in construction and real estate development.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg'
    },
    {
      name: 'Priya Vidya',
      position: 'Executive Director',
      experience: '25+ years',
      description: 'Expert in project management and customer relations, ensuring quality delivery.',
      image: 'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg'
    },
    {
      name: 'Arjun Vidya',
      position: 'Chief Technical Officer',
      experience: '15+ years',
      description: 'Leading innovative construction technologies and sustainable building practices.',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality Excellence',
      description: 'We never compromise on quality, using only the finest materials and construction practices.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do, ensuring their dreams become reality.'
    },
    {
      icon: CheckCircle,
      title: 'Timely Delivery',
      description: 'We pride ourselves on delivering projects on time, every time, without compromising quality.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Embracing new technologies and sustainable practices to build the homes of tomorrow.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-900 to-amber-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg)',
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Vidya Builders</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Three decades of excellence in construction, building homes that families cherish for generations
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Founded in 1990, Vidya Builders began with a simple yet powerful vision: to create quality homes 
                  that families would be proud to call their own. What started as a small construction company has 
                  grown into one of Chennai's most trusted names in residential development.
                </p>
                <p>
                  Over the past three decades, we have successfully delivered over 10,000 residential units across 
                  Chennai and its suburbs. Our commitment to quality, timely delivery, and customer satisfaction 
                  has earned us the trust of thousands of families who now call our developments home.
                </p>
                <p>
                  Today, we continue to innovate and evolve, incorporating modern technologies and sustainable 
                  practices while maintaining the core values that have defined us from the beginning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
                alt="Construction site"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
                alt="Modern building"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Numbers that speak for our commitment and success</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">30+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Awards & Recognition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that mark our growth and success</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-amber-200 h-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <div className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</div>
                      <div className="text-gray-600">{milestone.description}</div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the visionaries behind Vidya Builders</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <div className="text-amber-600 font-medium mb-2">{leader.position}</div>
                  <div className="text-sm text-gray-500 mb-3">{leader.experience}</div>
                  <p className="text-gray-700">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                    <Icon size={32} className="text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Dream Home?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of satisfied customers who have trusted us with their most important investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('projects')}
              className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Explore Our Projects
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;