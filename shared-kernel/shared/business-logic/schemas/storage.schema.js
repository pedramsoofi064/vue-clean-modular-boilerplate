import { string, number, boolean, object } from "yup";

const keySchema = string().required();

const optionsSchema = object({
  secure: boolean().default(false),
  ttl: number().default(0),
});

export { keySchema, optionsSchema };
