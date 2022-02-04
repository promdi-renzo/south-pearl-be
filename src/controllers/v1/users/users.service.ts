import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";
import { PaginateModel } from "mongoose";
import { DatabaseServices } from "../../../services";
import { ASYNC_RESPONSE, IUsersModel } from "../../../interfaces";
import env from "../../../environments";
import CONST from "../../../constants";
import mongoose from "mongoose";

@Service()
export class UsersServices {
  constructor(private mongo: MongoDbServices, private database: DatabaseServices) {}

  get model(): PaginateModel<IUsersModel> {
    const db = this.mongo.database(env.MONGO_CONNECTION_NAME);
    return <any>db.instance.model(CONST.model.users);
  }

  get db(): mongoose.Mongoose {
    const db = this.mongo.database(env.MONGO_CONNECTION_NAME);
    return db.instance;
  }

  async search({ page = 1, limit = 50, ...query }: any): ASYNC_RESPONSE {
    const limitNum = parseInt(limit, 0);
    const pageNum = parseInt(page, 0);
    const options = { limit: limitNum, skip: limitNum * (pageNum - 1) };
    const result = await this.model.find(
      {
        ...this.database.searchQuery(query),
        deleted: false,
      },
      this.database.unselected(),
      options
    );
    return {
      status: "success",
      error: false,
      message: "Successfully search users.",
      data: result,
      meta: { page: pageNum, total: result.length },
    };
  }

  async getById(id: string): ASYNC_RESPONSE {
    const result = await this.model.findOne({ _id: id, deleted: false }, "-password");
    if (!result) return { status: "success", error: false, message: "User not found!" };
    return { status: "success", error: false, message: "Successfuly get user.", data: [result] };
  }

  async getAll({ page = 1, limit = 50 }: any): ASYNC_RESPONSE {
    const limitNum = parseInt(limit, 0);
    const pageNum = parseInt(page, 0);
    const result = await this.model.find({ deleted: false }, "-password", {
      limit: limitNum,
      skip: limitNum * (pageNum - 1),
    });
    return {
      status: "success",
      error: false,
      message: "Successfuly get all users.",
      data: result,
      meta: { page: pageNum, total: result.length },
    };
  }

  async create(body: any): ASYNC_RESPONSE {
    const { password } = body;
    const session = await mongoose.startSession();
    let user: IUsersModel | null;
    let result: any;

    await session
      .withTransaction(async () => {
        user = await this.model.create(body);
      })
      .then(async () => {
        user?.setPassword(password);
        user?.save();
        result = {
          status: "success",
          error: false,
          message: `Successfuly added user`,
          data: [user],
        };
      })
      .catch((err) => {
        const error = err as any;
        result = { status: "error", message: error.errmsg ? error.errmsg : error.toString(), error: true };
      });

    session.endSession();
    return result;
  }

  async delete(id: string): ASYNC_RESPONSE {
    const result = await this.model.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    if (!result) return { status: "success", error: false, message: "User not found!" };
    return { status: "success", error: false, message: "Successfully deleted user.", data: [result] };
  }
}
