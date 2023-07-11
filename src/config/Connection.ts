import dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  DB_TYPE,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_PORT = 5432,
  JWT_SECRET,
} = process.env;
