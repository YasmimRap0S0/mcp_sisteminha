import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExibirCategoriasDosSistemas from "../exibir-categorias/ExibirCategoriasDosSistemas";
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import NavHome from '../../components/NavHome/NavUsuario';
import BannerMicroempreendedor from '../../components/banner/BannerMicroempreendedor';
import Load from '../../components/Load/Load';

function HomeMicroempreendedor() {
    const navigate = useNavigate();
    const [tokenState, setTokenState] = React.useState(null);

    React.useEffect(()=>{    
      const token = localStorage.getItem("token");

      if(token){
        const user = JSON.parse(localStorage.getItem("user"));
        if(user.perfil === 'desenvolvedor')
          navigate("/home-desenvolvedor");
        setTokenState(token);
      } else {
        navigate("/")
      }
    }, [])
    

    return (
        <>
          {!tokenState ? (
            <Load />
          ) : (
            <>
                <BuscarDesenvolvedoresProvider>
                  <NavHome />
                </BuscarDesenvolvedoresProvider>
                <BannerMicroempreendedor />
                <ExibirCategoriasDosSistemas/>
            </>
          )}
        </>
      );
    }

export default HomeMicroempreendedor;