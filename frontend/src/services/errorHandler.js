// API error handling utility
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      errors: error.response.data?.errors || [],
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: null,
      message: 'No response from server. Please check your connection.',
      errors: [],
      data: null,
    };
  } else {
    // Error in request setup
    return {
      status: null,
      message: error.message || 'An unexpected error occurred',
      errors: [],
      data: null,
    };
  }
};

export default handleApiError;
