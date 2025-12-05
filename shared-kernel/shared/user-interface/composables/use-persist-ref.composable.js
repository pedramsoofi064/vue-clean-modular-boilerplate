import sessionStorage from "@business-logic/shared/services/session-storage.service";

const validateValueType = (value, type) => {
  if (!(new type(value) instanceof type)) throw new Error("value must be instance of type");
};
const validateKey = (key) => {
  if (!key || !isString(key)) throw new Error("key is required and it must be a string");
};

const toGetValue = ({ storage, key, type, initialValue }) => {
  const value = type(storage.getItem(key));

  if (type === Boolean) return value;

  return value || type(initialValue);
};

export const usePersistRef = ({ storage = sessionStorage, key, initialValue, type = String }) => {
  validateKey(key);
  validateValueType(initialValue, type);

  return customRef((track, trigger) => {
    return {
      get() {
        track();

        return toGetValue({
          storage,
          key,
          type,
          initialValue,
        });
      },
      set(newValue) {
        validateValueType(newValue, type);

        storage.setItem(key, type(newValue));

        trigger();
      },
    };
  });
};
