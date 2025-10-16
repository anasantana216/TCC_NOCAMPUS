import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ 
  variant = 'default', 
  size = 'medium', 
  showIcon = false, 
  className = '',
  children 
}) => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white';
      case 'secondary':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white';
      case 'outline':
        return 'border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white';
      case 'ghost':
        return 'text-orange-600 hover:bg-orange-50';
      default:
        return 'bg-orange-500 hover:bg-orange-600 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1 text-xs';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <button
      onClick={logout}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-lg font-medium transition-all duration-200 
        hover:shadow-md focus:outline-none focus:ring-2 
        focus:ring-orange-500 focus:ring-offset-2
        flex items-center space-x-2
        ${className}
      `}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      <span>{children || 'Sair'}</span>
    </button>
  );
};

export default LogoutButton;