import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/sisteminha_api"
    : "http://34.198.150.133:8000/sisteminha_api";

function ExibirCategoriasDosSistemas() {
  const [categorias, setCategorias] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await axios.get(`${API_BASE_URL}/categorias/`);
        setCategorias(response.data);
      } catch (err) {
        console.error("An error has occurred at fetchCategorias: ", err);
      }
    }
    fetchCategorias();
  }, []);

  return (
    <section>
      <div className="px-[139px] py-[51px] max-md:px-[70px]">
        <h1 className="font-sans text-[40px] mb-[41px]">
          As Categorias mais populares buscadas:
        </h1>
        {categorias && (
          <Swiper
            navigation
            modules={[Navigation]}
            spaceBetween={20}
            breakpoints={{
              480: { slidesPerView: 1 },
              1080: { slidesPerView: 2 },
              1300: { slidesPerView: 3 },
              1666: { slidesPerView: 4 },
            }}
          >
            {categorias.map((cat) => (
              <SwiperSlide key={cat.id}>
                <div
                  className="mx-auto flex items-center justify-center cursor-pointer w-[250px] h-[150px] hover:opacity-90"
                  onClick={() =>
                    navigate(`/sistemas/${cat.id}`, {
                      state: {
                        nome: cat.nome,
                      },
                    })
                  }
                >
                  <img src={cat.imagem} alt={cat.nome} width={"100%"} />
                  <span className="absolute flex items-center justify-center font-sans font-bold text-[22px] p-[10px] text-white bg-[#7C5C9DE5]">
                    {cat.nome}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default ExibirCategoriasDosSistemas;