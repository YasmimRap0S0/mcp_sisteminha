import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './pages/home/home';
import HomeMicroempreendedor from './pages/home/home-microempreendedor';
import HomeDesenvolvedor from './pages/home/home-desenvolvedor';
import ObrigadoAvaliacao from "./pages/ObrigadoAvaliacao/ObrigadoAvaliacao";

import CadastroDesenvolvedor from './pages/register-desenvolvedor/cadastro-desenvolvedor';
import CadastroMicroempreendedor from "./pages/register-microempreendedor/cadastro-microempreendedor";
import { PerfilDesenvolvedorProvider } from "./pages/perfil-desenvolvedor/PerfilDesenvolvedorContexto";

import BuscarDesenvolvedor from './pages/buscar-desenvolvedores/buscar-desenvolvedores';
import PerfilDesenvolvedor from './pages/perfil-desenvolvedor/PerfilDesenvolvedor';
import AvaliarSistema from './pages/avaliar-sistema/avaliar-sistema';
import AdicionarSistema from "./pages/adicionar-sistema/adicionar-sistema";
import BuscarSistemas from "./pages/buscar-sistemas/buscar-sistemas";
import AvaliarDesenvolvedor from './pages/avaliar-desenvolvedor/avaliar-desenvolvedor';

import { LoginDesenvolvedor } from "./pages/login/LoginDesenvolvedor";
import { LoginMicroempreendedor } from "./pages/login/LoginMicroempreendedor";
import { LoginMicroempreendedorProvider } from "./pages/login/LoginMicroempreendedorContexto";
import { LoginDesenvolvedorProvider } from "./pages/login/LoginDesenvolvedorContexto";
import ExibirSistemasPorCategoria from "./pages/exibir-sistemas-por-categoria/ExibirSistemasPorCategoria";

const router = createBrowserRouter( [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro-desenvolvedor",
    element: <CadastroDesenvolvedor />,
  },
  {
    path: "/home-desenvolvedor",
    element: <HomeDesenvolvedor />,
  },
  {
    path: '/home-microempreendedor',
    element: <HomeMicroempreendedor />
  },
  { path: "/ObrigadoAvaliacao", element: <ObrigadoAvaliacao /> },
  {
    path: '/sistemas/:id',
    element: <ExibirSistemasPorCategoria />
  },
  {
    path: '/avaliar-desenvolvedor/:desenvolvedorId',
    element: <AvaliarDesenvolvedor/>
  },
  {
    path: "/cadastro-microempreendedor",
    element: <CadastroMicroempreendedor />,
  },
  {
    path: '/login-desenvolvedor',
    element: (
      <LoginDesenvolvedorProvider>
        <LoginDesenvolvedor />
      </LoginDesenvolvedorProvider>
    ),
  },
  {
    path: '/login-microempreendedor',
    element: (
      <LoginMicroempreendedorProvider>
        <LoginMicroempreendedor />
      </LoginMicroempreendedorProvider>
    ),
  },
  {
    path: "/buscar-desenvolvedor/",
    element: <BuscarDesenvolvedor />,
  },
  {
    path: "/perfil-desenvolvedor/:desenvolvedorId",
    element: (
      <PerfilDesenvolvedorProvider >
        <PerfilDesenvolvedor />
      </PerfilDesenvolvedorProvider>
    ),
  },
  {
    path: '/adicionar-sistema/:desenvolvedorId',
    element: <AdicionarSistema />
  },

  //reponsável: larissa samara
  {
    path: '/buscar-sistemas',
    element: <BuscarSistemas />
  },
  {
    path: "avaliar-sistema/:sistemaId",
    element: <AvaliarSistema />
  },
  {
    path: "adicionar-sistema/",
    element: <AdicionarSistema />,
  },
  {
    path: "/*",
    element: (
      <h1 className="text-center text-purple-900 text-[22px] font-black mt-5">Página não encontrada. <a className="hover:underline" href="/"> Página inicial.</a></h1>
    ),
  },
] );

function App () {
  return (
    <RouterProvider router={router} />
  );
}

export default App;