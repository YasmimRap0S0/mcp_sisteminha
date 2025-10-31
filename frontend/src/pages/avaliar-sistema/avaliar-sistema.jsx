import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import NavUsuario from "../../components/NavHome/NavBasicUser";
import axios from "axios";
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import NavHome from "../../components/NavHome/NavUsuario";

const AvaliarSistema = () => {
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [hover, setHover] = useState(0);
  const [sistema, setSistema] = useState(null);
  const [erro, setErro] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const navigate = useNavigate();
  const { sistemaId } = useParams();
  const [usuarioId, setUsuarioId] = useState(null);
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    
    if(token){     
      const user = JSON.parse(localStorage.getItem("user"));
      if(user)
        setUsuarioId(user.data.id);
      else
        navigate("/login-microempreendedor");
    } else {
        navigate("/login-microempreendedor");
    }
  }, [])

  useEffect(() => {
    async function fetchSistema() {
      if (!sistemaId) return;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/sisteminha_api/sistemas/${sistemaId}`
        );
        setSistema(response.data);
      } catch (err) {
        console.error("Erro ao buscar sistema:", err);
        setErro("Erro ao carregar informações do sistema.");
        setMostrarPopup(true);
      }
    }
    fetchSistema();
  }, [sistemaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sistemaId || !usuarioId) {
      setErro("Sistema ID ou Usuário ID está faltando!");
      setMostrarPopup(true);
      return;
    }

    const data = {
      estrela: avaliacao,
      comentario,
      usuario: usuarioId,
      sistema: sistemaId,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/sisteminha_api/avaliacao_Sistemas/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        console.error("Erro detalhado:", errData);
        throw new Error(`Falha na requisição: ${response.status}`);
      }

      console.log("Avaliação salva com sucesso!");
      setAvaliacao(0);
      setComentario("");
      navigate(`/ObrigadoAvaliacao`);
    } catch (error) {
      console.error("Erro:", error);
      setErro(`Ocorreu um erro ao salvar a avaliação: ${error.message}`);
      setMostrarPopup(true);
    }
  };

  return (
    <>
      <BuscarDesenvolvedoresProvider>
        <NavHome />
      </BuscarDesenvolvedoresProvider>
      <div className="flex flex-col justify-start min-h-screen pt-10 bg-purple-200">
        <div className="relative w-full mx-auto max-w-7xl">
          <div className="w-full px-12 bg-white shadow-lg py-9 sm:rounded-lg">
            <h1 className="mb-6 text-3xl font-bold text-center text-purple-900">
              Avaliação do Sistema
            </h1>

            {mostrarPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-6 text-center bg-white rounded-lg shadow-lg w-96">
                  <p className="font-bold text-red-700">{erro}</p>
                  <button
                    className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg"
                    onClick={() => setMostrarPopup(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

            {sistema && (
              <div className="flex items-center p-5 mb-6 space-x-4 bg-purple-100 rounded-xl">
                <img
                  src={sistema.imagem}
                  alt={sistema.nome}
                  className="object-cover h-24 border-2 border-purple-400 rounded-lg shadow-lg w-30"
                />
                <div>
                  <h2 className="text-xl font-semibold text-purple-900">
                    {sistema.nome}
                  </h2>
                  <p className="text-gray-600">{sistema.descricao}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-center">
                <label className="block mb-2 font-bold text-gray-700">
                  Avaliação:
                </label>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={60}
                      className={`cursor-pointer transition duration-200 mx-1 ${
                        (hover || avaliacao) >= star
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setAvaliacao(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-bold text-gray-700">
                  Comentário:
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Deixe um comentário..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows="4"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white transition bg-purple-700 rounded-lg shadow-md hover:bg-purple-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvaliarSistema;