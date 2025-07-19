import { collection, getDocs, doc, getDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blogPosts';

export const blogService = {
  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      // For now, return mock data. In production, this would fetch from Firestore
      return blogPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } catch (error) {
      console.error('Error getting blog posts:', error);
      throw error;
    }
  },

  // Get blog post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const post = blogPosts.find(post => post.id === id);
      return post || null;
    } catch (error) {
      console.error('Error getting blog post:', error);
      throw error;
    }
  },

  // Get posts by category
  async getPostsByCategory(category: BlogPost['category']): Promise<BlogPost[]> {
    try {
      return blogPosts
        .filter(post => post.category === category)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } catch (error) {
      console.error('Error getting posts by category:', error);
      throw error;
    }
  },

  // Get recent posts
  async getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
    try {
      return blogPosts
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recent posts:', error);
      throw error;
    }
  }
};