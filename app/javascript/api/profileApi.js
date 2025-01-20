// api.js
import axiosInstance from './axiosInstance';

export const fetchProfile = async() => {
  try {
    const response = await axiosInstance.get(`/api/v1/profiles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament Ids:', error);
    throw error;
  }
}
export const updateProfile = async(data) => {
  try {
    const response = await axiosInstance.put(`/api/v1/profiles/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament Ids:', error);
    throw error;
  }
}

