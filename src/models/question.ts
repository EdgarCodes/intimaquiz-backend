import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Response } from "./response";


@Table({
    timestamps: false,
    tableName: "questions"
})
export class Question extends Model {
    @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: true,  allowNull: false})
    question_id: number

    @Column({ type: DataType.STRING,  allowNull: false})
    category: string

    @Column({ type: DataType.STRING, allowNull: false})
    quiz: string 

    @Column({ type: DataType.TEXT, allowNull: false})
    question: string

    @Column({ type: DataType.STRING,  allowNull: false}) // Options: any, male, female
    gender: string

    @Column({ type: DataType.STRING,  allowNull: false}) // Options: S, G, L
    pairing: string

    @Column({ type: DataType.TEXT, allowNull: true})
    optional_information: string 

    @HasMany(() => Response)
    reponses: Response[]
}


// TODO TABLES
//response 
// ses sion
// grouped_questions
// pairings (for male to male, female to female, etc...)