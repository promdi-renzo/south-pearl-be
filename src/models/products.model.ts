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
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    variation: {
      enum: ["S", "M" ,"X"],
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  options
);

schema.plugin(paginate);

export default { name: CONST.model.products, schema };
