import { Schema } from "mongoose";
import paginate from "mongoose-paginate";
import bcrypt from "bcryptjs";
import env from "../environments";
import CONST from "../constants";

const options = {
  timestamps: {
    createdAt: "DateCreated",
    updatedAt: "DateUpdated",
  },
};

const schema: any = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
      unique: true,
    },
    birthDate: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  options
);

schema.plugin(paginate);

schema.methods.setPassword = function (password: string): void {
  this.password = bcrypt.hashSync(password, env.HASH_ID_SALT);
};

schema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export default { name: CONST.model.users, schema };
