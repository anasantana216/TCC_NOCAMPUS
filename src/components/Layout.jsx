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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-xl border-b-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-3xl font-bold">
                <span className="text-blue-900">No</span>
                <span className="text-yellow-500">Campus</span>
              </div>
              <div className="ml-3 text-sm text-blue-700 font-medium hidden sm:block">
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
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
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
              
              {/* Login Button */}
              <Link
                to="/login"
                className="flex items-center px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl text-sm font-bold hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
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