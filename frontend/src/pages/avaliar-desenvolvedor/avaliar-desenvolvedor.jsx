import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import NavHome from "../../components/NavHome/NavUsuario";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

const AvaliarDesenvolvedor = () => {
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [hover, setHover] = useState(0);
  const [desenvolvedor, setDesenvolvedor] = useState(null);
  const [erro, setErro] = useState(""); // Estado para armazenar o erro
  const navigate = useNavigate();

  const { desenvolvedorId } = useParams();
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) setUsuarioId(user.data.id);
      else navigate("/login-microempreendedor");
    } else {
      navigate("/login-microempreendedor");
    }
  }, []);

  useEffect(() => {
    async function fetchDesenvolvedor() {
      if (!desenvolvedorId) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/desenvolvedores/${desenvolvedorId}`);
        setDesenvolvedor(response.data);
      } catch (err) {
        console.error("Erro ao buscar desenvolvedor:", err);
      }
    }

    fetchDesenvolvedor();
  }, [desenvolvedorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desenvolvedorId || !usuarioId) {
      setErro("Desenvolvedor ID ou Usuário ID está faltando!");
      return;
    }

      if (avaliacao === 0) {
      setErro("Por favor, selecione uma quantidade de estrelas para avaliar.");
      return;
    }

    const data = {
      estrela: avaliacao,
      comentario,
      usuario: usuarioId,
      desenvolvedor: desenvolvedorId,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/avaliacao_Desenvolvedores/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

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
              Avaliação do Desenvolvedor
            </h1>

            {desenvolvedor && (
              <div className="flex items-center p-5 mb-6 space-x-4 bg-purple-100 rounded-xl">
                <img
                  src={desenvolvedor.foto}
                  alt={desenvolvedor.nome}
                  className="object-cover w-24 h-24 border-2 border-purple-400 rounded-full shadow-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-purple-900">
                    {desenvolvedor.user_first_name} {desenvolvedor.user_last_name}
                  </h2>
                  <p className="text-gray-600">{desenvolvedor.descricao}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-center">
                <label className="block mb-2 font-bold text-gray-700">Avaliação:</label>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={60}
                      className={`cursor-pointer transition duration-200 mx-1 ${
                        (hover || avaliacao) >= star ? "text-yellow-400" : "text-gray-400"
                      }`}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setAvaliacao(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-bold text-gray-700">Comentário:</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {erro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-red-600">Erro!</h2>
            <p className="mb-4 text-gray-700">{erro}</p>
            <button
              onClick={() => setErro("")}
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AvaliarDesenvolvedor;