import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const get = async (path) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.get(`${apiUrl}${path}`, {headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};

export const post = async (path, body) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.post(`${apiUrl}${path}`, body,{headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return {};
  }
};

export const postFetch = async (path, formData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      body: formData,
      headers: {'Authorization': `Bearer ${token}`}
    });

    if (!response.ok) {
      throw new Error(response);
    }

    return response;

  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return {};
  }
};

export const putFetch = async (path, formData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${apiUrl}${path}`, {
      method: "PUT",
      body: formData,
      headers: {'Authorization': `Bearer ${token}`}
    });

    if (!response.ok) {
      throw new Error(response);
    }

    return response;

  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return {};
  }
};

export const put = async (path, body) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.put(`${apiUrl}${path}`, body,{headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return {};
  }
};

export const remove = async (path) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.delete(`${apiUrl}${path}`, {headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    if(error.statusCode === 401){
      localStorage.removeItem("user");
    }
    console.error('Erro ao obter usuários:', error);
    return {};
  }
};