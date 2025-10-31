import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavHome from '../../components/NavHome/NavUsuario';
import Footer from '../../components/Footer/Footer';
import { BuscarDesenvolvedoresProvider } from '../../components/buscar_desenvolvedores/BuscarDesenvolvedoresContexto';
import Load from '../../components/Load/Load';

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

function AdicionarSistema() {
  const navigate = useNavigate();
  const [desenvolvedorId, setDesenvolvedorId] = useState();

  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/`);
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error('Erro ao carregar categorias');
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.perfil === 'desenvolvedor') {
        fetchCategorias();
        setDesenvolvedorId(user.data.id);
      } else if (user.perfil === 'microempreendedor') {
        navigate("/home-microempreendedor");
      }
    } else {
      navigate("/login-desenvolvedor");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('setor', setor);
      formData.append('descricao', descricao);
      formData.append('status', status);
      formData.append('categoria', categoria);
      formData.append('desenvolvedor_id', desenvolvedorId);
      if (imagem) {
        formData.append('imagem', imagem);
      }

      const response = await fetch(`${API_BASE_URL}/sistemas/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Erro ao adicionar sistema. Tente novamente mais tarde.";

        if (errorData && errorData.non_field_errors) {
          errorMessage = errorData.non_field_errors.join('\n');
        } else if (errorData) {
          errorMessage = JSON.stringify(errorData);
        }

        throw new Error(`${response.status} - ${errorMessage}`);
      }

      setNome('');
      setSetor('');
      setDescricao('');
      setStatus('');
      setCategoria('');
      setImagem(null);
      navigate('/home-desenvolvedor');
      alert('Sistema adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleImageChange = (event) => {
    setImagem(event.target.files[0]);
  };

  return (
    <>
      {!desenvolvedorId ? (
        <Load />
      ) : (
        <>
          <BuscarDesenvolvedoresProvider>
            <NavHome />
          </BuscarDesenvolvedoresProvider>
          <div className="relative m-10 bg-white border border-4 rounded-lg shadow">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Adicionar Sistema</h3>
            </div>

            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Setor</label>
                  <input
                    type="text"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="concluido">Concluído</option>
                    <option value="em_andamento">Em Andamento</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  >
                    <option value="">Selecione</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows="6"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm"
                    required
                  ></textarea>
                </div>
                <div className="col-span-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Imagem</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                  {imagem && <p className="mt-2 text-sm">{imagem.name}</p>}
                </div>
                <div className="flex justify-end col-span-full">
                  <button
                    type="submit"
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default AdicionarSistema;