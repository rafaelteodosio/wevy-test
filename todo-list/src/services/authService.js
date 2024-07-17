import axios from 'axios';
const authService = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:3001/login', { username: email, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  },
};

export default authService;