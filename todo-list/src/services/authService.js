import axios from 'axios';
const authService = {
  login: async (email, password) => {
    let response;
    try {
      response = await axios.post('http://localhost:3001/login', { username: email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        return token;
      }
    } catch (_) {
      return null;
    }
  },
};

export default authService;