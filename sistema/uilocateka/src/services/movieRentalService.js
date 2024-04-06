import {get} from './requestService';

export const getMoveBorrowOfUser = async (idUser) => {
  try {
    const response = await get(`/movie-rental/${idUser}`);
    return response;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};

export const borrow = async (idUser, idMovie) => {
  try {
    const response = await get(`/movie-rental/borrow/${idUser}/${idMovie}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar usuários:', error);
    return false;
  }
};

export const returnBorrow = async (idBorow) => {
  try {
    const response = await get(`/movie-rental/return-borrow/${idBorow}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar usuários:', error);
    return false;
  }
};