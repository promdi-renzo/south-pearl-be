import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { UsersServices } from "./users.service";
import { ASYNC_RESPONSE, IContext } from "../../../interfaces";
import { createToken, verifyToken } from "../../../middlewares";
import env from "../../../environments";
import { UtilsServices } from "../../../services/utils.service";

@Controller()
export class UsersController {
  constructor(private services: UsersServices, private utils: UtilsServices) {}

  @Get({ path: "/", middlewares: [] })
  async getAll({ query, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.getAll(query);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Get({ path: "/search", middlewares: [] })
  async search({ query, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.search(query);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Get({ path: "/:id", middlewares: [] })
  async getById({ params, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.getById(params.id);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Post({ path: "/", middlewares: [] })
  async create({ body, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.create(body);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Delete({ path: "/:id", middlewares: [] })
  async delete({ params, req }: IContext): ASYNC_RESPONSE {
    const result = await this.services.delete(params.id);
    return { ...result, meta: { ...result.meta, token: createToken(req.user) } };
  }

  @Post({ path: "/token/validate", middlewares: [] })
  async auth({ req }: IContext): ASYNC_RESPONSE {
    const callback = () => {
      const { iat, exp, ...data } = verifyToken(req.body.token, env.JWT_KEY);
      return { status: 200, error: false, message: "Token is successfully refresh.", meta: { token: createToken(data) } };
    };

    return this.utils.errorHandler(callback, "Malformed token. Cannot refresh token.");
  }
}
