// Responsável: Larissa Samara
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import Nav from "../../components/NavHome/NavUsuario";
import starGray from "../../assests/star-gray.png";
import starYellow from "../../assests/star-yellow.png";
import Load from "../../components/Load/Load";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

function BuscarSistemas() {
  const location = useLocation();
  const palavraChave = location.state?.search || "";

  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSistemas = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/sistemas/?search=${encodeURIComponent(palavraChave)}`
        );
        setSystems(response.data);
      } catch (error) {
        console.error("Erro ao buscar sistemas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSistemas();
  }, [palavraChave]);

const renderStars = (media, totalAvaliacoes) => {
  const nota = Number.isFinite(media) ? media : 0;
  const fullStars = Math.max(0, Math.min(5, Math.floor(nota)));
  const emptyStars = 5 - fullStars;

  const total = Number.isFinite(totalAvaliacoes) ? totalAvaliacoes : 0;

  return (
    <div className="flex items-center mt-2">
      {[...Array(fullStars)].map((_, index) => (
        <img key={`full-${index}`} src={starYellow} alt="estrela amarela" className="w-5 h-5" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <img key={`empty-${index}`} src={starGray} alt="estrela cinza" className="w-5 h-5" />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        ({nota} - {total} {total === 1 ? "avaliação" : "avaliações"})
      </span>
    </div>
  );
};


  if (loading) return <Load />;

  return (
    <>
      <Nav />
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 p-6 bg-white">
          <p className="ola-mariana">Olá, Mariana!</p>
        </div>

        <div className="col-span-7 p-6 ml-8 font-sans text-3xl font-medium">
          {palavraChave ? (
            <>
              Mostrando resultados para: <strong className="text-purple-700">{palavraChave}</strong>
            </>
          ) : (
            <>Veja alguns sistemas...</>
          )}
        </div>

        <div className="col-span-3 p-6 shadow-lg filtro-busca rounded-2xl">
          <h2 className="text-xl font-semibold">Filtros de Busca</h2>
          <br />
          <div className="p-4 mt-4 shadow-md card-buscar-setor rounded-xl">
            <h3 className="text-lg font-semibold">Buscar sistemas por setores</h3>
            <br />
            {["Todas as áreas", "Setor alimentício", "Setor de beleza", "Setor têxtil"].map((setor) => (
              <label key={setor} className="flex items-center mt-2 space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-gray-700">{setor}</span>
              </label>
            ))}
          </div>

          <br />

          <div className="p-4 mt-4 bg-gray-100 shadow-md rounded-xl">
            <h3 className="text-lg font-semibold">Buscar sistemas por avaliação</h3>
            <br />
            <label className="flex items-center mt-2 space-x-2">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Qualquer avaliação</span>
            </label>
            {[5, 4, 3].map((star) => (
              <label key={star} className="flex items-center mt-2 space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-gray-700">{star} estrelas</span>
                <img src={starYellow} alt="⭐" className="w-5 h-5" />
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-9 bg-white shadow-none">
          {systems.length > 0 ? (
            systems.map((system) => (
              <div
                key={system.id}
                className="md:grid grid-cols-12 items-center bg-[#F4E9FF] rounded-xl p-5 mt-5 shadow-md card-sistema-content"
              >
                <div className="flex flex-col items-center col-span-2 p-4">
                  <img
                    src={system.imagem}
                    alt={system.nome}
                    className="mx-auto border-[2px] border-purple-900 rounded-lg transition-all duration-300 hover:scale-105 object-cover w-full"
                  />
                  <a
                    href={`/setor/${system.id}`}
                    className="max-sm:w-28 max-sm:p-1 max-sm:mx-1 max-sm:text-[15px] md:block my-2 w-32 mx-auto text-white font-sans font-black p-3 rounded-lg bg-purple-700 hover:opacity-90 text-center"
                  >
                    Ver setor
                  </a>
                </div>

                <div className="col-span-8">
                  <p className="text-[30px] border-b-[3px] border-[#7D5C9C]">
                    {system.nome}
                  </p>
                  {renderStars(system?.avaliacao_media, system?.num_avaliacoes)}
                  <p className="mt-2 text-base text-gray-500">
                    {system.descricao}<br />
                    Desenvolvido por: {system.desenvolvedor?.user_first_name} {system.desenvolvedor?.user_last_name}
                  </p>
                </div>

                <div className="col-span-2 p-2 text-center max-md:flex max-md:items-center max-md:justify-around">
                  <a
                    href={`/ver-sistema/${system.id}`}
                    className="max-sm:w-24 max-sm:p-2 max-sm:mx-1 max-sm:text-[15px] md:block my-2 w-32 mx-auto text-white font-sans font-black p-3 rounded-lg bg-purple-700 hover:opacity-90 text-center"
                  >
                    Ver Sistema
                  </a>
                  <a
                    href={`/avaliar-sistema/${system.id}`}
                    className="max-sm:w-24 max-sm:p-2 max-sm:mx-1 max-sm:text-[15px] md:block my-2 w-32 mx-auto text-white font-sans font-black p-3 rounded-lg bg-purple-700 hover:opacity-90 text-center"
                  >
                    Avaliar
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-12 text-center text-gray-600">
              Nenhum sistema encontrado para "<strong>{palavraChave}</strong>".
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default BuscarSistemas;
