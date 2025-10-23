const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
    get: async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include", // if using cookies or auth
        });
        return handleResponse(response);
    },

    post: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    put: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    patch: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    delete: async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include",
        });
        return handleResponse(response);
    },
};

// 🔍 Centralized response handler
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }
    return response.json();
}
