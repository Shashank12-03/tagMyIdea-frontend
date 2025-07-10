import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://localhost:5000';

console.log('API_BASE_URL:', API_BASE_URL);

export async function googleSignIn() {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/google`);
        
        if (response.status === 200 && response.data) {
            return response.data;
        }
        throw new Error('Invalid response from Google Sign-In');
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        if (error.response) {
            throw new Error(error.response.data?.message || 'Google Sign-In failed');
        }
        throw new Error('Network error during Google Sign-In');
    }
}

export async function getUserProfile() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await axios.get(`${API_BASE_URL}/user/fetch-logged-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200 && response.data?.user) {
            console.log('User Profile fetched successfully:', response.data);
            return response.data.user;
        }
        throw new Error('Invalid user profile response');
    } catch (error) {
        console.error('Get User Profile Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch user profile');
        }
        throw error;
    }
}

export async function updateProfile(data) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!data || Object.keys(data).length === 0) {
            throw new Error('Profile data is required');
        }
        
        const response = await axios.put(`${API_BASE_URL}/user/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            console.log('Profile updated successfully:', response.data);
            return true;
        }
        throw new Error('Failed to update profile');
    } catch (error) {
        console.error('Update Profile Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to update profile');
        }
        throw error;
    }
}

export async function getUserById(userId) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        const response = await axios.get(`${API_BASE_URL}/user/fetch-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200 && response.data?.user) {
            return response.data.user;
        }
        throw new Error('User not found');
    } catch (error) {
        console.error('Get User By ID Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response?.status === 404) {
            throw new Error('User not found');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch user');
        }
        throw error;
    }
}

export async function getFeed() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await axios.get(`${API_BASE_URL}/user/feed`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200 && response.data?.feed) {
            const feed = response.data.feed;
            
            if (!feed.ideas || !Array.isArray(feed.ideas)) {
                throw new Error('Invalid feed data structure');
            }
            
            const data = {
                ideas: feed.ideas.map((idea) => ({
                    ...idea,
                    'username': feed.user?.username || 'Unknown',
                    'photo': feed.user?.photo || '',
                    'id': feed.user?._id || '',
                })),
            };
            return data;
        }
        throw new Error('Invalid feed response');
    } catch (error) {
        console.error('Get Feed Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch feed');
        }
        throw error;
    }
}

export async function upVote(ideaId) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!ideaId) {
            throw new Error('Idea ID is required');
        }
        
        const response = await axios.post(`${API_BASE_URL}/idea/upvote`, { ideaId: ideaId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to upvote idea');
    } catch (error) {
        console.error('Upvote Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to upvote idea');
        }
        throw error;
    }
}

export async function createIdea(idea) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!idea || typeof idea !== 'object') {
            throw new Error('Valid idea data is required');
        }
        
        const response = await axios.post(`${API_BASE_URL}/idea/create`, { idea }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 201) {
            console.log('Idea created successfully:', response.data);
            return true;
        }
        throw new Error('Failed to create idea');
    } catch (error) {
        console.error('Create Idea Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to create idea');
        }
        throw error;
    }
}

export async function getList(list) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!Array.isArray(list)) {
            throw new Error('List must be an array');
        }
        
        const response = await axios.get(`${API_BASE_URL}/user/fetch-list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                list: JSON.stringify(list)
            }
        });
        
        if (response.status === 200 && response.data?.list) {
            return response.data.list;
        }
        throw new Error('Failed to fetch list');
    } catch (error) {
        console.error('Get List Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch list');
        }
        throw error;
    }
}

export async function follow(followId) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!followId) {
            throw new Error('User ID is required');
        }
        
        const response = await axios.post(`${API_BASE_URL}/user/follow`, { followId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to follow user');
    } catch (error) {
        console.error('Follow User Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to follow user');
        }
        throw error;
    }
}

export async function unfollow(unfollowId) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!unfollowId) {
            throw new Error('User ID is required');
        }
        
        const response = await axios.post(`${API_BASE_URL}/user/unfollow`, { unfollowId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to unfollow user');
    } catch (error) {
        console.error('Unfollow User Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to unfollow user');
        }
        throw error;
    }
}

export async function getSavedIdeas(id) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!id) {
            throw new Error('User ID is required');
        }
        
        const response = await axios.get(`${API_BASE_URL}/user/get-saved-ideas/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200 && response.data?.savedIdeas) {
            return response.data.savedIdeas;
        }
        throw new Error('Failed to fetch saved ideas');
    } catch (error) {
        console.error('Get Saved Ideas Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch saved ideas');
        }
        throw error;
    }
}

export async function triggerJob() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const lastTrigger = localStorage.getItem('lastFeedTrigger');
        const currentTime = Date.now();

        if (!lastTrigger || currentTime - parseInt(lastTrigger) > 3 * 60 * 60 * 1000) {
            const response = await axios.post(`${API_BASE_URL}/user/test-jobs`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            
            if (response.status === 200) {
                localStorage.setItem('lastFeedTrigger', currentTime.toString());
                console.log(`Feed job triggered at ${new Date(currentTime).toLocaleTimeString()}`);
                return true;
            }
            throw new Error('Failed to trigger job');
        }

        console.log('Job already triggered within the last 3 hours');
        return false;
    } catch (error) {
        console.error('Error triggering job:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
        }
        return false;
    }
}

export async function updateSave(ideaId, save) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        if (!ideaId) {
            throw new Error('Idea ID is required');
        }
        
        if (typeof save !== 'boolean') {
            throw new Error('Save parameter must be true or false');
        }
        
        const response = await axios.put(`${API_BASE_URL}/user/update-saved-ideas`, { ideaId, save }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            console.log('Save updated successfully:', response.data);
            return true;
        }
        throw new Error('Failed to update save status');
    } catch (error) {
        console.error('Update Save Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Authentication failed. Please log in again.');
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to update save status');
        }
        throw error;
    }
}