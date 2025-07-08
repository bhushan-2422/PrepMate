"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Vapi from "@vapi-ai/web";
import AlertConfirm from "./_components/AlertConfirm";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";

const StartInterview = () => {
  const { interview_id } = useParams();
  const [isSpeaking, setisSpeaking] = useState(true);
  const { interviewInfo, setinterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
  const [activeUser, setactiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const [userId, setuserId] = useState();
  const router = useRouter();

  useEffect(() => {
    startCall();
  }, [interviewInfo]);

  //access user
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.id) {
        setuserId(user.id)

      }
    };

    fetchUser();
  }, []);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questions.forEach(
      (item, index) => (questionList = item?.question + "," + questionList)
    );

    const assistantOptions = {
      name: "Interviewer",
      firstMessage:
        "Hi " +
        interviewInfo?.username +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.role +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
      },
      voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates the provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Example: "Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.role +
              ` interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding.
Keep the questions clear and concise.

Below are the questions. Ask one by one:
Questions: ` +
              questionList +
              `

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer.
Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like:
"Alright, next up..." or "Let's tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level
- Ensure the interview remains focused on React
        `,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
    console.log("stop...");
    generateFeedback();
  };

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("message:", message);

      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("conversation string:", convoString);
        setConversation(convoString);
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", () => {
      console.log("call has started");
      toast("call connected...");
    });
    vapi.on("speech-start", () => {
      console.log("assistant speech has started");
      setactiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("assistant speech has ended");
      setactiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("call has ended");
      toast("call has ended");
      generateFeedback();
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("end"));
      vapi.off("speech-start", () => console.log("end"));
      vapi.off("call-end", () => console.log("end"));
      vapi.off("speech-end", () => console.log("end"));
    };
  }, []);

  const generateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
      username: interviewInfo?.username,
      useremail: interviewInfo?.useremail,
      interview_id: interview_id,
      userId : userId
    });

    console.log("result:", result.data.feedbackData);
    router.replace("/interview/" + interview_id + "/completed");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex justify-between w-full lg:w-3/4 px-6">
        <h3>Ai Interview Session</h3>
        <span className="flex items-center">
          <Timer /> 00:00:00
        </span>
      </div>
      <div className="call-view w-full lg:w-3/4">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {activeUser ? "" : <span className="animate-speak"></span>}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border ">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user image"
              height={540}
              width={540}
              className="object-cover rounded-full size-[120px]"
            />
            {activeUser && <span className="animate-speak"></span>}

            <h3>{interviewInfo?.username}</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Mic className="h-12 w-12 p-3 rounded-full bg-slate-700 cursor-pointer hover:bg-slate-500" />
        <AlertConfirm stopInterview={() => stopInterview()}>
          <Phone className="h-12 w-12 p-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" />
        </AlertConfirm>
      </div>
    </div>
  );
};

export default StartInterview;
