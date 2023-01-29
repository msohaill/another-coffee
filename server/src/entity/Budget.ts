import { Entity, PrimaryColumn, Column } from "typeorm"
import { Category } from "../enums/Category"

@Entity()
export class Budget {

    @PrimaryColumn()
    Category: Category

    @Column("decimal",{ scale: 2, nullable: false })
    limit: number 





}