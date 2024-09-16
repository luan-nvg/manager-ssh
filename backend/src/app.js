const express = require("express");
const cors = require("cors"); // Importa o middleware CORS

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());

const SECRET_KEY = "your-secret-key"; // Substitua por uma chave secreta forte
const filePath = path.join(process.env.HOME, ".ssh/authorized_keys");

// Usuário e senha para autenticação (idealmente armazenar no banco de dados)
const user = {
  username: "admin",
  password: bcrypt.hashSync("password5399", 8), // hash da senha
};

// Middleware para parsing JSON
app.use(express.json());

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: "Nenhum token fornecido." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Falha ao autenticar o token." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(404).send("Usuário não encontrado");
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.username }, SECRET_KEY, {
    expiresIn: 86400,
  }); // Expira em 24 horas

  res.status(200).send({ auth: true, token });
});

// Rota para listar todas as chaves (protegida)
app.get("/keys", verifyToken, (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo");
    }
    const keys = data.split("\n").filter((key) => key.trim() !== "");
    res.json(keys);
  });
});

// Rota para adicionar uma nova chave (protegida)
app.post("/keys", verifyToken, (req, res) => {
  const newKey = req.body.key;
  if (!newKey) {
    return res.status(400).send("Chave SSH não fornecida");
  }

  fs.appendFile(filePath, `\n${newKey}\n`, (err) => {
    if (err) {
      return res.status(500).send("Erro ao adicionar a chave");
    }
    res.status(200).send("Chave adicionada com sucesso");
  });
});

// Rota para remover uma chave específica (protegida)
app.delete("/keys", verifyToken, (req, res) => {
  const keyToRemove = req.body.key;
  if (!keyToRemove) {
    return res.status(400).send("Chave SSH não fornecida");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo");
    }

    const keys = data.split("\n").filter((key) => key.trim() !== "");
    const newKeys = keys.filter((key) => key !== keyToRemove);

    fs.writeFile(filePath, newKeys.join("\n") + "\n", (err) => {
      console.log(err);
      if (err) {
        return res.status(500).send("Erro ao remover a chave");
      }
      res.status(200).send("Chave removida com sucesso");
    });
  });
});

// Iniciar o servidor
app.listen(3008, () => {
  console.log("Servidor rodando na porta 3008");
});
