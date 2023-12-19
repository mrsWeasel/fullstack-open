import { Gender } from "../types";

export const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`${param} is not a string`);
  }
  return param;
};

export const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error(`${param} is not a valid gender`);
  }
  return param;
};
