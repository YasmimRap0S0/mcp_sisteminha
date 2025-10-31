import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ObrigadoAvaliacao = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
        <FaCheckCircle className="mx-auto mb-4 text-6xl text-green-500" />
        <h1 className="mb-2 text-3xl font-bold text-purple-900">
          Obrigado pela sua avaliação!
        </h1>
        <p className="mb-6 text-gray-700">
          Sua opinião é muito importante para nós. Agradecemos sua contribuição!
        </p>
        <button
          onClick={() => navigate("/buscar-desenvolvedor")}
          className="px-6 py-2 text-white transition bg-purple-700 rounded-lg shadow-md hover:bg-purple-800"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
};

export default ObrigadoAvaliacao;