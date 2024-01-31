import { FastifyReply, FastifyRequest } from "fastify";
import { Question } from "../models/question";
import { Op } from "sequelize";



export const getQuestion = async (req: FastifyRequest, res: FastifyReply) => {
    const question_id:string = req.params["question_id"];

    if(!question_id) {
        res.code(400).send({"error": "Bad request, Question ID is invalid."});
        return; 
    }

    try {
        const question = await Question.findByPk(question_id);

        if(!question) {
            res.code(404).send({"error": "No question with that ID found"});
            return;
        }

        res.code(200).send(question.toJSON());
    }
    catch(err) {
        res.code(500).send({"error": "An issue occured retrieving question. Error: " + err});
    }
}


export const getQuestions = async (req: FastifyRequest, res: FastifyReply) => {

    try {
        const questions = await Question.findAll({
            where: { 
                parent_id: {[Op.is]: null}
            },
            include: [{
                model: Question,
                as: "childQuestions"
            }]
        });

        res.code(200).send(questions);
    }
    catch(err) {
        res.code(500).send({"error": "An issue occured retrieving questions. Error: " + err});
    }
}