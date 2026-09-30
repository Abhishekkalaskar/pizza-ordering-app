import axios from 'axios';
import { config } from '../config';

const baseUrl = `${config.apiUrl}/ingredients`;

export const ingredientsService = {
  getAllIngredients() {
    return axios.get(baseUrl).then((res) => res.data);
  }
};
