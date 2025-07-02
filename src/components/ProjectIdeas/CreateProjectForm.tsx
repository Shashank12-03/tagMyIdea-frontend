import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createIdea } from '../../services/api';

const CreateProjectForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // {
  // "title": "Mood-Based Music Recommender",
  // "description": "App that detects mood via text or voice and plays matching music.",
  // "tags": "hard",
  // "techStack": ["Flutter", "Python Flask", "Spotify API", "Google Cloud Speech-to-Text"],
  // "howToBuild": "Frontend in Flutter. Backend in Flask to process text/voice input and detect emotion. Integrate Spotify API to play mood-aligned playlists."
  // }
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [] as string[],
    tags: 'easy' as 'easy' | 'medium' | 'hard',
    howToBuild: '',
  });
  const [currentTech, setCurrentTech] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log('Initial formData:', formData);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    try {
      console.log('Creating project:', formData);
      const res = await createIdea(formData);
      if (!res) {
        throw new Error('Failed to create project idea');
      }
      console.log('Project created successfully:', res);
      navigate('/');
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTechStack = () => {
    if (currentTech.trim() && !formData.techStack.includes(currentTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };


  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in Required</h2>
        <p className="text-gray-600">Please sign in to create a project idea.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project Idea</h1>
          <p className="text-gray-600 mt-2">
            Share your innovative project idea with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter a compelling project title..."
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your project idea in detail..."
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              How to Build *
            </label>
            <textarea
              id="howToBuild"
              required
              rows={4}
              value={formData.howToBuild}
              onChange={(e) => setFormData(prev => ({ ...prev, howToBuild: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your project idea in detail..."
            />
          </div>
          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level *
              </label>
              <select
                id="difficulty"
                required
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value as 'easy' | 'medium' | 'hard' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technology Stack
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={currentTech}
                onChange={(e) => setCurrentTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add technology (e.g., React, Node.js, Python)"
              />
              <button
                type="button"
                onClick={addTechStack}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating...' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;