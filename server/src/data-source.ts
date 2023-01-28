import "reflect-metadata"
import { DataSource } from "typeorm"
import { Receipt } from './entity/Receipt'

export const source = new DataSource({
    type: "sqlite",
    database: "app.db",
    synchronize: true,
    logging: false,
    entities: [Receipt],
    migrations: [],
    subscribers: [],
})
