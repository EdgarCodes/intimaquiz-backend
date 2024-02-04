export const sessionResponsesSchema = {
    body: {
        type: "object",
        properties: {
            responses: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        question_id: { type: "number" },
                        response: { type: "number" }
                    },
                    required: ["question_id", "response"]
                }
            },
            session_id: { type: "string" }
        },
        required: ["responses", "session_id"],
        additionalProperties: false
    }
};