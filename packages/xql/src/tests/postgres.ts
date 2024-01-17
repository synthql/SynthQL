import pg from "postgres";

export const sql = pg(process.env.DATABASE_URL!)