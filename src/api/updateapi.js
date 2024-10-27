import axios from 'axios'
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserByEmail = async (email) =>{
    try {
        const response  = await axios.get(`${API_URL}/api/user/${email}`);
        return response.data.data.info;
    } catch (error) {
        console.log('Error fetching user by email: ',error);
        throw error;
    }
}

export const getUser  = async() =>{
    axios.get(`${API_URL}/api/user`) 
    .then(response => {
        console.log('Users:', response.data.data.users); 
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
}

export const updateUserDetails = async (data, token) => {
    const res = await fetch(`${API_URL}/api/user/update`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || 'Failed to update user details');
    }

    return res.json();
}
