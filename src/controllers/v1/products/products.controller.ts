import { Get, Patch, Post, Delete } from "@mayajs/common";
import { Controller } from "@mayajs/core";
import { IContext, ASYNC_RESPONSE } from "../../../interfaces";
import { createToken } from "../../../middlewares";
import { ProductsServices } from "./products.service";


@Controller()
export class ProductsController {
  constructor(private services: ProductsServices) {}

  @Get()
  async getAll({ query, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.getAll(query);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Get("/:id")
  async getById({ params, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.getById(params.id);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Post()
  async create({ body, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.create(body);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Patch({ path: "/:id", })
  async update({ params, body, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.update(params.id, body);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Delete("/:id")
  async delete({ params, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.delete(params.id);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }
  
}
