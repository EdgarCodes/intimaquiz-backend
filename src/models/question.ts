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

    @Column({ type: DataType.TEXT, allowNull: false})
    question: string

    @Column({ type: DataType.TEXT, allowNull: true})
    optional_information: string 

    @ForeignKey(() => Question)
    @Column({ type: DataType.INTEGER, allowNull: true})
    parent_id: number

    // A question belongs to its parent (if it has one)
    @BelongsTo(() => Question, 'parent_id')
    parentQuestion: Question;

    // A question has many child questions
    @HasMany(() => Question, 'parent_id')
    childQuestions: Question[];

    @HasMany(() => Response)
    reponses: Response[]
}


// TODO TABLES
//response 
// ses sion
// grouped_questions
// pairings (for male to male, female to female, etc...)