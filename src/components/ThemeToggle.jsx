import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ variant = 'default', className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const baseClasses = "flex items-center justify-center transition-all duration-300";
  
  const variants = {
    default: `${baseClasses} p-2 rounded-lg border-2 hover:scale-105 ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-600 text-amber-400 hover:bg-slate-700 shadow-lg shadow-slate-900/20' 
        : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50'
    }`,
    compact: `${baseClasses} p-1.5 rounded-md ${
      isDarkMode 
        ? 'bg-slate-700 text-amber-400 hover:bg-slate-600 shadow-md shadow-slate-900/30' 
        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
    }`,
    floating: `${baseClasses} p-3 rounded-full shadow-lg fixed bottom-6 right-6 z-50 ${
      isDarkMode 
        ? 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-600 shadow-xl shadow-slate-900/40' 
        : 'bg-white text-orange-600 hover:bg-orange-50 border border-orange-200'
    }`
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${variants[variant]} ${className}`}
      title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      aria-label={`Alternar para tema ${isDarkMode ? 'claro' : 'escuro'}`}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium hidden sm:inline">Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium hidden sm:inline">Escuro</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;