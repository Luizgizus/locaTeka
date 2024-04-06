import React from "react";
import { Plus, Trash3, PencilSquare, BagCheck } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const MovieList = ({ movies, deleteMovie, borrowMovie }) => {
  return (
    <div>
      <div className="row">
        <div className="col-11"></div>
        <div className="col-1">
          <Link to="/movie-create">
            <button className="btn btn-outline-success">
              <Plus color="#198754" size={20} />
            </button>
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Atores</th>
            <th>Quantidade DVDs</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.name}</td>
              <td>{movie.actors.join(', ')}</td>
              <td>{movie.qtdDvds}</td>
              <td className="text-center">
                <Link to={`/movie-update/${movie._id}`}>
                  <button className="btn btn-outline-warning me-3">
                    <PencilSquare color="#ffc107" size={20} />
                  </button>
                </Link>


                <button
                  type="button"
                  className="btn btn-outline-danger me-3"
                  onClick={() => deleteMovie(movie._id)}
                >
                  <Trash3 color="#dc3545" size={20} />
                </button>


                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => borrowMovie(movie._id)}
                >
                  <BagCheck color="#0d6efd" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;