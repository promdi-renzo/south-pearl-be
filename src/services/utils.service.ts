import { Service } from "@mayajs/core";
import { IRoutesResponse } from "../interfaces";

@Service()
export class UtilsServices {
  async errorHandler<T>(
    callback: () => Promise<IRoutesResponse<T>> | IRoutesResponse<T>,
    message: string,
    status = 401
  ): Promise<IRoutesResponse<T>> {
    try {
      return await callback();
    } catch (err) {
      const error = err as Error;
      return {
        status,
        message: error.message ? error.message : message,
        error: true,
      };
    }
  }
}
