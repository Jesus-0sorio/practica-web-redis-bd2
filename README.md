# Practica NoSQL redis para Bases de Datos 2
Este es un ejemplo basico de como usar Redis con Nodejs, las funciones del aplicativo es resgistar un usuario asignandole como llave el email en el cual se guarda el nombre, telefono y fecha de nacimiento, y buscar el usuario mediante el email

## Requisitos
Necesitas tener instalado Redis en tu sistema o como alternativa usar docker:
```shell
docker run -d --name practica-redis -p 6379:6379 redis/redis-stack-server
```
para correr el aplicativo de Nodejs ejecuta:
###`npm start`
