import { Module, AuthTokenModule } from "@mayajs/core";
import { RouterModule } from "@mayajs/router";
import { routes } from "./app.routing.module";
import { AppController } from "./app.controller";
import { MongoDbModule } from "@mayajs/mongo";
import { mongoOptions } from "./database/mongo";
import { DatabaseServices, UtilsServices } from "./services";
import env from "./environments";

@Module({
  declarations: [AppController],
  imports: [
    MongoDbModule.forRoot(mongoOptions),
    RouterModule.forRoot(routes),
    AuthTokenModule.forRoot(
      [
        { path: "/", method: "GET" },
        { path: /api\/v1\/users\/*/, method: "GET" },
        { path: /api\/v1\/users\/*/, method: "POST" },
        { path: /api\/v1\/users\/*/, method: "PATCH" },
        { path: /api\/v1\/users\/*/, method: "DELETE" },
      ],
      env.JWT_KEY
    ),
  ],
  providers: [DatabaseServices, UtilsServices],
  bootstrap: AppController,
})
export class AppModule {}
