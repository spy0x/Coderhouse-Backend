type ErrorTypes = {
  UNKNOWN_ERROR: 1;
  PRODUCT_MISSING_PROPERTIES: 2;
  PRODUCT_ALREADY_EXISTS: 3;
};

const EErrors: ErrorTypes = {
  UNKNOWN_ERROR: 1,
  PRODUCT_MISSING_PROPERTIES: 2,
  PRODUCT_ALREADY_EXISTS: 3,
} as const;
export default EErrors;