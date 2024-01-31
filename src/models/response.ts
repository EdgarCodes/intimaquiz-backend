import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Question } from "./question";
import { Session } from "./session";


@Table({
    timestamps: false,
    tableName: "responses"
})
export class Response extends Model {
    @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: true,  allowNull: false})
    response_id: number

    @Column({ type: DataType.INTEGER,  allowNull: false})
    response: number

    @ForeignKey(() => Question)  
    @Column({ type: DataType.INTEGER, allowNull: false})
    question_id: number

    @ForeignKey(() => Session)  
    @Column({ type: DataType.UUID, allowNull: false})
    session_id: string

    @BelongsTo(() => Question)
    question: Question

    @BelongsTo(() => Session)
    session: Session
}
