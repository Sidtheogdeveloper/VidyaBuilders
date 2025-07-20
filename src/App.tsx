import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import ProjectsOverview from './components/ProjectsOverview';
import ProjectDetail from './components/ProjectDetail';
import About from './components/About';
import Contact from './components/Contact';
import UserPortal from './components/UserPortal';
import CompletedProjects from './components/CompletedProjects';
import NewUpcomingProjects from './components/NewUpcomingProjects';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string>('');

  const handleNavigate = (page: string, projectId?: string) => {
    setCurrentPage(page);
    if (projectId) {
      if (page === 'project-detail') {
        setSelectedProjectId(projectId);
      } else if (page === 'blog-post') {
        setSelectedBlogPostId(projectId);
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'projects':
        return <ProjectsOverview onNavigate={handleNavigate} />;
      case 'project-detail':
        return <ProjectDetail projectId={selectedProjectId} onNavigate={handleNavigate} />;
      case 'completed-projects':
        return <CompletedProjects onNavigate={handleNavigate} />;
      case 'new-upcoming-projects':
        return <NewUpcomingProjects onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogList onNavigate={handleNavigate} />;
      case 'blog-post':
        return <BlogPost postId={selectedBlogPostId} onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'portal':
        return <UserPortal onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderCurrentPage()}
      </main>
      
      {/* Sticky Contact Footer */}
      <div className="fixed bottom-0 right-0 z-40 p-4">
        <div className="flex flex-col space-y-2">
          <a
            href="tel:+914423456789"
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105"
            title="Call us"
          >
            📞
          </a>
          <a
            href="https://wa.me/914423456789"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105"
            title="WhatsApp"
          >
            💬
          </a>
          <a
            href="mailto:contact@vidyabuilders.com"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105"
            title="Email us"
          >
            ✉️
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;