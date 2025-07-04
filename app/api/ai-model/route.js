import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function POST(request) {
  const { jobPosition, jobDescription, duration, type, userId } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
      The job role is ${jobPosition}.
      The job description is ${jobDescription}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions should be such that it matches the duration of ${duration}.
      Please return only the questions, without any additional text.
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this:
      [
        {
         question: '',
         type: 'Technical/behavioral/experience/problem solving/leadership'
        },
        {...}
      ]
      Thank you! ❤️`,
    });

    // Clean and parse AI output
    const cleaned = questions.replace(/```json|```/g, "").trim();
    const parsedQuestions = JSON.parse(cleaned);

    // Create document
    const interview = {
      created_on: new Date(),
      role: jobPosition,
      type: type,
      duration: duration,
      questions: parsedQuestions,
      userId: userId,
      finalized: true,
    };

    // Add to Firestore and get ID
    const docRef = await db.collection("interviews").add(interview);
    await docRef.update({ id: docRef.id });

    return Response.json(
      { success: true, prompt: parsedQuestions, Interview_Id: docRef.id },
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
