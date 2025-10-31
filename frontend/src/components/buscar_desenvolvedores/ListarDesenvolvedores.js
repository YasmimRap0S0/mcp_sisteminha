import React from "react";
import { BuscarDesenvolvedoresContexto } from "./BuscarDesenvolvedoresContexto";
import starGray from "../../assests/star-gray.png";
import starYellow from "../../assests/star-yellow.png";
import Load from "../Load/Load"

function ListarDesenvolvedores() {
    const { listaDesenvolvedores, carregandoContexto, filtrarPalavraChave } = React.useContext(BuscarDesenvolvedoresContexto);
    const [carregando, setCarregando] = React.useState(carregandoContexto);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        setCarregando(carregandoContexto);
    }, [carregandoContexto]);

    React.useEffect(() => {
        setQuery(filtrarPalavraChave);
    }, [listaDesenvolvedores])

    return (
        <section className="sm:ml-5">
            {carregando ? (
                <Load />
            ) : (
                listaDesenvolvedores.length > 0 ? (
                <>
                    <p
                        style={{font: 'sans', fontWeight: 500, fontSize: '28px'}}
                    >Veja alguns desenvolvedores...</p>
                    {query && (
                        <p
                            style={{font: 'sans', fontWeight: 500, fontSize: '20px'}}
                        >
                            <span className="font-medium">Mostrando resultados para</span> <span className="font-bold">{query}</span>
                        </p>
                    )}
                    {listaDesenvolvedores.map((dev) => (
                        <div
                            className="md:grid grid-cols-[4fr_1fr] items-center bg-[#F4E9FF] rounded-xl p-5 my-5"
                            key={dev.id}
                        >
                            <div
                                className="md:grid grid-cols-[1fr_3fr] items-center"
                            >
                                <img className="mx-auto border-[3px] border-purple-900 rounded-full transition-all duration-300 hover:scale-110 size-[150px] max-[1110px]:size-32 max-lg:size-32 max-md:size-64 max-sm:size-48 object-cover max-md:mx-auto" src={dev.foto} alt={dev.username} />
                                <div
                                    className="ml-5 font-sans font-medium "
                                >
                                    <p className="text-[30px] border-b-[3px] border-[#7D5C9C]">{dev.user_first_name} {dev.user_last_name}</p>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(Math.round(dev.avaliacao_media))].map((_, index) => (
                                                <img key={index} src={starYellow} alt="Estrela" className="w-[20px]" />
                                            ))}
                                            {[...Array(5 - Math.round(dev.avaliacao_media))].map((_, index) => (
                                                <img key={index} src={starGray} alt="Estrela" className="w-[20px]" />
                                            ))}
                                        </div>
                                        <p className="ml-3 font-sans text-[20px] font-medium">({dev.avaliacao_media} - {dev.num_avaliacoes} {dev.num_avaliacoes == 1 ? 'avaliação' : 'avaliações'})</p>
                                    </div>
                                    <p className="font-sans text-[20px] font-medium">{dev.descricao}</p>
                                    <p className="font-sans text-[20px] font-medium">Setores: {dev.setores?.flat().join(", ") || "Nenhum setor"}</p>
                                </div>
                            </div>
                            <div className="p-2 text-center max-md:flex max-md:items-center max-md:justify-around">
                                <a className="max-sm:w-24 max-sm:p-2 max-sm:mx-1 max-sm:text-[15px] md:block my-2 w-32 mx-auto text-white font-sans font-black p-3 rounded-lg bg-purple-700 hover:opacity-90 text-center" href={`/perfil-desenvolvedor/${dev.id}`}>Ver Perfil</a>
                                <a className="max-sm:w-24 max-sm:p-2 max-sm:mx-1 max-sm:text-[15px] md:block my-2 w-32 mx-auto text-white font-sans font-black p-3 rounded-lg bg-purple-700 hover:opacity-90 text-center" href={`/avaliar-desenvolvedor/${dev.id}`}>Avaliar</a>                                    
                            </div>
                        </div>
                    ))}
                </>
                ) : (
                    <div className="text-center text-[22px] font-sans font-medium">Nenhum desenvolvedor corresponde à sua pesquisa</div>
                )
            )}
        </section>
    );
}

export default ListarDesenvolvedores;