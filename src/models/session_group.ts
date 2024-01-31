import {Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Session } from "./session";


@Table({
    timestamps: false,
    tableName: "session_group"
})
export class SessionGroup extends Model {
    @Column({primaryKey: true, type: DataType.UUID,  allowNull: false})
    session_group_id: string

    @HasMany(() => Session)
    sessions: Session[]
}
