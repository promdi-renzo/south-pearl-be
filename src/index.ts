import { configServer } from "@mayajs/core";
import { AppModule } from "./app.module";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

configServer(3333)
  .usePlugins([cors(), morgan("dev") as any, bodyParser.json(), bodyParser.urlencoded({ extended: false })])
  .bootstrapModule(AppModule);
