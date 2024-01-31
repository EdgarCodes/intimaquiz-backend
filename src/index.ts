import fastify from 'fastify';
import setup_database from './plugin/setup_database';
import questionRoutes from './routes/question_routes';
import fastifyCors from '@fastify/cors';

const server = fastify();


// Register fastify-cors
server.register(fastifyCors, { 
    origin: '*' // Allows all origins (TODO allow only from website url and cloud url)
});

server.register(questionRoutes);
server.register(setup_database, {
    host: "35.202.192.158",
    database: "intimadb",
    user: "intima"
})

server.listen({ port:8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})