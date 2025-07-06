import axios from 'axios';


// const API_BASE_URL = 'https://tagmyidea.el.r.appspot.com';
const API_BASE_URL = 'http://localhost:5000';


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
        return response.data.feed;
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