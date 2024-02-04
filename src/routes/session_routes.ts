import { FastifyInstance } from 'fastify'
import { sessionGroupCloseSchema, sessionGroupCreateSchema } from './schemas/session-route-schemas';
import { closeSessionGroup, createSessionGroup, getSessionGroupFromSession } from '../controllers/session_controller';


const sessionRoutes = async (server: FastifyInstance) => {
    server.route({
        method: "POST",
        url: "/create_session_group",
        schema: sessionGroupCreateSchema,
        handler: createSessionGroup
    });

    server.route({
        method: "POST",
        url: "/close_session_group",
        schema: sessionGroupCloseSchema,
        handler: closeSessionGroup
    });

    server.route({
        method: "GET",
        url: "/get_session_group_from_session/:session_id",
        handler: getSessionGroupFromSession
    });
}

export default sessionRoutes;