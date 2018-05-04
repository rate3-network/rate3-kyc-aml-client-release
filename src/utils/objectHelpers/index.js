export const getKeyOfFirstTruthyKvp = (obj) => (obj &&
  Object.keys(obj)
    .find((objKey) => !!obj[objKey]));

export const getKeyOfLastTruthyKvp = (obj) => (obj &&
  Object.keys(obj)
    .reverse()
    .find((objKey) => !!obj[objKey]));
