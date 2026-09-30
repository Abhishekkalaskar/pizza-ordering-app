import axios from 'axios';
import { config } from '../config';

const baseUrl = `${config.apiUrl}/orders`;

export const orderService = {
  checkout(items) {
    const payload = {
      items: items.map((i) => ({
        name: i.name,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        customIngredients: i.customIngredients || []
      }))
    };
    return axios.post(`${baseUrl}/checkout`, payload).then((res) => res.data);
  }
};
