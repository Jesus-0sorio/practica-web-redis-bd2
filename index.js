const express = require("express");
const redis = require("redis");

const client = redis.createClient();

const app = express();
const port = 3000;

client.connect();

console.log("Connecting to the Redis");

client.on("ready", () => {
  console.log("Connected!");
});

client.on("error", (err) => {
  console.log("Error in the Connection", err);
});

app.use(express.json());

app.post("/addprofile", (req, res) => {
  const { email, name, tel, birth } = req.body;
  client
    .HSET(email, { name, tel, birth })
    .then(() => {
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});

app.get("/profile/:email", (req, res) => {
  const email = req.params.email
  client.hGetAll(email).then(result => {
    res.send(result)
  })
});

app.listen(port);
console.log(`Servidor en http://localhost:${port}`);
