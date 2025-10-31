// LoginMicroempreendedorContexto.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const LoginMicroempreendedorContexto = createContext();

export const LoginMicroempreendedorProvider = ({ children }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const urlBase = "http://localhost:8000/sisteminha_api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlBase}/auth/login/microempreendedor/`, {
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
      navigate('/home-microempreendedor')
    } catch (error) {
      setMessages([{ type: "error", text: "Erro ao fazer login. Verifique suas credenciais." }]);
    }
  };

  return (
    <LoginMicroempreendedorContexto.Provider
      value={{ email, setEmail, password, setPassword, messages, handleSubmit }}
    >
      {children}
    </LoginMicroempreendedorContexto.Provider>
  );
};



