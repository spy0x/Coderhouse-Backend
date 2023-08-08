
export default class CustomError {
  static createError(errorSettings: ErrorCustom) {
    const error = new Error(errorSettings.message);
    error.name = errorSettings.name || 'Error';
    error.code = errorSettings.code || 1;
    error.cause = errorSettings.cause || '';
    error.status = errorSettings.status || 500;
    throw error;
  }
}