import React, { useState, useEffect } from "react";
import MovieRentalList from "../componets/MovieRentalList";
import {
  getMoveBorrowOfUser,
  returnBorrow,
} from "../services/movieRentalService";

import { Link } from "react-router-dom";

const MovieRentalListPage = () => {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  const [movieRentals, setMovieRentals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMoveBorrowOfUser(userId);
      console.log(data);
      setMovieRentals(data);
    };
    fetchData();
  }, [userId]);

  const returnBorrowMovie = async (idBorow) => {
    await returnBorrow(idBorow);

    const data = await getMoveBorrowOfUser(userId);
    setMovieRentals(data);
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
      <MovieRentalList
        rentals={movieRentals || []}
        returnBorrowMovie={returnBorrowMovie}
      />
    </div>
    </div>
  );
};

export default MovieRentalListPage;
