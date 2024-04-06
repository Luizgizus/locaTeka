import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { login } from "../services/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/users");
    } catch (error) {
      console.error("Erro de login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={LoginUser}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
