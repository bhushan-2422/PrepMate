import React from "react";
import Cards from "@/components/Cards";
import { dummyInterviews } from "@/constants";
import Link from "next/link";
import {
  getCurrentUser,
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const page = async () => {
  const user = await getCurrentUser();
  console.log(user);

  if (!user) {
    return <div>User not found. Please login.</div>;
  }

  //by calling both getinterview functions it will cause problem so we will do parallel calling
  //this does fast request

  const [userInterviews, LatestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id),
    getLatestInterviews({ userId: user?.id }),
  ]);

  const haspastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = LatestInterviews?.length > 0;
  return (
    <div className="dark flex flex-col items-center w-full overflow-x-hidden">
      <div className="w-full flex justify-center">
        <div className="p-2 px-4 w-full lg:w-3/4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3>Your Interviews</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {haspastInterviews ? (
              userInterviews.map((interview) => (
                <Cards
                  {...interview}
                  interviewId={interview.id}
                  key={interview.id}
                />
              ))
            ) : (
              <p className="col-span-full text-center">
                You haven't taken any Interview
              </p>
            )}
          </div>

          <h3>Other Interviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {hasUpcomingInterviews ? (
              LatestInterviews?.map((interviews) => (
                <Cards {...interviews} key={interviews.id} />
              ))
            ) : (
              <p className="col-span-full text-center">
                There are no new Interview available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
