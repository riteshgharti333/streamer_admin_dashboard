import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL USER
export const getUsers = () => {
  return axios.get(`${baseUrl}/users`);
};

//GET SINGLE USER
export const getSingleUser = (id) => {
  return axios.get(`${baseUrl}/users/${id}`);
};

//DELETE USER
export const deleteSingleUser = (id) => {
  return axios.delete(`${baseUrl}/users/${id}`, { withCredentials: true });
};

//UPDATE USER
export const updateSingleUser = (id, updatedUser) => {
  return axios.put(`${baseUrl}/users/${id}`, updatedUser, {
    withCredentials: true,
  });
};
