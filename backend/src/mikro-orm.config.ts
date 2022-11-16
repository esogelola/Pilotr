import { __prod__ } from "./constants";
import { Company } from "./entities/Company";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },

  dbName: "pilotr",
  user: "postgres",
  password: "postgres",
  clientUrl: "postgresql://postgres:postgres@db:5432",
  entities: [Company],
  type: "postgresql",

  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
