import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProjectList from '../ProjectIdeas/ProjectList';
import UserList from '../Users/UserList';
import { ProjectIdea, User as UserType } from '../../types';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'idea';

  const [isLoading, setIsLoading] = useState(false);
  const [ideaResults, setIdeaResults] = useState<ProjectIdea[]>([]);
  const [userResults, setUserResults] = useState<UserType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const results = location.state?.searchResults;
    if (results) {
      processSearchResults(results);
    } else {
      setIsLoading(false);
    }
  }, [location.state, type]);

  const processSearchResults = (results: any) => {
    setIsLoading(false);

    if (type === 'idea' || type === '0') {
      // Map backend idea to frontend ProjectIdea type
      const ideas = results?.ideas || results;
      setIdeaResults(
        ideas.map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          techStack: item.techStack || [],
          tags: item.tags,
          howToBuild: item.howToBuild,
          upvotes: item.upvotes,
          createdAt: item.createdAt,
          authorId: item.author?._id || '',
          username: item.author?.username || 'Unknown',
          userId: item.author?._id || '',
          photo: item.author?.photo || '',
          estimatedTime: item.estimatedTime,
        }))
      );
    } else if (type === 'user' || type === '1') {
      const users = results?.users || results;
      setUserResults(
        users.map((item: any) => ({
          id: item._id,
          username: item.username,
          email: item.email || '',         // default to empty string
          photo: item.photo || '',         // default to empty string
          bio: item.bio || '',             // default to empty string
          dateJoined: item.dateJoined || item.createdAt || '',
          followers: item.followers || [],
          following: item.following || [],
          links: item.links || [],
          ideasPosted: item.ideasPosted || [],
          saveIdeas: item.saveIdeas || [],
        }))
      );
    }
  };

  const showLoading = isLoading || (!location.state?.searchResults && query);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Loading State */}
      {showLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4555EA]"></div>
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      )}

      {/* Results */}
      {!showLoading && (
        <>
          {(type === 'idea' || type === '0') ? (
            <ProjectList ideas={ideaResults} saveIdeas={[]} />
          ) : (
            <UserList users={userResults} title={`Users (${userResults.length})`} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;