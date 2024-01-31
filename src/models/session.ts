import {BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SessionGroup } from "./session_group";
import { Response } from "./response";


@Table({
    timestamps: false,
    tableName: "session"
})
export class Session extends Model {
    @Column({primaryKey: true, type: DataType.UUID,  allowNull: false})
    session_id: string

    @Default(false)
    @Column({type: DataType.BOOLEAN,  allowNull: false})
    has_finished: boolean

    @ForeignKey(() => SessionGroup)
    @Column({type: DataType.UUID,  allowNull: false})
    session_group_id: string

    @BelongsTo(() => SessionGroup)
    session_group: SessionGroup

    @HasMany(() => Response)
    reponses: Response[]
}
