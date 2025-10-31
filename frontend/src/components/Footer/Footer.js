import logo from '../../assets/img/logo-purple.png';
import React from 'react';
import { HelpCircle } from "lucide-react"; // Importando o ícone

export default function Footer() {
    return (
        <footer className="flex justify-center w-full px-2 py-1 text-gray-800 bg-gray-200">
          <div className="container grid max-w-6xl grid-cols-4 gap-6">
            
            {/* Coluna 1 - Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Logo Sisteminha" className="h-10" />
            </div>
            
            {/* Coluna 2 - Suporte */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-indigo-600 uppercase">Suporte</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-indigo-500">Como funciona?</a></li>
                <li><a href="#" className="hover:text-indigo-500">Política de Privacidade</a></li>
              </ul>
            </div>
            
            {/* Coluna 3 - Contato */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-indigo-600 uppercase">Contato</h3>
              <p>Email: sisteminha@gmail.com</p>
              <p>Telefone: (00) 1234-5678</p>
            </div>

            {/* Coluna 4 - Precisa de Ajuda */}
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-gray-600 hover:text-indigo-500" />
              <a href="#" className="text-sm font-medium hover:text-indigo-500">Precisa de ajuda?</a>
            </div>

          </div>
        </footer>
    );
};
