import { ENV } from "@config/env";

import { Sequelize } from "sequelize";
import { log } from "console";

const LogQuery = false;

const sequelize = new Sequelize({
  dialect: "mysql",

  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  database: ENV.DATABASE_NAME,
  password: ENV.DATABASE_PASSWORD,
  username: ENV.DATABASE_USER,
  timezone: "+06:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: ENV.NODE_ENV === "development",
  logging:
    ENV.NODE_ENV === "development" && LogQuery
      ? (query, time) => {
          log("\n ☢ " + time + "ms:" + " " + query);
        }
      : false,
  benchmark: LogQuery,
});

sequelize.authenticate();


export const db = {
  sequelize,

} as const;
