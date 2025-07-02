import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight } from 'lucide-react';
import { ProjectIdea } from '../../types';

interface ProjectCardProps {
  project: ProjectIdea;
  onLike?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLike }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {project.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.tags)} ml-4`}>
            {project.tags}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Category and Time */}
        {/* 
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{project.category}</span>
          </span>
          {project.estimatedTime && (
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{project.estimatedTime}</span>
            </span>
          )}
        </div>
        */}

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {project.photo ? (
              <img
                src={project.photo}
                alt={project.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {(project?.username ?? '').charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{project.username}</p>
              <p className="text-xs text-gray-500">{formatDate(project.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike?.(project._id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{project.upvotes}</span>
            </button>
            {/* <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{project.comments}</span>
            </div> */}
          </div>
          <Link
            to={`/ideas/${project._id}`}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;