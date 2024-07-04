const authService = {
  login: async (email, password) => {
    if (email === 'user@example.com' && password === 'password') {
      const token = 'dummy-token';
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  },
};

export default authService;