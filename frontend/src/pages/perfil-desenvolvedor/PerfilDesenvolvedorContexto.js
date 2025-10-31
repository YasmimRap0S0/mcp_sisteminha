import React, { createContext, useState} from "react";
import axios from "axios";

export const PerfilDesenvolvedorContexto = createContext();

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://3.212.24.16:8000/sisteminha_api";

export const PerfilDesenvolvedorProvider = ({ children }) => {
    const [perfil, setPerfil] = useState(null);
    const [carregandoPerfil, setCarregandoPerfil] = useState(false);
    const urlBase = API_BASE_URL; 

    const fetchPerfil = async (id) => {
        try {
            setCarregandoPerfil(true);
            const response = await axios.get(`${urlBase}/desenvolvedores/${id}/`);
            let dev = response.data;
            const responseUser = await axios.get(`${urlBase}/users/${dev.user}/`);

            dev = Object.assign(dev, responseUser.data);
            const conjuntoSetores = new Set(dev.setores);
            dev.setores = Array.from(conjuntoSetores);

            setPerfil(dev);
        } catch (error) {
            console.error("Erro ao buscar perfil do desenvolvedor:", error);
        } finally {
            setCarregandoPerfil(false);
        }
    };

    return (
        <PerfilDesenvolvedorContexto.Provider value={{ perfil, fetchPerfil, carregandoPerfil }}>
            {children}
        </PerfilDesenvolvedorContexto.Provider>
    );
};