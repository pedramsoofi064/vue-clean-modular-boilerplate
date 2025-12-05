export const compareArray = (a, b) => JSON.stringify(a.toSorted()) === JSON.stringify(b.toSorted());

export const findById = (items = [], id, idKey = "id") => items.find((item) => item[idKey] === id);
