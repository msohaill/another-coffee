import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Category } from "../enums/Category"
import { Receipt } from "./Receipt"

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column("decimal", { scale: 2, nullable: false })
    price: number;

    @Column("text", { array: true, nullable: false, default: '[]'})
    tag: string[];

    @ManyToOne(() => Receipt, receipt => receipt.items)
    receipt: Receipt;

}
