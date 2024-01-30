import fastify from 'fastify';
import test_routes from "./routes/test_routes";
import setup_database from './plugin/setup_database';

const server = fastify();

server.register(test_routes);
server.register(setup_database, {
    host: "35.202.192.158",
    port: 5432,
    database: "intimadb",
    user: "intima"
})

server.listen({ port: 80, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})