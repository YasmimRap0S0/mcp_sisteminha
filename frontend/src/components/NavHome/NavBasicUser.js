import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from "react-router-dom";
import Perfil from '../../assets/img/Profile.png';
import Notificacao from '../../assets/img/icone_sino.png';
import Sair from '../../assets/img/Exit Icon.png';

function NavBasicUser() {
  return (
    <nav className="bg-purple-900">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <img 
                className="w-auto h-8 cursor-pointer" 
                src={logo} 
                alt="Logo Sisteminha" 
              />
            </div>

            <div className='max-[950px]:hidden flex items-center bg-white rounded-md'>
              <div className='rounded-sm max-xl:text-[15px] w-48 relative h-9 group bg-purple-600'>
                <span className='flex items-center justify-between h-full p-2 font-sans font-medium text-white cursor-pointer'>
                  <span className='font-sans font-bold'>
                    Desenvolvedores
                  </span>
                  <img src="/images/icons/expand-arrow.svg" alt="Lupa" className='size-4' />
                </span>
                <span 
                  className={`w-48 absolute z-50 border-t-2 border-purple-400 bg-purple-600 hover:bg-purple-700 group-hover:flex group-hover:opacity-100 opacity-0 transition-all duration-300 hidden items-center justify-between p-2 text-white hover:opacity-90 cursor-pointer`}
                >
                  <span className='font-sans font-bold'>
                    Sistemas
                  </span>
                </span>
              </div>
              <form className='hidden sm:flex bg-white rounded-md flex max-xl:w-[300px] w-[345px]'>
                <input 
                  type="text" 
                  id="palavra-chave" 
                  className='w-full ml-2 font-sans focus:outline-none' 
                  name="palavra-chave" 
                  placeholder="Pesquisar Desenvolvedores..." 
                />
                <div 
                  className='flex items-center w-10 p-2 transition-all duration-300 rounded-md cursor-pointer hover:bg-purple-200' 
                >
                  <img src="/images/icons/lupa.svg" alt="Lupa" />
                </div>
              </form>
            </div>

            <div className="hidden sm:flex sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/perfil-desenvolvedor" className="px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white w-[50px]">
                  <img src={Perfil} alt="Perfil" />
                </Link>
                <Link to="/" className="px-3 py-2 text-base font-medium text-white w-[50px]">
                  <img src={Notificacao} alt="Notificação" />
                </Link>
                <Link to="/" className="px-3 py-2 text-base font-medium text-white w-[50px]">
                  <img src={Sair} alt="Sair" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBasicUser;
