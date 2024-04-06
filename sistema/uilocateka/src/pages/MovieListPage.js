import React, { useState, useEffect } from "react";
import MovieList from "../componets/MovieList";
import { getMovie, deleteMovie } from "../services/movieService";
import { borrow } from "../services/movieRentalService";
import { Link } from "react-router-dom";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovie();
      setMovies(data);
    };
    fetchData();
  }, []);

  const deleteMovieHandler = async (id) => {
    await deleteMovie(id);
    const updatedMovies = movies.filter((movie) => movie._id !== id);
    setMovies(updatedMovies);
  };

  const borrowMovieHandler = async (idMovie) => {
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    await borrow(userId, idMovie);

    const data = await getMovie();
    setMovies(data);
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
        <div className="col-11">
          <h1 className="display-1">Filmes</h1>
        </div>
        <MovieList
          movies={movies || []}
          deleteMovie={deleteMovieHandler}
          borrowMovie={borrowMovieHandler}
        />
      </div>
    </div>
  );
};

export default MovieListPage;
