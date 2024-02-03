import { OPERATION_FAILED_TEXT } from "../constants/stringConstants.js";

export default class OperationError extends Error {
  constructor(message) {
    super(message);
    this.message = OPERATION_FAILED_TEXT;
    this.stack = 0;
    this.name = 'OperationError';
  }
}