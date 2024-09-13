import React, { useState, useEffect } from "react";
import axios from "axios";
import KeyList from "./components/KeyList";
import AddKey from "./components/AddKey";

const App = () => {
  const [keys, setKeys] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/keys`, { 
          headers: { "x-access-token": token } 
        })
        .then((response) => setKeys(response.data))
        .catch((error) => {
          console.error("Erro ao buscar as chaves:", error);
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        });
    }
  }, [isLoggedIn, token]);

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setIsLoggedIn(true);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Erro no login:", error);
        setErrorMessage("Credenciais inválidas, tente novamente.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    setErrorMessage("Sessão expirada, faça login novamente.");
  };

  const addKey = (newKey) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/keys`,
        { key: newKey },
        { headers: { "x-access-token": token } }
      )
      .then(() => setKeys([...keys, newKey]))
      .catch((error) => {
        console.error("Erro ao adicionar chave:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      });
  };

  const removeKey = (keyToRemove) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/keys`, {
        data: { key: keyToRemove },
        headers: { "x-access-token": token },
      })
      .then(() => setKeys(keys.filter((key) => key !== keyToRemove)))
      .catch((error) => {
        console.error("Erro ao remover chave:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Gerenciamento de Chaves SSH</h1>
          <button onClick={handleLogout}>Sair</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <AddKey addKey={addKey} />
          <KeyList keys={keys} removeKey={removeKey} />
        </>
      ) : (
        <div>
          <h1>Login</h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      )}
    </div>
  );
};

export default App;
