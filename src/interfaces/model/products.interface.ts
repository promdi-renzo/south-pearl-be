import { Document } from "mongoose";
import { IDateStamps } from "..";

export interface IProducts {
  name: string;
  price: number;
  variation: "S" | "M" | "X";
  deleted: boolean;
}

export interface IProductsModel extends IProducts, IDateStamps, Document {}
