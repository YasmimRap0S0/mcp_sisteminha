import React, { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginDesenvolvedorContexto = createContext();

export const LoginDesenvolvedorProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const urlBase = "http://localhost:8000/sisteminha_api";

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
        }
      };
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(userData))
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