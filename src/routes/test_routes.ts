import fastify, { FastifyInstance } from 'fastify'


async function test_routes(server:FastifyInstance) {
    server.get('/', async (request, reply) => {
        return "hello world!"
    });

    server.get('/ping', async (request, reply) => {
        return "pong"
    });
}

export default test_routes;