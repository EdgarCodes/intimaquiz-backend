export const getGenderCombination = (gender_1:string, gender_2:string) => {
    // genders: male, female
    if((gender_1 === "male" && gender_2 === "female") || (gender_1 === "female" && gender_2 === "male")) return "S"
    else if(gender_1 === "male" && gender_2 === "male") return "G"
    else if(gender_1 === "female" && gender_2 === "female") return "L"
    else return "S"
}