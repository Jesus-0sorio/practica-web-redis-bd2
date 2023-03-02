const express = require("express");
const { createClient } = require("redis");

//Conexion a redis
const client = createClient();

const app = express();
const port = 3000;
app.use('/' ,express.static(__dirname + "/static"));
app.use(express.json())

//Crea un perfil
app.post("/addprofile", (req, res) => {
  const { email, name, tel, birth } = req.body;
  client
    .HSET(email, { name, tel, birth })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//Obtiene un perfil mediante
app.get("/profile/:email", (req, res) => {
  const email = req.params.email;
  client
    .hGetAll(email)
    .then((result) => {
      res.status(200).json({...result});
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Not found");
    });
});

client.connect();
app.listen(port);
console.log(`Servidor en http://localhost:${port}`);
