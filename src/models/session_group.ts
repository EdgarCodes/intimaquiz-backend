import {Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript";
import { Session } from "./session";


@Table({
    timestamps: false,
    tableName: "session_groups"
})
export class SessionGroup extends Model {
    @Column({primaryKey: true, type: DataType.UUID,  allowNull: false, defaultValue: DataType.UUIDV4})
    session_group_id: string

    @Default(null)
    @Column({type: DataType.STRING,  allowNull: true})
    gender_combination: string

    @Default(false)
    @Column({type: DataType.BOOLEAN,  allowNull: false})
    closed_session: boolean

    @HasMany(() => Session)
    sessions: Session[]
}


// Gender combinations
// MALE FEMALE: S
// MALE MALE: G
// FEMALE FEMALE: L
// Gender combinations: SG, SL, GL