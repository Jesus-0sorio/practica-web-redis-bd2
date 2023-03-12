const express = require("express");
const { createClient } = require("redis");

//Conexion a redis
const client = createClient({
  host: "redis-server",
  port: 6379,
});

const app = express();
const port = 3000;
app.use("/", express.static(__dirname + "/static"));
app.use(express.json());

client.on("error", (err) => {
  console.log(err);
});

//Crea un perfil
app.post("/addprofile", async (req, res) => {
  try {
    const { email, name, tel, birth } = req.body;

    client.hset(
      email,
      "name",
      name,
      "tel",
      tel,
      "birth",
      birth,
      (err) => {
        if (err) {
          res.status(404);
        }
        res.status(200);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Obtiene un perfil mediante
app.get("/profile/:email", async (req, res) => {
  try {
    const email = req.params.email;
    client.hgetall(email, (err, result) => {
      if (err) {
        res.status(404).send("Not found");
      }
      res.status(200).json({ ...result });
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port);
console.log(`Servidor en http://localhost:${port}`);
