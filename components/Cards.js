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
} from "@/components/ui/dropdown-menu"

const Cards = ({ interviewId, userId, role, type, techstack }) => {
  const feedback = null;
  const mixed = type?.length > 1;
  return (
    <div className="card-border w-{360px} w-full lg:w-[260px]">
      <div className="card-interview p-3">
        <div className="flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-green-900">
            <p>{mixed? "mixed": type}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} interview</h3>
          <div className="flex gap-2">

            <Image src="/star.svg" alt="score" width={20} height={20} />
            
            <p>{feedback ? totalscore : "---"}/100</p>
          </div>
          <p>
            {feedback
              ? finalassesment
              : "you havent taken this interview yet! Take it now to improve your confidence"}
          </p>

          <div className="tech-icons flex justify-between mt-4">

            {/* <DisplayTechIcons techstack={techstack}/> */}
            <Button className="btn-primary">
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >{feedback?"check feedback":"Give an interview"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
