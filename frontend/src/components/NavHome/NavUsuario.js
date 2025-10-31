import React from 'react';
import logo from '../../assets/img/logo.png';
import { useNavigate, Link } from "react-router-dom";
import Perfil from '../../assets/img/Profile.png';
import Sistema from '../../assets/img/icone-pc.png';
import Sair from '../../assets/img/Exit Icon.png';

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://44.210.221.162:8000/sisteminha_api";

function NavHome() {
  const navigate = useNavigate();
  const [desenvolvedorId, setDesenvolvedorId] = React.useState(localStorage.getItem("desenvolvedorId") || "1");
  const [isBuscarDesenvolvedor, setIsBuscarDesenvolvedor] = React.useState(true);
  const [palavraChave, setPalavraChave] = React.useState("");
  const [isDesenvolvedor, setIsDesenvolvedor] = React.useState(false);

  React.useEffect(() => {
    const id = localStorage.getItem("desenvolvedorId");
    if (id) setDesenvolvedorId(id);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.perfil === "desenvolvedor") {
      setIsDesenvolvedor(true);
    }

    console.log("ID salvo no localStorage:", id);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("🔍 Busca disparada:", palavraChave);
    navigate(`/buscar-${isBuscarDesenvolvedor ? 'desenvolvedor' : 'sistemas'}`, {
      state: {
        search: palavraChave,
      }
    });
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          console.warn('Falha no logout no backend:', response.status);
        }
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('desenvolvedorId');

      navigate('/login-desenvolvedor');
    } catch (error) {
      console.error('Erro ao tentar sair:', error);
      localStorage.clear();
      navigate('/login-desenvolvedor');
    }
  };

  return (
    <nav className="bg-purple-900">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <img
                onClick={() => navigate("/")}
                className="w-auto h-8 cursor-pointer"
                src={logo}
                alt="Logo Sisteminha"
              />
            </div>

            <div className='max-[950px]:hidden flex items-center bg-white rounded-md'>
              <div className='rounded-sm max-xl:text-[15px] w-48 relative h-9 group bg-purple-600'>
                <span className='flex items-center justify-between h-full p-2 font-sans font-medium text-white cursor-pointer'>
                  <span className='font-sans font-bold'>
                    {isBuscarDesenvolvedor ? 'Desenvolvedores' : 'Sistemas'}
                  </span>
                  <img src="/images/icons/expand-arrow.svg" alt="Seta" className='size-4' />
                </span>
                <span
                  className='absolute z-50 items-center justify-between hidden w-48 p-2 text-white transition-all duration-300 bg-purple-600 border-t-2 border-purple-400 opacity-0 cursor-pointer hover:bg-purple-700 group-hover:flex group-hover:opacity-100 hover:opacity-90'
                  onClick={() => setIsBuscarDesenvolvedor(!isBuscarDesenvolvedor)}
                >
                  <span className='font-sans font-bold'>
                    {isBuscarDesenvolvedor ? 'Sistemas' : 'Desenvolvedores'}
                  </span>
                </span>
              </div>

              {/* Campo de busca com botão */}
              <form onSubmit={handleSubmit} className="hidden sm:flex bg-white rounded-md flex max-xl:w-[300px] w-[345px]">
                <input
                  value={palavraChave}
                  onChange={({ target }) => setPalavraChave(target.value)}
                  type="text"
                  id="palavra-chave"
                  className="w-full ml-2 font-sans focus:outline-none"
                  name="palavra-chave"
                  placeholder={`Pesquisar ${isBuscarDesenvolvedor ? 'Desenvolvedores' : 'Sistemas'}...`}
                />
                <button
                  type="submit"
                  className="flex items-center w-10 p-2 transition-all duration-300 rounded-md cursor-pointer hover:bg-purple-200"
                >
                  <img src="/images/icons/lupa.svg" alt="Lupa" />
                </button>
              </form>
            </div>

            <div className="hidden sm:flex sm:ml-6">
              <div className="flex space-x-4">
                <Link to={`/perfil-desenvolvedor/${desenvolvedorId}`} className="px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white w-[50px]">
                  <img src={Perfil} alt="Perfil" />
                </Link>

                {/* Botão visível apenas para desenvolvedores */}
                {isDesenvolvedor && (
                  <button
                    onClick={() => navigate("/adicionar-sistema")}
                    className="px-3 py-2 w-[50px]"
                    title="Adicionar Sistema"
                  >
                    <img src={Sistema} alt="Botão Adicionar Sistema" />
                  </button>
                )}

                <Link to="/" onClick={handleLogout} className="px-3 py-2 text-base font-medium text-white w-[50px]">
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

export default NavHome;