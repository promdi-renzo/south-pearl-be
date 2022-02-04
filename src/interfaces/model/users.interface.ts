import { Document } from "mongoose";
import { IDateStamps } from "..";

export interface IUsers {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  deleted: boolean;
}

export interface IUsersModel extends IUsers, IDateStamps, Document {
  setPassword: (password: string) => void;
  comparePassword: (password: string) => boolean;
}
