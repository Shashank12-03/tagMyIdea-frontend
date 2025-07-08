import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectIdea } from '../../types';
import { upVote } from '../../services/api';
interface ProjectListProps {
  ideas: ProjectIdea[];
}

const ProjectList: React.FC<ProjectListProps> = ({ ideas }) => {
  const [projects, setProjects] = useState<ProjectIdea[]>(ideas);
  const [filteredProjects, setFilteredProjects] = useState<ProjectIdea[]>(ideas);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setProjects(ideas);
    setFilteredProjects(ideas);
  }, [ideas]);

  useEffect(() => {
    let filtered = projects;

    if (selectedDifficulty !== 'all') {
      filtered = filtered?.filter(project => project.tags === selectedDifficulty);
    }
    // Add category filter if needed
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(project => project.tags === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, selectedDifficulty, selectedCategory]);


  const handleLike = async (ideaId: string) => {
    await upVote(ideaId);
  };

  const categories = Array.from(new Set(projects?.map(p => p.tags)));

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
          {filteredProjects?.length} project{filteredProjects?.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Project Grid/List */}
      {filteredProjects && filteredProjects?.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProjects?.map((project) => (
            <ProjectCard 
              key={project._id} 
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