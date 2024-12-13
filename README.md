## Cliente Gateway

El gateway es el punto de comunicación entre nuestros clientes y servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente

## Dev

1. Clonar repositorio
2. Instalar dependencias
3. Crear archivo `.env` basado en el archivo `.env.example`
4. Levantar el servidor de Nats
```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```
5. Tener levantados los microservicios que se van a consumir
6. Levantar el proyecto con `npm run start:dev`

## Nats
```

docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats

```