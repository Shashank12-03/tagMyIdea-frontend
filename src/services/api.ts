import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://localhost:5000';

console.log('API_BASE_URL:', API_BASE_URL);
export async function googleSignIn() {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/google`);
        return response.data;
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
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
        console.log('User Profile fetched successfully:', response.data);
        return response.data.user;
    } catch (error) {
        console.error('Get User Profile Error:', error);
        throw error;
    }
}

export async function updateProfile(data: unknown) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.put(`${API_BASE_URL}/user/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error('Failed to update profile');
        }
        console.log('Profile updated successfully:', response.data);
        return true;

    } catch (error) {
        console.error('Update Profile Error:', error);
        throw error;
    }
    
}


export async function getUserById(userId: string) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.get(`${API_BASE_URL}/user/fetch-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error('Failed to fetch user');
        }
        return response.data.user;
    } catch (error) {
        console.error('Get User By ID Error:', error);
        throw error;
    }
}

export async function getFeed(){
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
        const feed = response.data.feed;
        const data = {
            ideas: feed.ideas.map((idea: any) => ({
                ...idea,
                'username':feed.user.username,
                'photo': feed.user.photo,
                'id': feed.user._id,
            })),
        }
        console.log('Feed fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Get Feed Error:', error);
        throw error;
    }
}
export async function upVote(ideaId: string) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.post(`${API_BASE_URL}/idea/upvote`,{ideaId:ideaId},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;  
        }
        throw new Error('Failed to upvote idea');
    } catch (error) {
        console.error('Get Feed Error:', error);
        throw error;
    }
}

export async function createIdea(idea:unknown) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.post(`${API_BASE_URL}/idea/create`,{idea},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            console.log('Idea created successfully:', response.data);
            return true;  
        }
        throw new Error('Failed to upvote idea');
    } catch (error) {
        console.error('Get Feed Error:', error);
        throw error;
    }
}

export async function getList(list:unknown[]) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/user/fetch-list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                list: JSON.stringify(list)
            }
        });
        if (response.status === 200) {
            return response.data.list;  
        }
        throw new Error('Failed to fetch list');
    } catch (error) {
        console.error('Get List Error:', error);
        throw error;
    }
}

export async function follow(followId:string) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    try {
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
        throw error;
    }
}

export async function unfollow(unfollowId:string) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    try {
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
        throw error;
    }
}

export async function getSavedIdeas(id:unknown) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/user/get-saved-ideas/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data.savedIdeas;  
        }
        throw new Error('Failed to fetch user ideas');
    } catch (error) {
        console.error('Get User Ideas Error:', error);
        throw error;
    }
}