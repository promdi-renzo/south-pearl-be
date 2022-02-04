import { Service } from "@mayajs/core";
import { ISearchQueryKey } from "../interfaces";

@Service()
export class DatabaseServices {
  searchQuery(query: any): { $or: ISearchQueryKey[] } {
    return {
      $or: Object.keys(query)
        .map((key: string) => ({ [key]: query[key] }))
        .filter((e: any) => e !== undefined) as ISearchQueryKey[],
    };
  }

  unselected(): string {
    return `-__v -DateCreated -DateUpdated`;
  }
}
