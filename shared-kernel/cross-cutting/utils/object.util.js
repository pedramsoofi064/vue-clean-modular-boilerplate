export const navigateObject = (object, path) => {
  let refHolder = "";
  let key = "";

  const sanitizedPath = path.trim().split(".");

  sanitizedPath.reduce((reference, pathKey) => {
    refHolder = reference;
    key = pathKey;

    return reference?.[pathKey];
  }, object);

  return [refHolder, key];
};

export const getValueByPath = (object, path) => {
  const [reference, key] = navigateObject(object, path);

  return reference?.[key];
};

export const toFormData = (object) => {
  const formData = new FormData();

  for (const key in object) {
    const data = Array.isArray(object[key]) ? JSON.stringify(object[key]) : object[key];
    formData.append(key, data);
  }

  return formData;
};

export const getDifference = (reference, compare) => {
  const difference = {};

  const compareObjects = (reference, compare, difference) => {
    for (const key in reference) {
      if (Array.isArray(reference[key]) && JSON.stringify(reference[key]) !== JSON.stringify(compare[key])) {
        difference[key] = compare[key];
      } else if (typeof reference[key] === "object" && reference[key] != null) {
        difference[key] = {};
        compareObjects(reference[key] || {}, compare[key], difference[key]);

        if (Object.keys(difference[key]).length === 0) {
          delete difference[key];
        }
      } else if (reference[key] !== compare[key] && (reference[key] || compare[key])) {
        difference[key] = compare[key];
      }
    }
  };

  compareObjects(reference, compare, difference);

  return difference;
};

export const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const isObject = (value) => value && typeof value === "object";
