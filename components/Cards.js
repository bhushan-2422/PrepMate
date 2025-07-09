import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
import { getRandomInterviewCover } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import { getFeedbackByInterviewId } from "@/lib/actions/auth.action";

const Cards = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  created_on,
  duration,
}) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({ interview_id: interviewId, userId })
      : null;

  const mixed = type?.length > 1;
  const formattedDate = moment(created_on).format("DD MMM YYYY");

  // Use optional chaining to avoid crash
  const values = feedback?.feedback?.feedback?.rating;
  const prescore = values
    ? values.communication +
      values.experience +
      values.problemSolving +
      values.technicalSkills
    : 0;

  const totalscore = values ? (prescore / 40) * 100 : null;
  const finalassesment = feedback?.feedback?.feedback?.summary;

  return (
    <div className="card-border w-full lg:w-[260px] transition-transform duration-300 hover:scale-105 m-3 lg:m-0">
      <div className="card-interview p-3">
        <div className="flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-green-900">
            <p>{mixed ? "mixed" : type}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} interview</h3>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Image src="/star.svg" alt="score" width={20} height={20} />
              <p>{feedback ? totalscore : "---"}/100</p>
            </div>
            <div className="flex gap-2">
              <Calendar />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <p className="mt-2 text-sm line-clamp-2">
            {feedback
              ? finalassesment
              : "You haven't taken this interview yet! Take it now to improve your confidence."}
          </p>

          <div className="tech-icons flex justify-between mt-4">
            {/* <DisplayTechIcons techstack={techstack}/> */}
            <Button className={feedback? 'btn-primary':'btn-secondary'}>
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? "check feedback" : "Give an interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
