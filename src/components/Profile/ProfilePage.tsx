import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { 
  Edit3, 
  Save, 
  X, 
  Calendar,  
  UserPlus, 
  Link as LinkIcon, 
  Plus,
  Camera,
  Globe,
  UserMinus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import { getUserById, updateProfile, getList } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../ProjectIdeas/ProjectList';
import Avatar from '../UI/Avatar';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { user: currentUser} = useAuth();
  console.log(currentUser);
  // const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [newLink, setNewLink] = useState('');
  
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    photo: '',
    links: [] as string[]
  });
  // Determine if viewing own profile
  const isOwnProfile = !userId || userId === currentUser?.id;
  const navigate = useNavigate();
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        if (isOwnProfile && currentUser) {
          setProfileUser(currentUser);
          setEditForm({
            username: currentUser.username,
            bio: currentUser.bio || '',
            photo: currentUser.photo || '',
            links: currentUser.links || []
          });
        } else if (userId) {
          const user = await getUserById(userId);
          setProfileUser(user);
        }
        else{
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get('token');
          console.log('URL Params:', urlParams.toString());
          const decodedToken = token ? decodeURIComponent(token) : null;
          console.log('Token:', decodedToken);
          if (decodedToken) {
            localStorage.setItem('authToken', decodedToken);
            navigate('/'); 
          } else {
            console.error('Token or user data missing');
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, currentUser, isOwnProfile]);

  const handleSave = async () => {
    if (!isOwnProfile || !currentUser) return;
    
    setSaving(true);
    try {
      const updatedUser = {
        id: currentUser.id,
        email: currentUser.email,
        dateJoined: currentUser.dateJoined,
        followers: currentUser.followers,
        following: currentUser.following,
        username: editForm.username,
        bio: editForm.bio,
        photo: editForm.photo,
        links: editForm.links,
      };
      console.log('Updating profile with:', updatedUser);
      const res = await updateProfile(updatedUser);
      if (!res) {
        throw new Error('Failed to update profile');
      }
      setProfileUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileUser) {
      setEditForm({
        username: profileUser.username,
        bio: profileUser.bio || '',
        photo: profileUser.photo || '',
        links: profileUser.links || []
      });
    }
    setIsEditing(false);
  };

  const addLink = () => {
    if (newLink.trim() && !editForm.links.includes(newLink.trim())) {
      setEditForm(prev => ({
        ...prev,
        links: [...prev.links, newLink.trim()]
      }));
      setNewLink('');
    }
  };

  const removeLink = (linkToRemove: string) => {
    setEditForm(prev => ({
      ...prev,
      links: prev.links.filter(link => link !== linkToRemove)
    }));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleList = async (list: unknown[]) => {
    try {
      const userIds = Array.isArray(list) ? list : [];
      const profiles = await getList(userIds);
      navigate('/user-list', { state: { profiles } });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
        <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
            {/* Profile Picture */}
            <div className="relative">
              {isEditing ? (
                <div className="relative">
                  <Avatar
                    username={profileUser.username}
                    photo={editForm.photo}
                    size="2xl"
                    className="border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2">
                    <input
                      type="url"
                      value={editForm.photo}
                      onChange={(e) => setEditForm(prev => ({ ...prev, photo: e.target.value }))}
                      className="hidden"
                      id="photo-input"
                    />
                    <label
                      htmlFor="photo-input"
                      className="flex items-center justify-center p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                    </label>
                  </div>
                </div>
              ) : (
                <Avatar
                  username={profileUser.username}
                  photo={profileUser.photo}
                  size="2xl"
                  className="border-4 border-white shadow-lg"
                />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-purple-300 focus:border-purple-600 outline-none"
                    />

                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">@{profileUser.username}</h1>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  {isOwnProfile ? (
                    isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Saving...' : 'Save'}</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    )
                  ) : (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                      {/* { isFollowing ? (
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      ) :(
                        <UserMinus className="w-4 h-4" />
                        <span>Unfollow</span>
                      )
                      } */}
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700">
                    {profileUser.bio || 'No bio available.'}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profileUser.dateJoined ? formatDate(profileUser.dateJoined) : 'Recently'}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <button
                      className="text-lg font-semibold text-gray-900 hover:text-purple-600 focus:outline-none"
                      onClick={() => handleList(profileUser.followers)}
                      type="button"
                    >
                      {profileUser.followers?.length || 0}
                    </button>
                    <span className="text-xs text-gray-500 mt-1">Followers</span>
                  </div>
                  {/* Following */}
                  <div className="flex flex-col items-center">
                    <button
                      className="text-lg font-semibold text-gray-900 hover:text-purple-600 focus:outline-none"
                      onClick={() => handleList(profileUser.following)} 
                      type="button"
                    >
                      {profileUser.following?.length || 0}
                    </button>
                    <span className="text-xs text-gray-500 mt-1">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Links</span>
          </h2>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {/* Add New Link */}
            <div className="flex space-x-2">
              <input
                type="url"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a link (e.g., https://github.com/username)"
              />
              <button
                onClick={addLink}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Existing Links */}
            <div className="space-y-2">
              {editForm.links.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <LinkIcon className="w-4 h-4 text-gray-500" />
                  <span className="flex-1 text-sm text-gray-700">{link}</span>
                  <button
                    onClick={() => removeLink(link)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {profileUser.links && profileUser.links.length > 0 ? (
              profileUser.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <LinkIcon className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                  <span className="text-sm text-gray-700 group-hover:text-purple-600">{link}</span>
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No links added yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isOwnProfile ? 'Your Ideas' : `${profileUser.username}'s ideas`}
        </h2>
        {profileUser?.ideasPosted && profileUser.ideasPosted.length > 0 ? (
          <ProjectList ideas={profileUser.ideasPosted} saveIdeas={[]} />
        ) : (
          <p className="text-gray-500 text-sm">
            {isOwnProfile ? "You haven't posted any ideas yet." : `${profileUser.username} hasn't posted any ideas yet.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;