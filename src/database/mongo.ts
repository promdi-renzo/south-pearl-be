import env from "../environments";
import { users } from "../models";

export const mongoOptions = {
  connectionString: env.MONGO_CONNECTION_URL,
  name: env.MONGO_CONNECTION_NAME,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  schemas: [users],
};
