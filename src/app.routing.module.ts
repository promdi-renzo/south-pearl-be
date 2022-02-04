import { Route } from "@mayajs/router";

export const routes: Route[] = [
  {
    path: "api",
    children: [
      {
        path: "v1",
        loadChildren: () => import("./modules/v1.module").then((m) => m.V1Module),
      },
    ],
  },
];
