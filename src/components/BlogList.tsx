import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { BlogPost } from '../types';
import { blogService } from '../services/blogService';

interface BlogListProps {
  onNavigate: (page: string, postId?: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'news', label: 'News' },
    { id: 'market-insights', label: 'Market Insights' },
    { id: 'construction-updates', label: 'Construction Updates' },
    { id: 'company-news', label: 'Company News' }
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchTerm]);

  const loadPosts = async () => {
    try {
      const allPosts = await blogService.getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news':
        return 'bg-blue-100 text-blue-800';
      case 'market-insights':
        return 'bg-green-100 text-green-800';
      case 'construction-updates':
        return 'bg-amber-100 text-amber-800';
      case 'company-news':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Insights</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Stay updated with the latest news, market insights, and construction updates from Vidya Builders
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                }`}
              >
                <Filter size={16} className="inline mr-2" />
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
              onClick={() => onNavigate('blog-post', filteredPosts[0].id)}
            >
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img
                    src={filteredPosts[0].featuredImage}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredPosts[0].category)}`}>
                      {categories.find(c => c.id === filteredPosts[0].category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                    {filteredPosts[0].title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={16} className="mr-2" />
                      <span className="mr-4">{filteredPosts[0].author}</span>
                      <Calendar size={16} className="mr-2" />
                      <span className="mr-4">{formatDate(filteredPosts[0].publishDate)}</span>
                      <Clock size={16} className="mr-2" />
                      <span>{filteredPosts[0].readTime} min read</span>
                    </div>
                    
                    <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                      <span className="mr-1">Read More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              onClick={() => onNavigate('blog-post', post.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {categories.find(c => c.id === post.category)?.label}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {post.readTime} min
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <User size={12} className="mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Calendar size={12} className="mr-1" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  
                  <div className="flex items-center text-amber-600 text-sm font-medium group-hover:text-amber-700">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex items-center text-xs text-gray-500">
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;