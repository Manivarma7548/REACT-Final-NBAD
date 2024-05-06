//authService.js
import axios from 'axios';
import config from '../../config';
const API_URL = config.apiUrl;

const authService = {
  Registeration: async (username, password, fullName) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/registering`, {
        fullName,
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error during Registeration:', error);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/logingin`, {
        username,
        password,
      });

      const { token, refreshToken } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      return token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      let refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        const response = await axios.get(`${API_URL}/api/auth/refreshAccessToken`);
        refreshToken = response.data.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
      }

      const response = await axios.get(`${API_URL}/api/auth/refreshAccessToken`, {
        refreshToken,
      });
      console.log('response in refreshaccesstoken', response);
      const newToken = response.data.accessToken;
      localStorage.setItem('token', newToken);

      return newToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  },

  checkTokenExpiration: () => {
    const expirationTime = Math.floor(Date.now() / 1000) + 50; 
    const currentTime = Date.now() / 1000; 

    return currentTime < expirationTime;
  },

  makeAuthenticatedRequest: async (url, options = {}) => {
    try {
      let token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token available');
      }
      const isTokenExpired = authService.checkTokenExpiration(token);

      if (isTokenExpired) {

        token = await authService.refreshAccessToken();

        if (!token) {
          throw new Error('Failed to refresh token');
        }
      }

      const response = await axios(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Authenticated request error:', error);
      throw error;
    }
  },
};

export default authService;
