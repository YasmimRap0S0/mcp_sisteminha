import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

function NavHome() {
  return (
    <nav className="bg-purple-900">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex items-center">
            <img className="w-auto h-8" src={logo} alt="Logo Sisteminha" />
          </div>

          {/* Esconde em telas menores */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link
                to="/login-desenvolvedor"
                className="px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/cadastro-desenvolvedor"
                className="px-3 py-2 text-base font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 hover:text-gray-300"
              >
                Cadastre-se
              </Link>
            </div>
          </div>

          {/* Menu Hamburguer para telas menores */}
          <div className="flex sm:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Dropdown menu (hidden por padrão, precisa de lógica de state e onClick) */}
            <div className="absolute right-0 hidden w-48 mt-2 bg-white rounded-md shadow-lg">
              <a
                href="/login-desenvolvedor"
                className="px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white"
              >
                Login
              </a>
              <a
                href="/cadastro-desenvolvedor"
                className="px-3 py-2 text-base font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 hover:text-gray-300"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavHome;
