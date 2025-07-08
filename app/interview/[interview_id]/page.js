"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInterviewByUserId } from "@/lib/actions/auth.action";
import { Clock, Info, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getInterviewById } from "@/lib/actions/auth.action"; // or wherever you put it
import { InterviewDataContext } from "@/context/InterviewDataContext";

const Interview = () => {

  const { interview_id } = useParams();
  const [InterviewData, setInterviewData] = useState(null);
  const [username, setusername] = useState()
  const [loading, setloading] = useState(false)
  const [useremail, setuseremail] = useState()

  const {interviewInfo, setinterviewInfo} = useContext(InterviewDataContext)

  const router = useRouter();

  useEffect(() => {
    async function load() {
      setloading(true);
      if (interview_id) {
        const data = await getInterviewById(interview_id);
        setInterviewData(data);
      }
      setloading(false)
    }
    load();
  }, [interview_id]);

  if (!InterviewData) {
  return <div className="text-center mt-6">Loading interview...</div>;
}


const onJoinInterview = () => {
  setloading(true)
  const newInfo = {
    username: username,
    useremail:useremail,
    interviewData: InterviewData
  };

  setinterviewInfo(newInfo);
  console.log("Interview Info (just set):", newInfo);
  router.push('/interview/'+interview_id+'/start')
};

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="bg-gray-950 px-6 lg:px-20 w-full lg:w-1/3 border rounded-2xl flex flex-col items-center">
        <Image
          src={"/interview.png"}
          width={500}
          height={500}
          alt="interview"
          className="wD[400px]"
        />
        <h3>{InterviewData.role} Interview</h3>

        <h4 className="flex gap-2 items-center">
          <Clock className="h-4 w-4" />
          {InterviewData.duration}
        </h4>

        <div className="mt-4 w-full">
          <h4 className="font-bold">Enter your full name</h4>
          <Input placeholder="e.g. Tony Stark" onChange={(event)=>setusername(event.target.value)} />
        </div>
        <div className="mt-4 w-full">
          <h4 className="font-bold">Enter your email</h4>
          <Input type="email" placeholder="e.g. tony123@gmail.com" onChange={(event)=>setuseremail(event.target.value)} />
        </div>
        <div className="bg-slate-800 p-2 border rounded-lg mt-6 flex gap-2">
          <Info />
          <div>
            <h4 className="">Before You Begin</h4>
            <ul>
              <li>Ensure You have stable Internet Connection</li>
              <li>check yourcamera and microphone</li>
              <li>find a quite place for interview</li>
            </ul>
          </div>
        </div>

        <Button className="flex gap-2 items-center w-full my-6 btn-primary" disabled={loading||!username} onClick={()=>onJoinInterview()}>
          <Video />
          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
