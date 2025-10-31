import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExibirCategoriasDosSistemas from "../exibir-categorias/ExibirCategoriasDosSistemas";
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import BannerDesenvolvedor from '../../components/banner/BannerDesenvolvedor';
import NavHome from '../../components/NavHome/NavUsuario';

function HomeDesenvolvedor() {
     const navigate = useNavigate();
        const logout = () => {
            localStorage.removeItem('token');
            navigate('/login-desenvolvedor');
        }
    
        const handleLogout = async () => {
            try {
                const token = localStorage.getItem('token');
    
                const response = await fetch('/sisteminha_api/auth/logout/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
    
                if (response.ok) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.error('Erro ao fazer logout:', response.status);
                }
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
        };

    React.useEffect(()=>{    
        const token = localStorage.getItem("token");

        if(token){
            const user = JSON.parse(localStorage.getItem("user"));
            if(user.perfil === 'desenvolvedor')
                navigate("/home-desenvolvedor");
            else if(user.perfil === 'microempreendedor')
                navigate("/home-microempreendedor");
        } else {
            navigate("/")
        }
    }, [])


    return (
        <>
            <BuscarDesenvolvedoresProvider>
                <NavHome />
            </BuscarDesenvolvedoresProvider>
            <BannerDesenvolvedor />            
            <ExibirCategoriasDosSistemas/>
        </>
      );
    }

export default HomeDesenvolvedor;
