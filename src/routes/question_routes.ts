import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getSessionsQuestions } from '../controllers/question_controller';


const questionRoutes = async (server: FastifyInstance) => {
    server.route({
        method: "GET",
        url: "/session_questions/:session_id",
        handler: getSessionsQuestions
    });
}

export default questionRoutes;