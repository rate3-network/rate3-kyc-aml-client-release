export const convertFromZeroDecimalRepresentation = (zeroDecimalValue, decimalPlaces) =>
  parseInt((zeroDecimalValue / (10 ** decimalPlaces)).toFixed(0), 10);

export const roundToMaxDecimalPlaces = (value, decimalPlaces) =>
  (Math.round(value * (10 ** decimalPlaces)) / (10 ** decimalPlaces));
