import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";
import { PaginateModel } from "mongoose";
import { DatabaseServices } from "../../../services";
import { IProductsModel, ASYNC_RESPONSE } from "../../../interfaces";
import env from "../../../environments";
import CONST from "../../../constants";

@Service()
export class ProductsServices {
  constructor(private mongo: MongoDbServices, private database: DatabaseServices) {}

get model(): PaginateModel<IProductsModel> {
    const db = this.mongo.database(env.MONGO_CONNECTION_NAME);
    return <any>db.instance.model(CONST.model.products);
  }

  async getAll({ page = 1, limit = 50 }: any): ASYNC_RESPONSE {
    const limitNum = parseInt(limit, 0);
    const pageNum = parseInt(page, 0);
    const result = await this.model.find({ deleted: false }, this.database.unselected(), {
      limit: limitNum,
      skip: limitNum * (pageNum - 1),
    });
    return {
      status: "success",
      error: false,
      message: "Successfuly get all Products.",
      data: result,
      meta: { page: pageNum, total: result.length },
    };
  }

  async getById(id: string): ASYNC_RESPONSE {
    const result = await this.model.findOne({ _id: id, deleted: false });
    if (!result) return { status: "success", error: false, message: "Tag not found!" };
    return { status: "success", error: false, message: "Successfuly get Products.", data: [result] };
  }

  async create(body: any): ASYNC_RESPONSE {
    const result = await this.model.create(body);
    return { status: "success", error: false, message: "Successfuly created Products.", data: [result] };
  }

  async update(id: string, body: any): ASYNC_RESPONSE {
    const result = await this.model.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!result) return { status: "success", error: false, message: "Tag not found!" };
    return { status: "success", error: false, message: "Successfuly updated Products.", data: [result] };
  }

  async delete(id: string): ASYNC_RESPONSE {
    const result = await this.model.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    if (!result) return { status: "success", error: false, message: "Tag not found!" };
    return { status: "success", error: false, message: "Successfuly deleted tag.", data: [result] };
  }
}