import axios from 'axios';
import jsonClient from './jsonServerInstance';
import { UserResponse } from './models/LoginResponse';

const authenticateUser = async (email: string, password: string): Promise<UserResponse> => {
  try {
    const response = await jsonClient.post(`auth/login`, { email, password });
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Failed to authenticate');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Network error');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
export { authenticateUser };
