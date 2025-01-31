export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/'; // Redireciona para a página inicial/login
};

export const handleUnauthorized = () => {
  logout();
}; 