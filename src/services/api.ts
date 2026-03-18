import axios from 'axios';

const API_BASE_URL = 'https://test-connect.api.clo-set.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-version': '2.0',
  },
});

export const creatorsApi = {
  getList: (params: { limit?: number; offset?: number }) =>
    apiClient.post('/creators', params),
};

export const followApi = {
  getFollowers: (creatorId: string, params?: { limit?: number; offset?: number }) =>
    apiClient.get(`/creators/${creatorId}/followers`, { params }),
  getFollowing: (creatorId: string, params?: { limit?: number; offset?: number }) =>
    apiClient.get(`/creators/${creatorId}/following`, { params }),
};
