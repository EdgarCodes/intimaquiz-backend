import { FastifyReply, FastifyRequest } from "fastify";
import { Session } from "../models/session";
import { Response } from "../models/response";
import { SessionGroup } from "../models/session_group";
import { getSimilarResponses } from "../utils/response_utils";
import { Question } from "../models/question";
import { Op } from "sequelize";

export const setSessionResponses = async (req: FastifyRequest, res: FastifyReply) => { 
    const session_id = req.body["session_id"];
    const responses = req.body["responses"];

    try{
        // Check session exists
        const session = await Session.findByPk(session_id);

        if(!session) {
            res.code(400).send({"error": "Bad request, session ID is invalid."});
            return; 
        }
        
        responses.forEach(response => {
            response.session_id = session_id;
        });

        console.log(responses);

        const result = await Response.bulkCreate(responses);

        // Update the status of session to "finished"
        session.has_finished = true;
        session.save();
        
        res.code(200).send({"msg": "Responses for session: " + session_id + " Have been added succesfully!"});

    }
    catch(err) {
        res.code(500).send({"error": "An issue occured setting session responses. Error: " + err});
    }
} 

export const getSessionResponses = async (req: FastifyRequest, res: FastifyReply) => {  
    // Check session group exists
    const session_group_id = req.params["session_group_id"];

    if(!session_group_id) {
        res.code(400).send({"error": "Bad request, values missing."})
        return;
    }

    const session_group = await SessionGroup.findByPk(session_group_id, {
        include: [{
            model: Session,
            include: [
                {
                   model: Response 
                }
            ]
        }] 
    });

    if(!session_group) {
        res.code(404).send({"error": "Session group with given ID not found"})
        return;
    }
    else if(!session_group.closed_session) {
        // Ensure session is closed
        res.code(400).send({"error": "Session group has not been closed yet."})
        return;
    }

    const partner_responses_1 = session_group.sessions[0].reponses;
    const partner_responses_2 = session_group.sessions[1].reponses;

    const similar_responses = getSimilarResponses(partner_responses_1, partner_responses_2);

    // Convert result
    const questionIds = Object.keys(similar_responses);
    const numericQuestionIds = questionIds.map(id => parseInt(id));

    const questions = await Question.findAll({
        where: {
            question_id: {
                [Op.in]: numericQuestionIds
            }
        }
    });

    const combined_questions = questions.map((question) => {
        return {
            "question_id": question.question_id, 
            "question": question.question, 
            "category": question.category,
            "optional_information": question.optional_information, 
            "partner_1_answer": similar_responses[question.question_id][0], 
            "partner_2_answer": similar_responses[question.question_id][1]
        };
    });

    res.code(200).send(combined_questions);
}