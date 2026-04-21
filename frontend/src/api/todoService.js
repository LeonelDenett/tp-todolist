import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

export default {
  getAll() {
    return axios.get(API_URL);
  },
  get(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  create(todo) {
    return axios.post(API_URL, todo);
  },
  update(id, todo) {
    return axios.put(`${API_URL}/${id}`, todo);
  },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
  toggleCompleted(id) {
    return axios.patch(`${API_URL}/${id}/toggle`);
  }
};
