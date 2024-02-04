import { FastifyReply, FastifyRequest } from "fastify";
import { Question } from "../models/question";
import { Op } from "sequelize";
import { Session } from "../models/session";
import { SessionGroup } from "../models/session_group";



export const getSessionsQuestions = async (req: FastifyRequest, res: FastifyReply) => { 
    // Queries questions based on session information

    // Ensure sessions exists by querying it and include group
    const session_id = req.params["session_id"];

    if(!session_id) {
        res.code(400).send({"error": "Bad request, session ID is invalid."});
        return; 
    }
    
    const current_session = await Session.findOne({
        where: { session_id },
        include: SessionGroup
    });

    if(!current_session) {
        res.code(404).send({"error": "No session with that ID found. "});
        return;
    }

    if(current_session.has_finished) {
        res.code(400).send({"error": "Session has already concluded their session. Cannot provide questions"});
        return;
    }

    // Query questions that match gender and opposite gender
    try{
        const session_questions = await Question.findAll({
            where: {
                gender: { [Op.or]: [current_session.gender, "any"]}, 
                pairing: {
                    [Op.or]: [
                      { [Op.like]: `%${current_session.session_group.gender_combination}%` }, // Substring match
                      "any"
                    ]
                }
            },
        });

        res.code(200).send(session_questions);
    }
    catch(err) {
        res.code(500).send({"error": "An issue occured retrieving questions. Error: " + err});
    }
}
