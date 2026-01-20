import React from "react"; 
import axios from "axios";
import { useLocation } from "react-router-dom";

export const BuscarDesenvolvedoresContexto = React.createContext();

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";


export const BuscarDesenvolvedoresProvider = ({ children }) => {
    const { state } = useLocation();
    let search = state?.search;
    const [listaDesenvolvedores, setListaDesenvolvedores] = React.useState([]);
    const [carregandoContexto, setCarregandoContexto] = React.useState(false);
    const [filtrarSetor, setFiltrarSetor] = React.useState([]);
    const [filtrarAvaliacao, setFiltrarAvaliacao] = React.useState([]);
    const [filtrarPalavraChave, setFiltrarPalavraChave] = React.useState("");

    async function fetchData(query) {
        try {
            setCarregandoContexto(true);
            const dadosDesenvolvedores = (await axios.get(`${API_BASE_URL}/desenvolvedores/?ordering=user__first_name&pesquisa=${query}`)).data;
            dadosDesenvolvedores.sort((a, b) => b.avaliacao_media - a.avaliacao_media);
            setCarregandoContexto(false);
            return dadosDesenvolvedores;
        } catch (err) {
            console.log("Ocorreu um erro ao buscar desenvolvedores: ", err);
            setCarregandoContexto(false);
            return [];
        }
    }

    React.useEffect(() => {
    const getDesenvolvedores = async () => {
        const query = search || "";
        setFiltrarPalavraChave(query);
        const dados = await fetchData(query);
        setListaDesenvolvedores(dados || []);
    };

    getDesenvolvedores();
    }, [search]); 


    async function conferirFiltros() {        
        let filtrados = await fetchData(filtrarPalavraChave);
        if (!filtrados || !filtrados.length) return setListaDesenvolvedores([]);

        if (filtrarAvaliacao.length > 0) {            
            filtrados = filtrados.filter((dev) =>
                (filtrarAvaliacao.includes("3 estrelas") && dev.avaliacao_media === 3) ||
                (filtrarAvaliacao.includes("4 estrelas") && dev.avaliacao_media === 4) ||
                (filtrarAvaliacao.includes("5 estrelas") && dev.avaliacao_media === 5)
            );
        }

        if (filtrarSetor.length > 0) {
            filtrados = filtrados.filter((dev) => dev.setores.some(setor => filtrarSetor.includes(setor)));
        }

        setListaDesenvolvedores(filtrados);
    }

    async function limparFiltros(){
        setFiltrarAvaliacao([]);
        setFiltrarSetor([]);
    }

    return (
        <BuscarDesenvolvedoresContexto.Provider value={{ limparFiltros, listaDesenvolvedores, setListaDesenvolvedores, setFiltrarAvaliacao, filtrarAvaliacao, setFiltrarSetor, filtrarSetor, setFiltrarPalavraChave, filtrarPalavraChave, conferirFiltros, carregandoContexto }}>
            {children}
        </BuscarDesenvolvedoresContexto.Provider>
    );
};