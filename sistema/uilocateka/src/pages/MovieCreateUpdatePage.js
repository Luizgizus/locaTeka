import React, { useState, useEffect } from "react";
import {
  createMovie,
  updateMovie,
  getMovieById,
} from "../services/movieService"; // Implemente esta função
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateUpdateMoviePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { idMovie } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    actors: [],
    qtdDvds: "",
    image: null,
  });

  const [isUpdatePage, setIsUpdatePage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const path = location.pathname;
      if (path.includes("movie-update")) {
        setIsUpdatePage(true);
        const data = await getMovieById(idMovie);

        const actors = data.actors.join(",");

        setFormData({
          name: data.name,
          actors: actors,
          qtdDvds: data.qtdDvds,
          image: null,
        });
      }
    };
    fetchData();
  }, [location, idMovie, setIsUpdatePage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("actors", formData.actors);
      formDataToSend.append("qtdDvds", formData.qtdDvds);
      formDataToSend.append("image", formData.image);

      if (isUpdatePage) {
        await updateMovie(idMovie, formDataToSend);
      } else {
        await createMovie(formDataToSend);
      }

      navigate("/movie");
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <span className="navbar-brand  ms-5">Locateka</span>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/users">
              <button className="nav-link">Usuarios</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/movie">
              <button className="nav-link">Filmes</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/movie-rental">
              <button className="nav-link">Emprestimo</button>
            </Link>
          </li>
        </div>
      </nav>

      <div className="container">
        <h1>{isUpdatePage ? "Atualizar Filme" : "Criar Filme"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="name">
              Nome do Filme:
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="actors">
              Atores (separados por vírgula):
            </label>
            <input
              className="form-control"
              type="text"
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={(e) =>
                setFormData({ ...formData, actors: e.target.value.split(", ") })
              }
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="qtdDvds">
              Quantidade de DVDs:
            </label>
            <input
              className="form-control"
              type="number"
              id="qtdDvds"
              name="qtdDvds"
              value={formData.qtdDvds}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="image">
              Imagem do Cartaz:
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!isUpdatePage}
            />
          </div>
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2 text-end">
              <Link to="/movie">
                <button
                  className="btn btn-outline-secondary mt-2 me-2"
                  type="button"
                >
                  Voltar
                </button>
              </Link>
              <button className="btn btn-outline-primary mt-2" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateMoviePage;
