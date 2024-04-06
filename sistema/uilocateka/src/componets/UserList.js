import React from "react";

import { Plus, Trash2Fill, PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const UserList = ({ users, deleteUser }) => {
  return (
    <div>
      <div className="row">
        <div className="col-11"></div>
        <div className="col-1">
          <Link to="/users-create">
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
            <th>Email</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <Link to={`/users-update/${user._id}`}>
                  <button className="btn btn-outline-warning me-3">
                    <PencilSquare color="#ffc107" size={20} />
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  <Trash2Fill color="#dc3545" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
