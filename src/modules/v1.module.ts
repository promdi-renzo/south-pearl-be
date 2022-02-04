import { Module } from "@mayajs/core";
import { Route, RouterModule } from "@mayajs/router";
import { UsersController, UsersServices } from "../controllers/v1";

const routes: Route[] = [
  {
    path: "users",
    controller: UsersController,
  },
];

@Module({
  declarations: [UsersController],
  imports: [RouterModule.forRoot(routes)],
  providers: [UsersServices],
})
export class V1Module {}
