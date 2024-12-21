import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "npm:sequelize-typescript"

@Table({
    tableName: "items",
    timestamps: true
})
export class Items extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    item_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    item_name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    count!: number

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