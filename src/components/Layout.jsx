import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3, Menu, X, LogIn, Info } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Sobre', href: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/20 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-br from-yellow-300/15 to-orange-300/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-br from-blue-300/15 to-purple-300/15 rounded-full blur-xl"></div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-blue-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-indigo-900 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="text-3xl font-bold transition-all duration-300 group-hover:scale-105">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Campus</span>
              </div>
              <div className="ml-3 text-sm text-blue-700 font-medium hidden sm:block bg-gradient-to-r from-blue-50 to-orange-50 px-3 py-1 rounded-full border border-blue-200/50">
                Centro Universitário Adventista de Engenheiro Coelho
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white shadow-blue-300/50'
                        : 'text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 border border-blue-200/30 hover:border-orange-300/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-2 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Login Button */}
              <Link
                to="/login"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white rounded-2xl text-sm font-bold hover:from-orange-600 hover:via-yellow-400 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-orange-400/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LogIn className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Entrar</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-blue-900 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-md'
                          : 'text-blue-900 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Mobile Login Button */}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl text-sm font-bold hover:from-orange-600 hover:to-yellow-600 transition-all mt-3 shadow-md"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-3xl font-bold mb-6">
            <span className="text-white">No</span>
            <span className="text-yellow-400">Campus</span>
          </div>
          <p className="text-blue-200 mb-4 text-lg">
            🎓 Conectando estudantes através de eventos e experiências
          </p>
          <p className="text-orange-300 font-bold mb-6 text-lg bg-blue-800 py-2 px-4 rounded-full inline-block">
            Centro Universitário Adventista de Engenheiro Coelho - UNASP
          </p>
          <p className="text-blue-300 text-sm">
            © 2025 NoCampus UNASP EC. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;