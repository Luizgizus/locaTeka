import {get, remove, put, post} from './requestService';

export const getUsers = async () => {
  try {
    const response = await get('/users');
    return response;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    const response = await get(`/users/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return [];
  }
};

export const createUser = async (body) => {
  try {
    const response = await post('/users', body);
    return response;
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
    return [];
  }
};

export const updateUser = async (id, body) => {
  try {
    const response = await put(`/users/${id}`, body);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar usuários:', error);
    return [];
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await remove(`/users/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar usuários:', error);
    return false;
  }
};