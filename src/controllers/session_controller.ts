import { FastifyReply, FastifyRequest } from "fastify";
import { Session } from "../models/session";
import { SessionGroup } from "../models/session_group";
import { getGenderCombination } from "../utils/session_utils";
import { Op } from "sequelize";

export const createSessionGroup = async (req: FastifyRequest, res: FastifyReply) => {
    // Get values from body
    let partner_1 = req.body["partner_1"];
    let partner_2 = req.body["partner_2"];

    if(!partner_1 || !partner_2) {
        res.code(400).send({"error": "Bad request, values missing."})
        return;
    }

    // Create session group
    let session_group: SessionGroup = await SessionGroup.create();


    // Create two sessions
    let session_1: Session = await Session.create({
        "name": partner_1["name"],
        "gender": partner_1["gender"],
        "session_group_id": session_group.session_group_id
    });

    let session_2: Session = await Session.create({
        "name": partner_2["name"],
        "gender": partner_2["gender"],
        "session_group_id": session_group.session_group_id
    });

    // Create session group with those sessions
    session_group.gender_combination = getGenderCombination(session_1.gender, session_2.gender);
    session_group.save();

    // return session_group_id, sessions_1, session_2
    res.code(200).send({"session_group_id": session_group.session_group_id, "session_1": session_1.session_id, "session_2": session_2.session_id})
}


export const closeSessionGroup = async (req: FastifyRequest, res: FastifyReply) => { 
    // Check if group session exists.
    const session_group_id = req.body["session_group_id"];

    if(!session_group_id) {
        res.code(400).send({"error": "Bad request, values missing."})
        return;
    }

    const session_group = await SessionGroup.findByPk(session_group_id, {include: Session});

    if(!session_group) {
        res.code(404).send({"error": "Session group with given ID not found"})
        return;
    }
    

    // Check if both paired sessions have finished
    if(session_group.sessions[0].has_finished && session_group.sessions[1].has_finished) {
        // session group can be closed. 
        session_group.closed_session = true;
        session_group.save();


        res.code(200).send({"msg":"Session Group has been successfully closed. Session Group: " + session_group_id,"session_closed": true})
    }
    else {
        // session is not yet finished, In UI would would say partner is not finished yet here
        res.code(200).send({"msg":"Session Group has not been closed. Session Group: " + session_group_id,"session_closed": false})
    }
}


export const getSessionGroupFromSession = async (req: FastifyRequest, res: FastifyReply) => { 
    const session_id = req.params["session_id"];

    
    if(!session_id) {
        res.code(400).send({"error": "Bad request, session ID is invalid."});
        return; 
    }

    const current_session = await Session.findOne({
        where: { session_id },
        include: [
            {
                model: SessionGroup,
                include: [{
                    model: Session, 
                    where: {
                        session_id: {[Op.ne]: session_id}
                    }
                }]
            }
        ]
    });

    if(!current_session) {
        res.code(404).send({"error": "No session with that ID found. "});
        return;
    }

    res.code(200).send(current_session.toJSON());
}