import { FastifyInstance } from 'fastify'
import { sessionResponsesSchema } from './schemas/response-route-schema';
import { setSessionResponses, getSessionResponses } from '../controllers/response_controller';


const responseRoutes = async (server: FastifyInstance) => {
    server.route({
        method: "GET",
        url: "/get_session_responses/:session_group_id",
        handler: getSessionResponses 
    });

    server.route({
        method: "POST",
        url: "/set_session_responses",
        schema: sessionResponsesSchema,
        handler: setSessionResponses
    });
}

export default responseRoutes;