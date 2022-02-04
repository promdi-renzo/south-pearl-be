import { Document } from "mongoose";
import { IDateStamps } from "..";

export interface IProducts {
  name: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  deleted: boolean;
}

export interface IProductsModel extends IProducts, IDateStamps, Document {}
