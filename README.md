# Vidya Builders - Construction Company Website

A modern, responsive website for Vidya Builders, Chennai's premier construction company. Built with React, TypeScript, and Tailwind CSS.

## 🏗️ Project Overview

This website showcases Vidya Builders' portfolio of residential projects across Chennai, featuring interactive project galleries, user authentication, appointment booking, and comprehensive project information.

## ✨ Features

### Core Pages
- **Homepage**: Hero banner with project carousel and company highlights
- **Projects Overview**: Grid layout of all projects with filtering capabilities
- **Project Detail Pages**: Comprehensive project information with 3D model integration
- **Completed Projects**: Showcase of finished developments with testimonials
- **New & Upcoming Projects**: Latest launches with special offers
- **About Us**: Company history, leadership team, and achievements
- **Contact**: Multiple contact methods with appointment booking
- **User Portal**: Authentication and personalized dashboard

### Key Functionality
- 🎨 **Modern Design**: Clean, professional aesthetic with earthy color palette
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🔐 **User Authentication**: Login/signup with personalized features
- 📅 **Appointment Booking**: Schedule video calls or office visits
- 🏠 **3D Model Integration**: Interactive house models for projects
- 📧 **Email Notifications**: Newsletter and project update subscriptions
- 🗺️ **Interactive Maps**: Google Maps integration for project locations
- 📊 **Progress Tracking**: Construction progress visualization
- 🎯 **Filtering & Search**: Advanced project filtering capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)
- **Code Quality**: ESLint + TypeScript ESLint

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vidya-builders-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── About.tsx        # About us page
│   ├── CompletedProjects.tsx
│   ├── Contact.tsx      # Contact page with forms
│   ├── Homepage.tsx     # Main landing page
│   ├── Navbar.tsx       # Navigation component
│   ├── NewUpcomingProjects.tsx
│   ├── ProjectDetail.tsx # Individual project pages
│   ├── ProjectsOverview.tsx
│   └── UserPortal.tsx   # User authentication & dashboard
├── data/
│   └── projects.ts      # Project data and mock content
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Amber/Gold tones (`amber-600`, `amber-700`)
- **Secondary**: Blue accents (`blue-600`, `blue-700`)
- **Success**: Green (`green-600`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Clean, readable font with proper line spacing
- **Interactive**: Hover states and transitions

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with mobile menu

## 📊 Data Structure

### Project Schema
```typescript
interface Project {
  id: string;
  name: string;
  location: string;
  type: 'completed' | 'ongoing' | 'upcoming';
  image: string;
  images: string[];
  description: string;
  launchDate?: string;
  completionDate?: string;
  reraNumber?: string;
  amenities: string[];
  unitTypes: UnitType[];
  specifications: Specification[];
  price?: string;
  status: string;
  progress?: number;
  mapUrl: string;
  modelUrl?: string;
}
```

## 🔧 Customization

### Adding New Projects
1. Edit `src/data/projects.ts`
2. Add project data following the Project interface
3. Include high-quality images and project details

### Styling Changes
- Modify `tailwind.config.js` for theme customization
- Update color palette in component files
- Adjust spacing and typography as needed

### Adding New Pages
1. Create component in `src/components/`
2. Add route in `App.tsx`
3. Update navigation in `Navbar.tsx`

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Environment Variables
Create `.env` file for:
- API endpoints
- Google Maps API key
- Email service configuration

## 📱 Mobile Optimization

- Responsive breakpoints for all screen sizes
- Touch-friendly interface elements
- Optimized images and performance
- Mobile-first design approach

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Alt text for all images

## 🔮 Future Enhancements

- **CMS Integration**: Admin panel for content management
- **Payment Gateway**: Online booking payments
- **Live Chat**: Customer support integration
- **Virtual Tours**: 360° project walkthroughs
- **Mobile App**: React Native companion app
- **Analytics**: User behavior tracking
- **SEO Optimization**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is proprietary software for Vidya Builders.

## 📞 Support

For technical support or questions:
- Email: tech@vidyabuilders.com
- Phone: +91 98765 43210

---
