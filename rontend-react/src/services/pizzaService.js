import axios from 'axios';
import { config } from '../config';

const baseUrl = `${config.apiUrl}/pizzas`;

export const pizzaService = {
  getAllPizzas() {
    return axios.get(baseUrl).then((res) => res.data);
  },
  getPizzaById(id) {
    return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
  }
};
