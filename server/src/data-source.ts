import "reflect-metadata"
import { DataSource } from "typeorm"
import { Receipt } from './entity/Receipt'
import { Item } from './entity/Item'
import { Category } from './enums/Category'
import { Budget } from './entity/Budget'

export const source = new DataSource({
    type: "sqlite",
    database: "app.db",
    synchronize: true,
    logging: false,
    entities: [Receipt, Item, Budget],
    migrations: [],
    subscribers: [],
})
