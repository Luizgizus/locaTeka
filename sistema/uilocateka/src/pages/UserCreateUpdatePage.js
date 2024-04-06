import React, { useState, useEffect } from "react";
import { createUser, updateUser, getUserById } from "../services/userService"; // Implemente esta função
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateUpdateUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { idUser } = useParams();

  const [formData, setFormData] = useState({
    birthDate: "",
    email: "",
    name: "",
    password: "",
    type: "common",
  });

  const [isUpdatePage, setIsUpdatePage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const path = location.pathname;
      if (path.includes("users-update")) {
        setIsUpdatePage(true);
        const data = await getUserById(idUser);

        setFormData({
          birthDate: data.birthDate.split("T").shift(),
          email: data.email,
          name: data.name,
          type: data.type,
        });
      }
    };
    fetchData();
  }, [location, idUser, setIsUpdatePage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdatePage) {
        await updateUser(idUser, formData);
      } else {
        await createUser(formData);
      }

      navigate("/users");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
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
        <h1>Criar Usuário</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="name">
              Nome:
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
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="birthDate">
              Data Nascimento:
            </label>
            <input
              className="form-control"
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Senha:
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isUpdatePage}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="type">
              Permissão:
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="none">Seleciona a permissão</option>
              <option value="common">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2 text-end">
              <Link to="/users">
                <button
                  className="btn btn-outline-secondary mt-2 me-2"
                  type="submit"
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

export default CreateUpdateUserPage;
