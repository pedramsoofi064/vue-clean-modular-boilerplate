import { Storage as StorageHelper } from "@business-logic/shared/helpers";
import { localStorage as localStorageRepository } from "@business-logic/shared/repositories";

export default new StorageHelper(localStorageRepository);
