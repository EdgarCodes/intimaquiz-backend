import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getQuestion, getQuestions } from '../controllers/question_controller';


const questionRoutes = async (server: FastifyInstance) => {
    server.route({
        method: "GET",
        url: "/",
        handler: async (req: FastifyRequest, res: FastifyReply) => {
            res.code(200).send("Hello World!");
        }
    });


    server.route({
        method: "GET",
        url: "/question/:question_id",
        handler: getQuestion
    });

    server.route({
        method: "GET",
        url: "/questions",
        handler: getQuestions
    });
}

export default questionRoutes;