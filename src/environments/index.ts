import { config } from "dotenv";
config();

export default {
  PORT: Number(process.env.PORT) || 3333,
  MONGO_CONNECTION_URL:
    process.env.MONGO_CONNECTION_URL || "mongodb://127.0.0.1:27017/",
  MONGO_CONNECTION_NAME: process.env.MONGO_CONNECTION_NAME || "southpearl",
  JWT_KEY: process.env.JWT_KEY || "JWT_KEY_NOT_DEFINED",
  HASH_ID_SALT: Number(process.env.HASH_ID_SALT) || "HASH_ID_SALT_NOT_DEFINED",
};
