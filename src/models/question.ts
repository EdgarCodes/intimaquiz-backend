import {Column, DataType, Model, Table } from "sequelize-typescript";


@Table({
    timestamps: false,
    tableName: "questions"
})
export class Question extends Model {
    @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: true,  allowNull: false})
    question_id: number

}