import { sessionStorage as sessionStorageClient } from "@business-logic/shared/clients";

class SessionStorage {
  setItem(key, value) {
    sessionStorageClient.setItem(key, value);
  }
  getItem(key) {
    return sessionStorageClient.getItem(key);
  }
  removeItem(key) {
    sessionStorageClient.removeItem(key);
  }
  clear() {
    sessionStorageClient.clear();
  }
}

export default new SessionStorage();
