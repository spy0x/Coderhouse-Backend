type ErrorTypes = {
  UNKNOWN_ERROR: number;
  PRODUCT_MISSING_PROPERTIES: number;
  PRODUCT_ALREADY_EXISTS: number;
};

const EErrors: ErrorTypes = {
  UNKNOWN_ERROR: 1,
  PRODUCT_MISSING_PROPERTIES: 2,
  PRODUCT_ALREADY_EXISTS: 3,
};
export default EErrors;