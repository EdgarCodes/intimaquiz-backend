export const sessionGroupCreateSchema = {
    body: {
        type: "object",
        properties: {
            partner_1: {
                type: "object",
                properties: {
                    name: {type: "string"},
                    gender: {type: "string", "enum": ["male", "female"]}
                },
                required: ["name", "gender"]
            },
            partner_2: {
                type: "object",
                properties: {
                    name: {type: "string"},
                    gender: {type: "string", "enum": ["male", "female"]}
                },
                required: ["name", "gender"]
            }
        },
        required: ["partner_1", "partner_2"],
        additionalProperties: false
    }
}

export const sessionGroupCloseSchema = {
    body: {
        type: "object",
        properties: {
            "session_group_id": {type: "string"},
        },
        required: ["session_group_id"],
        additionalProperties: false
    }
}