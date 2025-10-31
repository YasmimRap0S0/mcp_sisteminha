import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagem from '../../assets/img/microempreendedor.png';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavHome/NavHome';
import { BuscarDesenvolvedoresProvider } from '../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto';
function CadastroMicroempreendedor() {
  const navigate = useNavigate();

 
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/sisteminha_api/auth/registro/microempreendedor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: email, 
            email,
            password,
            perfil: 'microempreendedor',
            first_name: firstName,
            last_name: lastName
          },
          cnpj,
          
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Erro ao cadastrar microempreendedor. Tente novamente mais tarde.";

        if (errorData && errorData.non_field_errors) {
          errorMessage = errorData.non_field_errors.join('\n');
        } else if (errorData) {
          errorMessage = JSON.stringify(errorData);
        }

        throw new Error(`${response.status} - ${errorMessage}`);
      }

      setFirstName('');
      setLastName('');
      setCnpj('');
      setEmail('');
      setPassword('');
      navigate('/login-microempreendedor');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <BuscarDesenvolvedoresProvider>
        <NavBar />
      </BuscarDesenvolvedoresProvider>

      <div className="relative z-10 flex justify-center min-h-screen text-gray-900 bg-gray-100">
        <div className="relative z-20 flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow sm:m-5 sm:rounded-md">
          
          {/* Lado Esquerdo - Formulário */}
          <div className="relative z-20 p-0 mt-0 lg:w-1/2 xl:w-5/12">
            <div className="relative z-20 flex w-full">
              <Link to="/cadastro-desenvolvedor" className="flex-1 py-4 font-bold text-center bg-gray-300 hover:bg-gray-400 text-[#978F9F]">
                Sou desenvolvedor
              </Link>
              <Link to="/cadastro-microempreendedor" className="flex-1 py-4 text-center font-bold text-white bg-[#7D5C9C] hover:bg-indigo-[700]">
                Sou microempreendedor
              </Link>
            </div>

            <div className="max-w-xs mx-auto mt-20">
              <form onSubmit={handleSubmit}>

                {/* Nome e Sobrenome */}
                <div className="flex space-x-2">
                  <input
                    className="w-1/2 px-4 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="Nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    className="w-1/2 px-4 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="Sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                {/* CPF e GitHub */}
                <div className="flex mt-5 space-x-2">
                  <input
                    className="w-full px-4 py-3 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                  />
                
                </div>

                {/* Email */}
                <input
                  className="w-full px-4 py-3 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Senha */}
                <input
                  className="w-full px-4 py-3 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Botão de Cadastro */}
                <button
                  type="submit"
                  className="flex items-center justify-center w-full py-4 mt-12 font-semibold text-gray-100 bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                  <span className="ml-3">Cadastra-se</span>
                </button>
              </form>

              {/* Link para login */}
              <p className="mt-5 text-sm text-center">
                Já tem uma conta?{' '}
                <Link to="/login-microempreendedor" className="text-indigo-600 hover:underline">
                  Acesse aqui
                </Link>
              </p>
            </div>
          </div>

          {/* Lado Direito - Imagem */}
          <div className="flex-1 flex justify-center items-center  bg-gradient-to-b from-[#7C5C9D] to-[#3B1C58] lg:flex">
          <h1 className="absolute top-[10%] -translate-y-1/2 right-15 text-white w-[360px] text-4xl text-left ml-10 font-bold">
            Seja bem-vindo!
          </h1>
          <div className="absolute top-[22%] -translate-y-1/2 text-white w-[500px] text-lg  ml-10 font-semibold text-left">
          Para se cadastrar como microempreendedor na plataforma é necessário preencher todo o formulário com dados cadastrais.
          </div>
            <img className="mt-10 w-90 h-80" src={imagem} alt="Imagem genérica" />
          </div>
        </div>
      </div>
      <Footer />
    </>
   
  );
}

export default CadastroMicroempreendedor;
