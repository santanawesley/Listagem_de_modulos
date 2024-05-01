import axios from 'axios';
import { Module } from '../../types/apiTypes';

interface ApiResponse {
  statusCode: number;
  body: Module[];
}

const getModules = async (URL: string, accessToken: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: accessToken
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getModules;
