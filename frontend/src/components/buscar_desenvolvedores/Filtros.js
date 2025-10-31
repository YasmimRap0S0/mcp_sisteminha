import React from "react";
import Checkbox from "../form/Checkbox";
import { BuscarDesenvolvedoresContexto } from "./BuscarDesenvolvedoresContexto";

function Filtros() {
    const { filtrarPalavraChave, setFiltrarPalavraChave, filtrarSetor, setFiltrarSetor, filtrarAvaliacao, setFiltrarAvaliacao, conferirFiltros, limparFiltros } = React.useContext(BuscarDesenvolvedoresContexto);
    const [filtrosMobile, setFiltrosMobile] = React.useState(false);

    async function handleSubmit (event) {
        event.preventDefault();
        conferirFiltros();
    }

    return (
        <>
            <div className="w-full max-lg:mb-5 max-lg:w-full bg-[#4294A240] rounded-2xl relative w-[350px] p-[20px] ">
                <div
                    className="max-lg:opacity-80 hover:opacity-100 font-sans font-medium text-[26px] flex max-md-hover:opacity-80 max-lg:cursor-pointer items-center justify-between"
                    onClick={() => {setFiltrosMobile(!filtrosMobile)}}
                >
                    <span>Filtros de Busca</span>
                    <img
                        src={`/images/icons/${filtrosMobile ? 'remove' : 'plus'}-icon.svg`}
                        alt="icon-plus"
                        className={`lg:hidden cursor-pointer w-12`}
                    />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${filtrosMobile ? 'max-lg:max-h-[515px] max-[950px]:max-h-[650px] max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:opacity-0'}`}>
                    <form onSubmit={handleSubmit} className={`hidden bg-white rounded-md p-2 my-2 max-[950px]:flex w-full`}>
                        <img src="/images/icons/lupa.svg" alt="Lupa" className=''/>
                        <input value={filtrarPalavraChave} onChange={({target}) => setFiltrarPalavraChave(target.value)} type="text" id="palavra-chave" className='w-full ml-2 font-sans focus:outline-none' name="palavra-chave" placeholder={`Pesquisar Desenvolvedores...`}/>
                        <div className='w-10 flex items-center p-2 cursor-pointer hover:bg-[#4294A240] rounded-md transition-all duration-300' onClick={handleSubmit}>
                            <img src="/images/icons/arrow-right.svg" alt="Lupa" />
                      </div>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <div className="max-lg:w-full bg-[#EDEDED] p-[12px] rounded-2xl my-3">
                            <h3 className="text-[24px] font-sans font-medium">Buscar desenvolvedores por setores</h3>
                            <Checkbox options={['alimentício', 'varejo', 'beleza', 'têxtil']} value={filtrarSetor} setValue={setFiltrarSetor} />
                        </div>

                        <div className="bg-[#EDEDED] p-[12px] rounded-2xl my-3">
                            <h3 className="text-[24px] font-sans font-medium">Buscar desenvolvedores por Avaliação</h3>
                            <Checkbox options={['5 estrelas', '4 estrelas', '3 estrelas']} value={filtrarAvaliacao} setValue={setFiltrarAvaliacao} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-700 text-white text-[19px] max-2xl:text-[15px] rounded-md cursor-pointer hover:opacity-90 p-2 font-sans font-medium 2xl:w-32 xl:w-28 max-lg:w-32 max-lg:text-[19px]"
                            >Filtrar</button>
                            <input
                                type="button"
                                className="bg-gray-700 text-white text-[19px] max-2xl:text-[15px] rounded-md cursor-pointer hover:opacity-90 p-2 font-sans font-medium 2xl:w-32 xl:w-28 max-lg:w-32 max-lg:text-[19px]"
                                value="Limpar Filtros"
                                onClick={limparFiltros}
                                disabled={!filtrarSetor.length && !filtrarAvaliacao.length}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Filtros;