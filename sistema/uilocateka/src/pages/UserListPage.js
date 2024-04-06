import React, { useState, useEffect } from "react";
import UserList from "../componets/UserList";
import { getUsers, deleteUsers } from "../services/userService"; // Implemente esta função
import { Link } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const deleteUserHandler = async (_id) => {
    await deleteUser(_id);
    const updatedUsers = users.filter(user => user._id !== _id);
    setUsers(updatedUsers);
  };

  const deleteUser = async (_id) => {
    const response = await deleteUsers(_id);
    console.log(response)
    return response
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
        <h1 className="display-1">Usuarios</h1>
      </div>
      <UserList users={users || []} deleteUser={deleteUserHandler}/>
    </div>
    </div>
  );
};

export default UserListPage;
