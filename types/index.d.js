// index.js

// This file previously defined interfaces for types used across the app.
// In JavaScript, we can't enforce types directly, but we can define JSDoc comments
// for documentation and code intelligence (optional).

/**
 * Feedback Object Example
 * {
 *   id: "string",
 *   interviewId: "string",
 *   totalScore: number,
 *   categoryScores: [{ name: "string", score: number, comment: "string" }],
 *   strengths: ["string"],
 *   areasForImprovement: ["string"],
 *   finalAssessment: "string",
 *   createdAt: "string"
 * }
 */

/**
 * Interview Object Example
 * {
 *   id: "string",
 *   role: "string",
 *   level: "string",
 *   questions: ["string"],
 *   techstack: ["string"],
 *   createdAt: "string",
 *   userId: "string",
 *   type: "string",
 *   finalized: boolean
 * }
 */

/**
 * CreateFeedbackParams Example
 * {
 *   interviewId: "string",
 *   userId: "string",
 *   transcript: [{ role: "string", content: "string" }],
 *   feedbackId?: "string"
 * }
 */

/**
 * User Object Example
 * {
 *   name: "string",
 *   email: "string",
 *   id: "string"
 * }
 */

/**
 * InterviewCardProps Example
 * {
 *   interviewId?: "string",
 *   userId?: "string",
 *   role: "string",
 *   type: "string",
 *   techstack: ["string"],
 *   createdAt?: "string"
 * }
 */

/**
 * AgentProps Example
 * {
 *   userName: "string",
 *   userId?: "string",
 *   interviewId?: "string",
 *   feedbackId?: "string",
 *   type: "generate" | "interview",
 *   questions?: ["string"]
 * }
 */

/**
 * RouteParams Example
 * {
 *   params: Promise<{ [key: string]: string }>,
 *   searchParams: Promise<{ [key: string]: string }>
 * }
 */

/**
 * GetFeedbackByInterviewIdParams Example
 * {
 *   interviewId: "string",
 *   userId: "string"
 * }
 */

/**
 * GetLatestInterviewsParams Example
 * {
 *   userId: "string",
 *   limit?: number
 * }
 */

/**
 * SignInParams Example
 * {
 *   email: "string",
 *   idToken: "string"
 * }
 */

/**
 * SignUpParams Example
 * {
 *   uid: "string",
 *   name: "string",
 *   email: "string",
 *   password: "string"
 * }
 */

/**
 * FormType = "sign-in" or "sign-up"
 */

/**
 * InterviewFormProps Example
 * {
 *   interviewId: "string",
 *   role: "string",
 *   level: "string",
 *   type: "string",
 *   techstack: ["string"],
 *   amount: number
 * }
 */

/**
 * TechIconProps Example
 * {
 *   techStack: ["string"]
 * }
 */

// Since JavaScript doesn't enforce these interfaces, you can use them as guidelines
// or validate with libraries like PropTypes, Joi, or Zod (for runtime validation).
