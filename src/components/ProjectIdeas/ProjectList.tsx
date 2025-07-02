import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectIdea } from '../../types';

// Mock data for demonstration
const mockProjects: ProjectIdea[] = [
  {
    id: '1',
    title: 'AI-Powered Recipe Generator',
    description: 'Create a web application that generates personalized recipes based on available ingredients and dietary preferences using AI.',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    difficulty: 'medium',
    category: 'Web Development',
    estimatedTime: '2-3 weeks',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-15'
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    likes: 42,
    comments: 12,
    tags: ['AI', 'Food', 'Machine Learning']
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'Build a modern chat application with real-time messaging, file sharing, and group chat functionality.',
    techStack: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    difficulty: 'easy',
    category: 'Web Development',
    estimatedTime: '1-2 weeks',
    author: {
      id: '2',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-10'
    },
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    likes: 28,
    comments: 8,
    tags: ['Chat', 'Real-time', 'Social']
  },
  {
    id: '3',
    title: 'Blockchain Voting System',
    description: 'Develop a secure, transparent voting system using blockchain technology to ensure election integrity.',
    techStack: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    difficulty: 'hard',
    category: 'Blockchain',
    estimatedTime: '4-6 weeks',
    author: {
      id: '3',
      name: 'David Kim',
      email: 'david@example.com',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-05'
    },
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    likes: 67,
    comments: 23,
    tags: ['Blockchain', 'Security', 'Democracy']
  },
  {
    id: '4',
    title: 'Personal Finance Tracker',
    description: 'Create a comprehensive personal finance management app with expense tracking, budgeting, and investment monitoring.',
    techStack: ['React Native', 'Firebase', 'Chart.js', 'Plaid API'],
    difficulty: 'medium',
    category: 'Mobile Development',
    estimatedTime: '3-4 weeks',
    author: {
      id: '4',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-08'
    },
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    likes: 35,
    comments: 15,
    tags: ['Finance', 'Mobile', 'Analytics']
  }
];

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectIdea[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<ProjectIdea[]>(mockProjects);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let filtered = projects;

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, selectedDifficulty, selectedCategory]);

  const handleLike = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, likes: project.likes + 1 }
        : project
    ));
  };

  const categories = Array.from(new Set(projects.map(p => p.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Ideas</h1>
          <p className="text-gray-600">
            Discover amazing project ideas from the community
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-purple-100 text-purple-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-purple-100 text-purple-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div className="text-sm text-gray-500 ml-auto">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Project Grid/List */}
      {filteredProjects.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your filters or check back later for new projects.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;