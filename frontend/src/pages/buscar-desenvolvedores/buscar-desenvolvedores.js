import Filtros from '../../components/buscar_desenvolvedores/Filtros';
import ListarDesenvolvedores from '../../components/buscar_desenvolvedores/ListarDesenvolvedores';
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import NavHome from '../../components/NavHome/NavUsuario';
import { useNavigate } from 'react-router-dom';
import Load from '../../components/Load/Load';
import React from 'react';

function BuscarDesenvolvedor() {
  const navigate = useNavigate();
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const token_storage = localStorage.getItem("token");
    console.log(token_storage);
    
    if(token_storage)
      setToken(token_storage);
    else
      navigate("/login-microempreendedor");
  }, [])

  return (
    <>
      {!token ? (
        <Load />
      ) : (
        <BuscarDesenvolvedoresProvider>
          <NavHome />
          <section
            className='lg:grid grid-cols-[1fr_3fr] px-16 max-xl:px-8 py-5 max-sm:px-2 max-md:px-4'
          >
            <div>
              <div className='mb-2 text-center font-sans font-medium text-[#4294A2] text-[28px]'>Olá, Mariana!</div>
              <Filtros />
            </div>
            <ListarDesenvolvedores />
          </section>
        </BuscarDesenvolvedoresProvider>
      )}
    </>
  )
}

export default BuscarDesenvolvedor;