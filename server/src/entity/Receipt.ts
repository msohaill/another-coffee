import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Category } from '../enums/Category'
import { Item } from "./Item"

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    vendor: string;

    @Column({ nullable: false })
    date: Date;

    @Column("decimal", { scale: 2, nullable: false })
    tax: number;

    @Column("decimal", { scale: 2, nullable: false })
    total: number;

    @Column("simple-enum", { nullable: false })
    category: Category;

    // not a real field, but typeorm will allow us to query for items with this receipt
    @OneToMany( () => Item, item => item.receipt)
    items: Item[];
}
