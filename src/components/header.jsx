import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout, isModalOpen, toggleModal } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }


    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-amber-800 text-white p-2 xs:p-4 border-b border-amber-700 shadow-lg z-50">
      <div className="w-[95%] xs:w-4/5 mx-auto flex justify-between items-center">
        <div className="text-lg xs:text-xl sm:text-2xl font-bold tracking-wider hover:text-stone-200 transition-all duration-300 cursor-pointer">
          RumbaCuba
        </div>

        <button
          className="md:hidden text-white p-1 xs:p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>


        <nav className="hidden md:block">
          <ul className="flex items-center space-x-4 lg:space-x-8">
            <li>
              <Link to="/" className="text-white hover:text-stone-200 transition-all duration-300 relative group text-sm lg:text-base">
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="flex items-center group">
              <a href="#" className="text-white hover:text-stone-200 transition-all duration-300 relative text-sm lg:text-base">
                Idioma
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <span className="ml-1 text-xs transform group-hover:rotate-180 transition-transform duration-300">▼</span>
            </li>
            <li>
              <Link to="/destinos" className="text-white hover:text-stone-200 transition-all duration-300 relative group text-sm lg:text-base">
                Destinos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-stone-200 transition-all duration-300 relative group text-sm lg:text-base">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/itinerario" className="text-white hover:text-stone-200 transition-all duration-300 relative group text-sm lg:text-base">
                Itinerarios
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              {user ? (
                <Link to="/profile" className="flex items-center space-x-2 border-2 border-white rounded-full px-2 py-1 hover:bg-white/20 transition-colors duration-300">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white text-sm lg:text-base">{user.fullName}</span>
                </Link>
              ) : (
                <button
                  className="bg-white text-amber-800 px-2 xs:px-4 py-1 xs:py-2 rounded-md font-medium hover:bg-stone-200 transition-all duration-300 text-sm lg:text-base"
                  onClick={toggleModal}
                >
                  Sign Up
                </button>
              )}
            </li>
          </ul>
        </nav>


        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-amber-800 border-b border-amber-700 md:hidden">
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <Link to="/" className="block text-white hover:text-stone-200 transition-all duration-300 text-base py-2" onClick={toggleMenu}>
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#" className="block text-white hover:text-stone-200 transition-all duration-300 text-base py-2" onClick={toggleMenu}>
                  Idioma
                </a>
              </li>
              <li>
                <Link to="/destinos" className="block text-white hover:text-stone-200 transition-all duration-300 text-base py-2" onClick={toggleMenu}>
                  Destinos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block text-white hover:text-stone-200 transition-all duration-300 text-base py-2" onClick={toggleMenu}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/itinerario" className="block text-white hover:text-stone-200 transition-all duration-300 text-base py-2" onClick={toggleMenu}>
                  Itinerarios
                </Link>
              </li>
              <li>
                {user ? (
                  <Link to="/profile" className="flex items-center space-x-2 border-2 border-white rounded-full px-2 py-1 hover:bg-white/20 transition-colors duration-300">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white">{user.fullName}</span>
                  </Link>
                ) : (
                  <button
                    className="w-full bg-white text-amber-800 px-4 py-2 rounded-md font-medium hover:bg-stone-200 transition-all duration-300 text-base"
                    onClick={toggleModal}
                  >
                    Sign Up
                  </button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={toggleModal}
            >
              &times;
            </button>
            <AuthForm onClose={toggleModal} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 