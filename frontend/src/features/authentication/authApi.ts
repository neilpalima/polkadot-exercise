import axios, { AxiosError } from 'axios';

export const authenticate = async (password: string) => {
  try {
    await axios.post('/authentication', {
      password
    });
  } catch (error) {
    const message = error?.response?.data?.message || error.message;

    throw new Error(message);
  }
};
