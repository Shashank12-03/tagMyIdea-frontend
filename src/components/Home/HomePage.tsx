import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Users, Rocket, Star, TrendingUp, Clock, Filter } from 'lucide-react';
import ProjectList from '../ProjectIdeas/ProjectList';
import { useAuth } from '../../contexts/AuthContext';
import { ProjectIdea } from '../../types';
import { getFeed } from '../../services/api';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [feedIdeas, setFeedIdeas] = useState<ProjectIdea[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  // Load feed for authenticated users
  const loadFeed = async () => {
    const feed = await getFeed();
    if (feed) {
      setFeedIdeas(feed.ideas);
      setFeedError(null);
    }
    setIsLoadingFeed(false);
  };
  useEffect(() => {
    if (user) {
      loadFeed();
    }
  }, [user, isLoadingFeed]);

  

  if (!user) {
    return (
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-8 py-16 sm:px-12 sm:py-20">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                Turn Your Ideas Into
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Amazing Projects
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Discover innovative project ideas, share your creativity, and connect with fellow developers 
                to build the next big thing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  Explore Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1,250+</h3>
            <p className="text-gray-600">Project Ideas Shared</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1</h3>
            <p className="text-gray-600">Active Developers</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">420+</h3>
            <p className="text-gray-600">Ideas shared</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ProjectHub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to discover, share, and build amazing projects with a vibrant community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Ideas</h3>
              <p className="text-gray-600 text-sm">
                Discover high-quality project ideas across all skill levels and technologies
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">
                Connect with like-minded developers and collaborate on exciting projects
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Start</h3>
              <p className="text-gray-600 text-sm">
                Clear descriptions, tech stacks, and difficulty levels help you get started quickly
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Feed for authenticated users
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, @{user.username}!
            </h1>
            <p className="text-purple-100">
              Discover the latest project ideas from the community
            </p>
          </div>
          <Link
            to="/create"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Share Idea</span>
          </Link>
        </div>
      </div>

      {/* Feed Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSortBy('latest')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                sortBy === 'latest' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Latest</span>
            </button>
            
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                sortBy === 'popular' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="w-3 h-3" />
              <span>Popular</span>
            </button>
            
            <button
              onClick={() => setSortBy('trending')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                sortBy === 'trending' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      {isLoadingFeed ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Loading your feed...</span>
        </div>
      ) : feedError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-4">{feedError}</p>
          <button
            onClick={loadFeed}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : feedIdeas.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Feed ({feedIdeas.length} ideas)
            </h2>
          </div>
          <ProjectList ideas={feedIdeas}/>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas in your feed yet</h3>
          <p className="text-gray-500 mb-4">Be the first to share an amazing project idea!</p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Share Your First Idea</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;