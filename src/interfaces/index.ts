import { MayaJsContext, MayaJsRequest } from "@mayajs/router";
import { Types } from "mongoose";
export * from "./model/users.interface";
export * from "./model/products.interface";

export interface IRoutesResponse<T> {
  status: string | number;
  message: string;
  error: boolean;
  data?: T[];
  meta?: {
    version?: number;
    page?: number;
    total?: number;
    token?: string;
    refresh?: string;
  };
}

export type ASYNC_RESPONSE_DATA<T> = Promise<IRoutesResponse<T>>;
export type ASYNC_RESPONSE = Promise<IRoutesResponse<any>>;

export interface IRequestUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  type: string;
  iat?: string;
  exp?: string;
}

export interface IOTP {
  code: string;
  iat?: string;
  exp?: string;
}

export interface IRequest extends MayaJsRequest {
  user?: IRequestUser;
  url?: any;
}

export interface IContext extends MayaJsContext {
  req: IRequest;
}

export type Methods = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

export interface RouteURL<T> {
  path: T;
  method: Methods;
}

export interface UnguardedRoute {
  path: RegExp | string;
  method: string;
}

export type UnguardedRoutes = UnguardedRoute[];

export interface IDateStamps {
  DateCreated: string;
  DateUpdated: string;
}

export interface ISearchQueryKey {
  [x: string]:
    | string
    | RegExp
    | Date
    | Types.ObjectId
    | Array<{ [key: string]: { $gte: Date } | { $lte: Date } }>
    | { $gte: Date }
    | { $lte: Date };
}
