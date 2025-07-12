import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    name: 'Vidya Grand Residency',
    location: 'Velachery, Chennai',
    type: 'completed',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg'
    ],
    description: 'A premium residential complex featuring modern amenities and thoughtful design in the heart of Velachery.',
    launchDate: '2021-03-15',
    completionDate: '2023-12-20',
    reraNumber: 'TN/29/Building/0156/2021',
    amenities: [
      'Swimming Pool', 'Gymnasium', 'Children\'s Play Area', 'Landscaped Gardens',
      'Security', '24/7 Power Backup', 'Covered Parking', 'Community Hall'
    ],
    unitTypes: [
      { type: '2 BHK', area: '1,200 sq ft', price: '₹85 Lakhs', floorPlan: '/floor-plans/2bhk-grand.pdf' },
      { type: '3 BHK', area: '1,650 sq ft', price: '₹1.2 Crores', floorPlan: '/floor-plans/3bhk-grand.pdf' }
    ],
    specifications: [
      {
        category: 'Flooring',
        details: ['Vitrified tiles in living areas', 'Anti-skid tiles in bathrooms']
      },
      {
        category: 'Kitchen',
        details: ['Granite countertops', 'Stainless steel sink', 'Provision for chimney']
      }
    ],
    price: '₹85 Lakhs onwards',
    status: 'Completed',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0847!2d80.2183!3d12.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzUzLjgiTiA4MMKwMTMnMDYuMCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin',
    modelUrl: '/models/grand-residency.glb'
  },
  {
    id: '2',
    name: 'Vidya Elite Towers',
    location: 'OMR, Chennai',
    type: 'ongoing',
    image: 'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg',
    images: [
      'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg'
    ],
    description: 'Ultra-modern high-rise apartments with cutting-edge amenities along the IT corridor.',
    launchDate: '2023-06-01',
    completionDate: '2025-08-30',
    reraNumber: 'TN/29/Building/0287/2023',
    amenities: [
      'Rooftop Swimming Pool', 'Sky Lounge', 'Fitness Center', 'Jogging Track',
      'Smart Home Features', 'High-Speed Elevators', 'Concierge Service', 'EV Charging'
    ],
    unitTypes: [
      { type: '2 BHK', area: '1,350 sq ft', price: '₹1.1 Crores', floorPlan: '/floor-plans/2bhk-elite.pdf' },
      { type: '3 BHK', area: '1,850 sq ft', price: '₹1.6 Crores', floorPlan: '/floor-plans/3bhk-elite.pdf' },
      { type: '4 BHK Penthouse', area: '2,500 sq ft', price: '₹2.8 Crores', floorPlan: '/floor-plans/4bhk-elite.pdf' }
    ],
    specifications: [
      {
        category: 'Technology',
        details: ['Smart home automation', 'Video door phones', 'High-speed internet ready']
      },
      {
        category: 'Finishes',
        details: ['Italian marble flooring', 'Designer lighting', 'Premium fixtures']
      }
    ],
    price: '₹1.1 Crores onwards',
    status: 'Under Construction',
    progress: 65,
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8847!2d80.2283!3d12.9016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzA1LjgiTiA4MMKwMTMnNDIuMCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin',
    modelUrl: '/models/elite-towers.glb'
  },
  {
    id: '3',
    name: 'Vidya Garden Homes',
    location: 'Tambaram, Chennai',
    type: 'upcoming',
    image: 'https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg',
    images: [
      'https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg',
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg'
    ],
    description: 'Spacious villa community with private gardens and family-friendly amenities.',
    launchDate: '2024-04-01',
    reraNumber: 'TN/29/Building/0445/2024',
    amenities: [
      'Private Gardens', 'Clubhouse', 'Tennis Court', 'Children\'s Park',
      'Organic Garden', 'Walking Trails', 'Senior Citizen Area', 'Pet Park'
    ],
    unitTypes: [
      { type: '3 BHK Villa', area: '2,200 sq ft', price: '₹1.8 Crores', floorPlan: '/floor-plans/3bhk-villa.pdf' },
      { type: '4 BHK Villa', area: '2,800 sq ft', price: '₹2.4 Crores', floorPlan: '/floor-plans/4bhk-villa.pdf' }
    ],
    specifications: [
      {
        category: 'Outdoor',
        details: ['Private garden space', 'Covered parking for 2 cars', 'Terrace garden']
      },
      {
        category: 'Structure',
        details: ['Earthquake resistant design', 'Premium external finishes', 'Natural ventilation']
      }
    ],
    price: '₹1.8 Crores onwards',
    status: 'Launch Offers Available',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8847!2d80.1183!3d12.9216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzE3LjgiTiA4MMKwMDcnMDYuMCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin',
    modelUrl: '/models/garden-homes.glb'
  }
];