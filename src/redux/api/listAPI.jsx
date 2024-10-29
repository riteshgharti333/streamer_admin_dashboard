import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL LISTS
export const getLists = () => {
  return axios.get(`${baseUrl}/list`);
};

//GET QUERY LITS
export const getQueryLists = (query) => {
  return axios.get(`${baseUrl}/list?type=${query}`, { withCredentials: true });
};

//GET SINGLE LIST
export const getSingleList = (id) => {
  return axios.get(`${baseUrl}/list/${id}`, { withCredentials: true });
};

//DELETE LISTS
export const deleteSingleList = (id) => {
  return axios.delete(`${baseUrl}/list/${id}`, { withCredentials: true });
};

//UPDATE LIST
export const updateSingleList = (id, updateList) => {
  return axios.put(`${baseUrl}/list/${id}`, updateList, {
    withCredentials: true,
  });
};

//CREATE MOVIE
export const createSingleList = (newList) => {
  return axios.post(`${baseUrl}/list/newlist`, newList, {
    withCredentials: true,
  });
};
