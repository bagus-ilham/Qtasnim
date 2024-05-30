import api from "./api";

const apiUtils = {
  get: async (endpoint, params) => {
    try {
      const response = await api.get(endpoint, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  post: async (endpoint, data, headers = {}) => {
    try {
      const response = await api.post(endpoint, data, { headers });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  put: async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await api.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default apiUtils;
