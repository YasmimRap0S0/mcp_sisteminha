import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginDesenvolvedorContexto = createContext();

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

export const LoginDesenvolvedorProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const urlBase = API_BASE_URL; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlBase}/auth/login/desenvolvedor/`, {
        email,
        password,
      });
      const userData = {
        username: response.data.username,
        perfil: response.data.perfil,
        data: {
          id: response.data.data.id,
          user: response.data.data.user,
          foto: response.data.data.foto,
        },
      };
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home-desenvolvedor");
    } catch (error) {
      setMessages([{ type: "error", text: "Erro ao fazer login. Verifique suas credenciais." }]);
    }
  };

  return (
    <LoginDesenvolvedorContexto.Provider
      value={{ email, setEmail, password, setPassword, messages, setMessages, handleSubmit }}
    >
      {children}
    </LoginDesenvolvedorContexto.Provider>
  );
};