import axios from 'axios';
import apiService from '../apiService';
import config from '../../config';

jest.mock('axios');
const BASE_URL = config.apiUrl + '/api';

describe('apiService', () => {
  describe('get method', () => {
    it('should make a GET request to the specified endpoint without parameters', async () => {
      const endpoint = '/budgets';
      const token = 'dummyToken';

      const expectedResponse = {
        data: [{ id: 1, name: 'Groceries', budgetnumber: 100 }],
      };

      axios.get.mockResolvedValue(expectedResponse);

      const response = await apiService.get(endpoint, token);

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {}, // No parameters passed
      });

      expect(response).toEqual(expectedResponse.data);
    });

    it('should make a GET request to the specified endpoint with parameters', async () => {
      const endpoint = '/budgets';
      const token = 'dummyToken';
      const params = { month: 2 };

      const expectedResponse = {
        data: [{ id: 1, name: 'Rent', budgetnumber: 500 }],
      };

      axios.get.mockResolvedValue(expectedResponse);

      const response = await apiService.get(endpoint, token, params);

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params, // Parameters included
      });

      expect(response).toEqual(expectedResponse.data);
    });

    it('should handle errors and throw them', async () => {
      const endpoint = '/budgets';
      const token = 'dummyToken';

      const mockError = new Error('Error fetching data');
      axios.get.mockRejectedValue(mockError);

      try {
        await apiService.get(endpoint, token);
      } catch (error) {
        expect(error).toEqual(mockError);
      }
    });
  });
});
