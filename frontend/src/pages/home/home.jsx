import React, { useEffect, useState } from 'react';
import ExibirCategoriasDosSistemas from "../exibir-categorias/ExibirCategoriasDosSistemas";
import NavHome from '../../components/NavHome/NavHome';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import Load from '../../components/Load/Load';


function Home() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(token){
      const user = JSON.parse(localStorage.getItem("user"));
      if(user.perfil === 'desenvolvedor'){
        navigate("/home-desenvolvedor");
      } else if(user.perfil === 'microempreendedor')
        navigate("/home-microempreendedor");
      }
  }, [])


  return (
    <>
      <NavHome/>
      <Banner />
      <ExibirCategoriasDosSistemas/>
    </>
  );
}

export default Home;
