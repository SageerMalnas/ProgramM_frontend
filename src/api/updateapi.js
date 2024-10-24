const API_URL = import.meta.env.VITE_API_BASE_URL;


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
