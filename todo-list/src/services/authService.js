const authService = {
  login: async (email, password) => {
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('token', 'dummy-token');
      return true;
    }
    return false;
  },
};

export default authService;