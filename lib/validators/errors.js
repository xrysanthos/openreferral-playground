/**
 * Custom error classes.
 *
 * @author Chris Spilio
 */


/**
 * UnsupportedValidatorError
 */
function UnsupportedValidatorError(message) {
  this.name = 'UnsupportedValidatorError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
UnsupportedValidatorError.prototype = Object.create(Error.prototype);
UnsupportedValidatorError.prototype.constructor = UnsupportedValidatorError;


/**
 * DataValidationError
 */
function DataValidationError(row, errors) {
  this.name = 'DataValidationError';
  this.row = row;
  this.errors = errors;
  this.message = 'Data validation error';
  this.stack = (new Error()).stack;
}
DataValidationError.prototype = Object.create(Error.prototype);
DataValidationError.prototype.constructor = DataValidationError;


/*
 * Exports
 */
export {UnsupportedValidatorError, DataValidationError};
