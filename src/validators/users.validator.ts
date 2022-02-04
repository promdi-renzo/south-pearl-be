import { Check } from "@mayajs/common";

const updatePass = [Check("password").required().notEmpty().minLength(8).isString()];

export default {
  updatePass,
};
