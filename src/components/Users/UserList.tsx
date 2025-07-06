import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus, Users, Search, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { follow, unfollow } from '../../services/api'; // Adjust import based on your API structure

interface SimpleProfile {
  _id: string;
  photo?: string;
  username: string;
}

interface UserListProps {
  users?: SimpleProfile[];
  title?: string;
  showSearch?: boolean;
  emptyMessage?: string;
  onFollowChange?: (userId: string, isFollowing: boolean) => void;
}

const UserList: React.FC<UserListProps> = ({
  users: propUsers,
  title = "Users",
  showSearch = true,
  emptyMessage = "No users found",
  onFollowChange
}) => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<SimpleProfile[]>(propUsers || []);
  const [filteredUsers, setFilteredUsers] = useState<SimpleProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const [loadingFollows, setLoadingFollows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (propUsers) {
      setUsers(propUsers);
      setFilteredUsers(propUsers);
    }
  }, [propUsers]);

  useEffect(() => {
    if (currentUser && users.length > 0) {
      const states: Record<string, boolean> = {};
      users.forEach(user => {
        // Check if current user is following this user by ID
        console.log(user);
        states[user._id] = currentUser.following?.includes(user._id) || false;
      });
      setFollowingStates(states);
    }
  }, [currentUser, users]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchQuery]);

  const handleFollowToggle = async (userId: string, event: React.MouseEvent) => {
    // Prevent navigation when clicking follow/unfollow button
    event.stopPropagation();
    
    if (!currentUser || loadingFollows[userId]) return;

    const isCurrentlyFollowing = followingStates[userId];
    
    setLoadingFollows(prev => ({ ...prev, [userId]: true }));
    
    try {
      // Optimistically update UI
      setFollowingStates(prev => ({
        ...prev,
        [userId]: !isCurrentlyFollowing
      }));

      // Call the appropriate API endpoint
      const response = isCurrentlyFollowing 
        ? await unfollow(userId)
        : await follow(userId);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update follow status');
      }

      // Notify parent component if callback provided
      onFollowChange?.(userId, !isCurrentlyFollowing);

    } catch (error) {
      console.error('Error toggling follow:', error);
      
      // Revert optimistic update on error
      setFollowingStates(prev => ({
        ...prev,
        [userId]: isCurrentlyFollowing
      }));
      
      setError('Failed to update follow status. Please try again.');
    } finally {
      setLoadingFollows(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <span className="text-sm text-gray-500">({filteredUsers.length})</span>
          </div>
          
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm w-64"
              />
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800 text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="p-6">
        {filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group hover:shadow-sm"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover group-hover:ring-2 group-hover:ring-purple-300 transition-all duration-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:ring-2 group-hover:ring-purple-300 transition-all duration-200">
                        <span className="text-white font-semibold text-lg">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                      @{user.username}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                      Click to view profile
                    </p>
                  </div>
                </div>

                {/* Follow/Unfollow Button */}
                {currentUser && currentUser.id !== user._id && (
                  <button
                    onClick={(e) => handleFollowToggle(user._id, e)}
                    disabled={loadingFollows[user._id]}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 min-w-[100px] justify-center ${
                      followingStates[user._id]
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
                    }`}
                  >
                    {loadingFollows[user._id] ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : followingStates[user._id] ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        <span>Unfollow</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
              >
                Clear search to see all users
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;