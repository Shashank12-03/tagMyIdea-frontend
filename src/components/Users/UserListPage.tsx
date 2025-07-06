import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UserList from './UserList';

interface SimpleProfile {
  _id: string;
  photo?: string;
  username: string;
}

const UserListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const profiles = location.state?.profiles as SimpleProfile[] | undefined;
  
  // If no profiles provided, redirect back
  if (!profiles) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No User Data</h2>
          <p className="text-gray-600 mb-6">No user profiles were provided to display.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="h-6 w-px bg-gray-300"></div>
        <h1 className="text-2xl font-bold text-gray-900">User Profiles</h1>
      </div>

      {/* User List Component */}
      <UserList
        users={profiles}
        title={`User Profiles (${profiles.length})`}
        showSearch={true}
        emptyMessage="No profiles to display"
        onFollowChange={(userId, isFollowing) => {
          console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
        }}
      />
    </div>
  );
};

export default UserListPage;