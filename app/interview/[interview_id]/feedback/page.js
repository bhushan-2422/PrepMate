import FeedbackPage from "@/components/FeedbackDisplay";
import {
  getCurrentUser,
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }) => {
const { interview_id } = params; // ✅ Correct

  const user = await getCurrentUser();
  const interview = await getInterviewById(interview_id);

  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interview_id: interview_id,
    userId: user?.id,
  });

  const feedbackRes = feedback?.feedback?.feedback;

  return (
    <div>
      <FeedbackPage feedback={feedbackRes}/>
    </div>
  );
};

export default Page;
