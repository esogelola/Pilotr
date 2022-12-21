import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Company } from "./entities/Company"
import { Test } from "./entities/test"
import { DataFile } from "./entities/DataFile"
import { DataGroup } from "./entities/DataGroup"
import { DataGraph } from "./entities/DataGraph"
import path from "path"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pilotr",
    synchronize: false,
    logging: false,
    entities: [User, Company, Test, DataFile, DataGroup, DataGraph ],
    migrations: [path.join(__dirname, "./migrations/*")],
    subscribers: [],
})
