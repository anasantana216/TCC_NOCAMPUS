import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Limpar dados de autenticação do localStorage/sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    
    // Redirecionar para a página de login
    navigate('/login');
  };

  const login = (token, userType, userInfo) => {
    // Salvar dados de autenticação
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  const getUserType = () => {
    return localStorage.getItem('userType');
  };

  const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  };

  return {
    logout,
    login,
    isAuthenticated,
    getUserType,
    getUserInfo
  };
};