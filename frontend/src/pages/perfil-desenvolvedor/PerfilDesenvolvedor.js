import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PerfilDesenvolvedorContexto } from "./PerfilDesenvolvedorContexto";
import { BuscarDesenvolvedoresProvider } from "../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto";
import Footer from "../../components/Footer/Footer";
import imagem from "../../assets/img/fotologin.png";
import NavHome from "../../components/NavHome/NavUsuario";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Load from "../../components/Load/Load";
import GitFacade from './GitFacade'; 
import axios from "axios";
import starGray from "../../assests/star-gray.png";
import starYellow from "../../assests/star-yellow.png";
// import starYellow from "../../assests/"

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://44.210.221.162:8000/sisteminha_api";

const API_BASE_URL_IMAGEM =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "http://44.210.221.162:8000";

function PerfilDesenvolvedor() {
    const { desenvolvedorId } = useParams();
    
    const { perfil, fetchPerfil, carregandoPerfil } = useContext(PerfilDesenvolvedorContexto);
    const [repos, setRepos] = useState([]);
    const githubFacade = new GitFacade(); 

    const [sistemas, setSistemas] = useState([]);
    const [avaliacoes, setAvaliacoess] = useState([]);
    const [numRepos, setNumRepos] = useState(5);
    const [avaliacoesMostradas, setAvaliacoesMostradas] = useState(3);

    useEffect(() => {
        async function fetchSistemas(){
            try {
                const response = await axios.get(`${API_BASE_URL}/desenvolvedores/${desenvolvedorId}/sistemas_desenvolvedor/`);
                setSistemas(response.data);

            } catch(err){
                console.log("Ocorreu um erro ao buscar sistemas por categorias: ", err);
            }
        }
        fetchSistemas();
    }, [])

    useEffect(() => {
        async function fetchAvaliacoes(){
            try {
                const response = await axios.get(`${API_BASE_URL}/desenvolvedores/${desenvolvedorId}/avaliacoes_desenvolvedor/`);
                setAvaliacoess(response.data);

            } catch(err){
                console.log("Ocorreu um erro ao buscar avaliações do desenvolvedor: ", err);
            }
        }
        fetchAvaliacoes();
    }, [])
    
    useEffect(() => {
        async function fetchRepos() {
            if (perfil?.github) { 
                const fetchedRepos = await githubFacade.fetchRepos(perfil);
                console.log("Repositórios recebidos no componente:", fetchedRepos);
                setRepos(fetchedRepos);
            }
        }
        if (perfil) { 
            fetchRepos();
        }
    }, [perfil]); 

    useEffect(() => {
        if (desenvolvedorId) {
            fetchPerfil(desenvolvedorId);
        }
    }, [desenvolvedorId]);

    function handleClickNumRepos(){
        const num = numRepos;
        setNumRepos(num+5);
    }

    function handleClickAvaliacoesMostradas(){
        const num = avaliacoesMostradas;
        setAvaliacoesMostradas(num+3);
    }

    function handleClickDiminuiNumRepos(){
        setNumRepos(5);
    }

    if (carregandoPerfil) {
        return <Load />;
    }

    if (!perfil && !carregandoPerfil) {
        return <p>Perfil não encontrado.</p>;
    }



    return (
        <>
            <BuscarDesenvolvedoresProvider>
                <NavHome />
            </BuscarDesenvolvedoresProvider>
            <section className="flex flex-col items-center p-6 bg-white">
                {/* Banner do perfil */}
              
                <div className="relative w-full h-56 bg-cover" style={{ backgroundImage: `url(${perfil.banner || imagem})` }}></div>
                {/* Card com informações do perfil */}
                <div className="relative w-full max-w-2xl p-6 -mt-20 text-black bg-gray-200 rounded-lg shadow-lg">
                    {/* <button className="absolute px-4 py-2 text-white bg-purple-500 rounded-lg top-4 right-4 hover:bg-blue-600">
                        Mensagem
                    </button> */}
    
                    <div className="flex items-center mb-4">

                        <img className="object-cover mr-6 border-2 border-white rounded-full size-36" src={perfil.foto} alt={perfil.username} />
                        {/* <h1>{perfil.username}</h1> */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-semibold">{perfil.user_first_name} {perfil.user_last_name}</h2>

                            <div className="flex items-center">
                                {/* <p className="mr-2 text-lg">
                                    <img src="/images/icons/ThumbsUpDown.svg" alt="ThumbsUpDown" className=""/>
                                </p> */}
                                <div className="flex items-center">
                                    {[...Array(Math.round(perfil.avaliacao_media))].map((_, index) => (
                                        <img key={index} src={starYellow} alt="Estrela" className="w-[20px]" />
                                    ))}
                                    {[...Array(5 - Math.round(perfil.avaliacao_media))].map((_, index) => (
                                        <img key={index} src={starGray} alt="Estrela" className="w-[20px]" />
                                    ))}
                                </div>
                                <p className="ml-3 font-sans text-[20px] font-medium">({perfil.avaliacao_media+".0"} - {perfil.num_avaliacoes} {perfil.num_avaliacoes == 1 ? 'avaliação' : 'avaliações'})</p>
                            </div>
                        </div>
                    </div>
    
                    <div className="mt-4">
                        <p className="flex items-center text-lg">
                            <span className="mr-2">
                                <img src="/images/icons/icon-git.svg" alt="git" />
                            </span>
                            <a href={"https://github.com/"+perfil.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline">
                                {perfil.github}
                            </a>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="mr-2">
                                <img src="/images/icons/icon-email.svg" alt="email" />
                            </span>
                            <a href={"mailto:"+perfil.email} className="font-semibold text-gray-700 hover:underline">
                                {perfil.email}
                            </a>
                        </p>

                        <p className="flex items-center text-lg font-semibold text-gray-700"><img src="/images/icons/Tags.svg" alt="tags" className="mr-2"/> {perfil.setores?.join(", ") || "Nenhum setor"}</p>

                        <p className="flex items-end mt-5 text-xl font-semibold text-gray-700"><img src="/images/icons/HandWithPen.svg" alt="tags" className="w-8 mr-2"/> Sobre mim</p>
                        <p className="mt-2 text-lg font-medium text-gray-500">{perfil.descricao}</p>
                    </div>
                </div>
    
            {/* Carrossel de Projetos */}
            <section className="w-full max-w-2xl mt-8">
                <h2 className="mb-6 text-3xl font-semibold text-center">Projetos</h2>

                <Swiper 
                    navigation
                    modules={[Navigation, Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: true }}
                    pagination={{ clickable: true }}
                    speed={1000}
                    slidesPerView={1}
                    loop
                >
                    {sistemas.map((sistema, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg'>
                                <img src={`${API_BASE_URL_IMAGEM+sistema.imagem}`} alt={sistema.nome} className="object-cover h-[260px] rounded-lg"/>
                                <p className="mt-2 text-gray-700"><strong>Setor:</strong> {sistema.nome}</p>
                                <p className="mt-2 text-gray-700"><strong>Setor:</strong> {sistema.setor}</p>
                                <p className="mt-2 text-gray-700"><strong>Descrição:</strong> {sistema.descricao}</p>
                                <p className="mt-2 text-gray-700"><strong>Status:</strong> {sistema.status == 'concluido' ? 'Concluído' : 'Em Andamento'}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="my-5 mb-4 text-2xl font-bold text-gray-800">
                    Veja alguns Repositórios Públicos e Avaliações
                </h2>
                {/* Exibição dos Repositórios Públicos */}
                <div className="max-w-3xl p-6 mx-auto my-2 bg-gray-100 rounded-lg">
                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                        Repositórios Públicos no GitHub
                    </h2>
                    <ul className="space-y-3">
                        {repos.length > 0 ? (
                            repos.slice(0, numRepos).map((repo) => (
                                <li key={repo.id} className="p-4 text-center transition bg-white rounded-lg shadow-md hover:shadow-lg">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-lg font-semibold text-blue-600"
                                        // hover:underline"
                                    >
                                        {repo.name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Não há repositórios públicos disponíveis.</p>
                        )}
                    </ul>
                    {repos.length > numRepos && (
                        <button
                            onClick={handleClickNumRepos}
                            // className="p-2 text-white bg-blue b-2"
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg mt-7 hover:bg-blue-600"
                        >Mostrar mais...</button>
                    )}
                    {repos.length <= numRepos && (
                        <button
                            onClick={handleClickDiminuiNumRepos}
                            // className="p-2 text-white bg-blue b-2"
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg mt-7 hover:bg-blue-600"
                        >Mostrar menos...</button>
                    )}
                </div>

                {/* Exibição das Avaliações */}
                <div className="max-w-3xl p-6 mx-auto my-2 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                        Avaliações
                    </h2>
                    <div>
                        {avaliacoes.length > 0 ? (
                            avaliacoes.slice(0, avaliacoesMostradas).map((avaliacao) => (
                                <div
                                    key={avaliacao.id}
                                    className="p-5 bg-purple-100 border-2 border-purple-200 rounded-md my-7"
                                >
                                    <div
                                        className="flex items-center justify-between mb-2"
                                    >
                                        <p
                                            className="text-lg font-bold text-blue-500"
                                        >{avaliacao.estrela === 5 ? (
                                            "Excelente"
                                        ) : avaliacao.estrela === 4 ? (
                                                "Bom"
                                            ) : avaliacao.estrela === 3 ? (
                                                "Regular"
                                            ) : avaliacao.estrela === 2 ? (
                                                "Ruim"
                                            ) : (
                                                "Muito Ruim"
                                        )}</p>

                                        <span>
                                            <div className="flex items-center">
                                                {[...Array(Math.round(avaliacao.estrela))].map((_, index) => (
                                                    <img key={index} src={starYellow} alt="Estrela" className="w-[20px]" />
                                                ))}
                                                {[...Array(5 - Math.round(avaliacao.estrela))].map((_, index) => (
                                                    <img key={index} src={starGray} alt="Estrela" className="w-[20px]" />
                                                ))}
                                                <span
                                                    className="ml-2"
                                                >
                                                    {avaliacao.estrela+".0"}</span>
                                            </div>
                                        </span>
                                    </div>
                                    {avaliacao.comentario ? (
                                        <span>{'"'+avaliacao.comentario+'"'}</span>
                                    ) : (
                                        <span><i>Nenhum comentário</i></span>
                                    )}

                                </div>
                            ))
                        ) : (
                            <p><i>Nenhuma avaliação encontrada!</i></p>
                        )}
                    </div>
                    {avaliacoes.length > avaliacoesMostradas && (
                        <button
                            className="w-full p-2 bg-purple-100 hover:bg-purple-200"
                            onClick={handleClickAvaliacoesMostradas}
                        >+ {avaliacoes.length - avaliacoesMostradas}</button>
                    )}
                </div>

            </section>
        </section>
        <Footer />
    </>
);
}

export default PerfilDesenvolvedor;