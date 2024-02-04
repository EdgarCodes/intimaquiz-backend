// @ts-nocheck
import { Response } from "../models/response";

export const getSimilarResponses = (responses_1: Response[], responses_2: Response[]) => {
    const combinedResponses = [...responses_1, ...responses_2];

    // Filter out responses with a value below 3 and aggregate by question_id
    const filteredAggregatedResponses = combinedResponses.reduce((acc, current) => {
        if (current.response >= 3) {
            if (!acc[current.question_id]) {
                acc[current.question_id] = { count: 1, responses: [current.response] };
            } else {
                acc[current.question_id].count += 1;
                acc[current.question_id].responses.push(current.response);
            }
        }
        return acc;
    }, {});

    // Now, filter out questions where both partners did not vote 3 or above
    const questionsBothPartnersAgree = Object.entries(filteredAggregatedResponses)
        .filter(([_, value]) => value.count === 2) // Assuming each partner can only respond once per question
        .reduce((acc, [key, value]) => {
        acc[key] = value.responses; // Or any other structure you prefer
        return acc;
    }, {});

    // { '1': [ 3, 5 ], '2': [ 3, 4 ], '3': [ 4, 3 ] } example response id[0] will always be partner 1 and id[1] will always be partner 2
    return questionsBothPartnersAgree;
}