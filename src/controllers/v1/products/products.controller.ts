import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ProductsServices } from "./products.service"

@Controller()
export class ProductsController {
  constructor(private services: ProductsServices) {}

  @Post()
  async createProducts({ body }: MayaJsContext): Promise<any> {
    // Create a Products
    return { message: "From ProductsController POST route", body };
  }

  @Get()
  async readProducts(): Promise<any> {
    // Read all Products list
    return { message: "From ProductsController GET route" };
  }

  @Get("/:id")
  async readProductsByID({ params }: MayaJsContext): Promise<any> {
    // Read Products by ID from list
    return { message: "From ProductsController GET route with params ID", params };
  }

  @Put("/:id")
  async replaceProducts({ body, params }: MayaJsContext): Promise<any> {
    // Replace Products from list
    return { message: "From ProductsController PUT route", body, params };
  }

  @Patch("/:id")
  async updateProducts({ body, params }: MayaJsContext): Promise<any> {
    // Update Products from list
    return { message: "From ProductsController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteProducts({ params }: MayaJsContext): Promise<any> {
    // Delete Products from list
    return { message: "From ProductsController DELETE route", params };
  }
}
