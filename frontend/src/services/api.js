import handleApiError from './errorHandler';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const API_URL = `${API_BASE}/api/news`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP Error ${response.status}`
    }));
    throw new Error(error.message || `HTTP Error ${response.status}`);
  }
  return response.json();
};


export const getBreakingNews = async () => {
  try {
    const res = await fetch(`${API_URL}/breaking-news`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    throw handleApiError(error);
  }
};

export const getAllNews = async () => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw handleApiError(error);
  }
};

export const getNewsByCategory = async (category) => {
  try {
    if (!category || category.trim() === '') {
      throw new Error('Category is required');
    }

    const res = await fetch(`${API_URL}/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching category news:', error);
    throw handleApiError(error);
  }
};

export const getNewsById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      throw new Error('Valid news ID is required');
    }

    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw handleApiError(error);
  }
};
