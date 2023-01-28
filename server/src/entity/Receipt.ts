import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    vendor: string

    @Column({ nullable: false })
    date: Date

    @Column("decimal", { scale: 2, nullable: false })
    tax: number
}
