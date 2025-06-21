// index.js

// Equivalent of enum MessageTypeEnum in JavaScript
export const MessageTypeEnum = {
  TRANSCRIPT: "transcript",
  FUNCTION_CALL: "function-call",
  FUNCTION_CALL_RESULT: "function-call-result",
  ADD_MESSAGE: "add-message",
};

// Equivalent of enum MessageRoleEnum in JavaScript
export const MessageRoleEnum = {
  USER: "user",
  SYSTEM: "system",
  ASSISTANT: "assistant",
};

// Equivalent of enum TranscriptMessageTypeEnum in JavaScript
export const TranscriptMessageTypeEnum = {
  PARTIAL: "partial",
  FINAL: "final",
};

// BaseMessage (abstract structure)
/**
 * @typedef {Object} BaseMessage
 * @property {string} type - One of MessageTypeEnum values
 */

// TranscriptMessage
/**
 * @typedef {Object} TranscriptMessage
 * @property {string} type - MessageTypeEnum.TRANSCRIPT
 * @property {string} role - One of MessageRoleEnum
 * @property {string} transcriptType - One of TranscriptMessageTypeEnum
 * @property {string} transcript
 */

// FunctionCallMessage
/**
 * @typedef {Object} FunctionCallMessage
 * @property {string} type - MessageTypeEnum.FUNCTION_CALL
 * @property {{ name: string, parameters: any }} functionCall
 */

// FunctionCallResultMessage
/**
 * @typedef {Object} FunctionCallResultMessage
 * @property {string} type - MessageTypeEnum.FUNCTION_CALL_RESULT
 * @property {{ forwardToClientEnabled?: boolean, result: any, [key: string]: any }} functionCallResult
 */

// Union Type: Message
/**
 * Message can be one of:
 * - TranscriptMessage
 * - FunctionCallMessage
 * - FunctionCallResultMessage
 */
