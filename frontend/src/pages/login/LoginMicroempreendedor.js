import { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavHome/NavHome';
import imagem from '../../assets/img/empreendedorismo.png';
import { LoginMicroempreendedorContexto } from "./LoginMicroempreendedorContexto";
import Footer from '../../components/Footer/Footer';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { BuscarDesenvolvedoresProvider } from '../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto';

export function LoginMicroempreendedor() {
  const { email, setEmail, password, setPassword, messages, setMessages, handleSubmit } = useContext(LoginMicroempreendedorContexto);

  return (
    <>
      <BuscarDesenvolvedoresProvider>
        <NavBar />
      </BuscarDesenvolvedoresProvider>

      {/* Error Messages Modal */}
      {messages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-red-600">Erro ao fazer login</h2>
            <ul className="mt-3 text-gray-700">
              {messages.map((msg, index) => (
                <li key={index} className="py-2 text-center">{msg.text}</li>
              ))}
            </ul>
            <button 
              onClick={() => setMessages([])} 
              className="px-4 py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex justify-center min-h-screen text-gray-900 bg-gray-100">
        <div className="relative z-20 flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow sm:m-5 sm:rounded-md">
          
          {/* Left Side (Form Section) */}
          <div className="relative z-20 p-0 mt-0 lg:w-1/2 xl:w-5/12 max-md:w-full">
            
            {/* Botões no início antes do login */}
            <div className="relative z-20 flex w-full">
              <Link to="/login-desenvolvedor" className="flex-1 py-4 font-bold text-center bg-gray-300 hover:bg-gray-400 text-[#978F9F]">
                Sou desenvolvedor
              </Link>
              <Link to="/login-microempreendedor" className="flex-1 py-4 text-center font-bold text-white bg-[#7D5C9C] hover:bg-indigo-700">
                Sou microempreendedor 
              </Link>
            </div>

            {/* Form Section */}
            <div className="flex flex-col items-center mt-10">
              {/* Social Media Sign Up Buttons */}
              <div className="flex flex-col items-center w-full mt-8">
                <button className="flex items-center justify-center w-full max-w-xs py-3 font-bold text-gray-800 bg-indigo-100 rounded-lg shadow-sm hover:shadow">
                  <FaGoogle className="w-6 h-6" />
                  <span className="ml-4">Faça login com Google</span>
                </button>
                <button className="flex items-center justify-center w-full max-w-xs py-3 mt-5 font-bold text-gray-800 bg-indigo-100 rounded-lg shadow-sm hover:shadow">
                  <FaGithub className="w-6 h-6" />
                  <span className="ml-2">Faça login com GitHub</span>
                </button>
              </div>
              
              {/* Divider with Text */}
              <div className="my-8 text-center border-b">
                <div className="inline-block px-2 text-sm font-medium text-gray-600 bg-white">
                  Ou entrar com e-mail
                </div>
              </div>
              
              {/* Email and Password Form */}
              <div className="max-w-xs mx-auto">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="mt-2 text-sm text-indigo-500 cursor-pointer hover:underline">Esqueci minha senha</p>
                  <button type="submit" className="mb-2 flex items-center justify-center w-full py-4 mt-5 font-semibold text-gray-100 bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none">
                    <span className="ml-3">Entrar</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side (Image + Text) */}
          <div className="max-md:hidden flex-1 flex justify-center items-center text-center bg-gradient-to-b from-[#7C5C9D] to-[#3B1C58] lg:flex">
            <div className="absolute top-[22%] -translate-y-1/2 right-15 text-white w-[360px] text-lg text-left ml-10 font-semibold">
              Oportunidades incríveis te esperam! Faça login agora e encontre o seu próximo desafio que te levará ao sucesso.
            </div>
            <img className="mt-8 w-80 h-80" src={imagem} alt="Imagem de um desenvolvedor" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
