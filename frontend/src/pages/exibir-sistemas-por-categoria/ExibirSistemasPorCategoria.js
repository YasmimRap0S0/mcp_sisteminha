import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

function ExibirSistemasPorCategoria(){
    const { state } = useLocation();
    const nome = state?.nome;
    const { id } = useParams();
    const [sistemas, setSistemas] = React.useState([]);

    React.useEffect(() => {
        async function fetchSistemas(){
            try {
                const response = await axios.get(`${API_BASE_URL}/sistemas/${id}/sistemas_por_categoria/`);
                setSistemas(response.data);

            } catch(err){
                console.log("Ocorreu um erro ao buscar sistemas por categorias: ", err);
                
            }
        }
        fetchSistemas();
    }, [])

    React.useEffect(() => {
        console.log(sistemas);
    }, [sistemas])

    return (
        <>
        {sistemas && (
            <section className="p-10 max-md:p-5">
                <p className="rounded-3xl w-3/4 max-lg:w-full mx-auto text-[30px] font-bold mb-5 text-[#7c5c9d] bg-[#f4e9ff] p-2 text-center">Categoria <span className="font-black">{nome}</span> - Sistemas</p>
                {sistemas.map((sistema) => (
                    <div
                        className="bg-[#f4e9ff] p-5 flex items-center rounded-3xl w-3/4 max-lg:w-full mx-auto mb-5 max-md:block"
                    >
                        <img
                                src={`http://localhost:8000${sistema.imagem}`} alt={`sistema-${sistema.id}`}                            className="w-64 max-md:w-full"
                        />
                        <div
                            className="w-2/3 p-2 max-md:w-full"
                        >
                            <h2
                                className="font-sans text-[30px] text-regular border-b-[3px] border-[#7c5c9d] text-center inline-block"
                            >{sistema.nome}</h2>
                            <p
                                className="font-sans font-regular text-[20px] my-3"
                            >{sistema.descricao}</p>
                        </div>
                        <div
                            className="max-md:flex max-md:items-center max-md:justify-around"
                        >
                            <a
                                href={`#`}
                                className="font-sans font-bold text-[20px] w-32 max-md:w-40 rounded-xl bg-[#7c5c9d] text-white p-2 text-center md:block md:mb-5 hover:opacity-95"
                            >Ver Sistema</a>
                            <a
                                href={`#`}
                                className="font-sans font-bold text-[20px] w-32 max-md:w-40 rounded-xl bg-[#7c5c9d] text-white p-2 text-center md:block hover:opacity-95"
                            >Avaliar</a>
                        </div>
                    </div>
                ))}
            </section>
        )}
        </>
    )
}

export default ExibirSistemasPorCategoria;