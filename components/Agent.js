"use client";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect , useState} from "react";

const CallStatus = {
  INACTIVE: "INACTIVE",
  CONNECTING: " CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
};

const Agent = ({ userName, userId, type }) => {
  const router = useRouter();
  const [isSpeaking, setisSpeaking] = useState(false);
  const [callStatus, setcallStatus] = useState(CallStatus.INACTIVE);
  const [messages, setmessages] = useState([]);
  const lastMessage = "hello boys"
  const isCallInactiveOrFinished = true;



  return (
    <div className="flex flex-col gap-4">
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak"></span>}
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
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className="transition-opacity duration-500 animate-fadeIn"
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                (callStatus !== "CONNECTING") && "hidden"
              )}
            />
            <span>
              {isCallInactiveOrFinished
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </div>
  );
};

export default Agent;
