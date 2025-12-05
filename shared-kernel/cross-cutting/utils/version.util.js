import { version, name } from "@root/package.json";

export const logVersion = () => {
  console.log("name: " + name);
  console.log("version: " + version);
};
