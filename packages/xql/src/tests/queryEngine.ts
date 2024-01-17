import { DB } from "./db";
import { QueryEngine } from "../QueryEngine/QueryEngine";
import dotenv from "dotenv";

dotenv.config();

export const queryEngine = new QueryEngine<DB>({
    url: process.env.DATABASE_URL!,
    schema: 'public'
})