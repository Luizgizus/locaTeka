import React from "react";
import { ArrowReturnLeft } from "react-bootstrap-icons";

const MovieRentalList = ({ rentals, returnBorrowMovie }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome filme emprestado</th>
            <th>Já foi retornado</th>
            <th>Data Locação</th>
            <th>Data Devolução</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental._id}>
              <td>{rental.nameMovieBorowed}</td>
              <td>{rental.isReturned ? "Sim" : "Não"}</td>
              <td>{rental.createdAt}</td>
              <td>{rental.isReturned ? rental.updatedAt : "-"}</td>
              <td className="text-center">
                {
                rental.isReturned ? <button
                disabled
                type="button"
                className="btn btn-outline-secondary"
              >
                <ArrowReturnLeft color="#6c757d" size={20} />
              </button> : <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => returnBorrowMovie(rental._id)}
                >
                  <ArrowReturnLeft color="#dc3545" size={20} />
                </button>}
              </td>                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieRentalList;
