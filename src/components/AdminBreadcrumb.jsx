import React from 'react';
import { ChevronRight, Home, Settings } from 'lucide-react';

const AdminBreadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-blue-700 mb-6">
      <a 
        href="/admin/dashboard" 
        className="flex items-center space-x-1 hover:text-blue-900 transition-colors duration-200 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/70"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </a>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-blue-400" />
          {item.href ? (
            <a 
              href={item.href}
              className="hover:text-blue-900 transition-colors duration-200 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/70"
            >
              {item.label}
            </a>
          ) : (
            <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AdminBreadcrumb;