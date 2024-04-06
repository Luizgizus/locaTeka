import { post } from './requestService';

export const login = async (email, password) => {
  const body= {
    email,
    password
  }

  const response = await post('/auth/login', body);
  return response;
};