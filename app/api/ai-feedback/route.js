import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";


export async function POST(req) {
  const { conversation, username, useremail, interview_id } = await req.json();

  const PROMPT = `${JSON.stringify(conversation)}

Based on this feedbacks conversation between the assistant and the user,

Give feedback for the user's feedbacks. Provide a rating out of 10 for:
- Technical Skills
- Communication
- Problem Solving
- Experience

Also, give a summary of the feedbacks in 3 lines and one line to indicate whether the candidate is recommended for hire or not, along with a message.

Respond in the following JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": <number>,
      "communication": <number>,
      "problemSolving": <number>,
      "experience": <number>
    },
    "summary": "<3-line summary>",
    "recommendation": "<Yes or No>",
    "recommendationMsg": "<1-line message>"
  }
}`;

  try {
    const { text: feedback } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: PROMPT,
    });

    // Clean and parse AI output
    const cleaned = feedback.replace(/```json|```/g, "").trim();
    const finalFeedback = JSON.parse(cleaned);


    return Response.json(
      { success: true, feedbackData: finalFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
