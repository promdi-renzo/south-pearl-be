import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";

@Controller()
export class AppController {
  @Get()
  async readApp(): Promise<any> {
    // Read all App list
    return { message: "Hello South Pearl" };
  }
}
