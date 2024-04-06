import {get, remove, postFetch, putFetch} from './requestService';

export const getMovie = async () => {
  try {
    const response = await get('/movies');
    return response;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await get(`/movies/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return [];
  }
};

export const createMovie = async (body) => {
  try {
    const response = await postFetch('/movies', body);
    return response;
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
    return [];
  }
};

export const updateMovie = async (id, body) => {
  try {
    const response = await putFetch(`/movies/${id}`, body);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar usuários:', error);
    return [];
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await remove(`/movies/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar usuários:', error);
    return false;
  }
};