import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "npm:sequelize-typescript"

@Table({
    timestamps: true,
    tableName: "users"
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.STRING,
        field: "mobile",
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [ 10, 13 ],
        },
    })
    mobile!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "customer", //admin, customer,
    })
    role!:string

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deleted_at!: Date

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at!: Date

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updated_at!: Date

}