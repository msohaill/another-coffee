import { Entity, PrimaryColumn, Column } from "typeorm"
import { Category } from "../enums/Category"

@Entity()
export class Budget {
    @PrimaryColumn()
    category: Category

    @Column("decimal",{ scale: 2, nullable: false, default: 250.00 })
    limit: number
}
