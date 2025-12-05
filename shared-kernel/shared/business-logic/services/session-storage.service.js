import { Storage as StorageHelper } from "@business-logic/shared/helpers";
import { sessionStorage as sessionStorageRepository } from "@business-logic/shared/repositories";

export default new StorageHelper(sessionStorageRepository);
