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

  const maxCardsToShow = 4; // Adjust how many cards you want in 1 row

  return (
    <div className="dark flex flex-col items-center w-screen">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Prep with <span className="text-green-400">Precision</span>.
              Perform with <span className="text-green-400">Confidence</span>.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Practice job interviews with an AI voice agent that gives
              real-time feedback to boost your confidence.
            </p>
            <Link
              href="/Create-interview"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <a
              href="/Create-interview"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Create new Interview
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/robot.png" alt="mockup" />
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center">
        <div className="p-2 px-4 w-full lg:w-3/4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3>Your Interviews</h3>
            {haspastInterviews && (
              <Link href="/all-interviews">
                <Button className="btn-primary">
                  View all <ArrowRight />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex gap-4 w-full flex-wrap justify-center">
            {haspastInterviews ? (
              userInterviews
                .slice(0, maxCardsToShow)
                .map((interview) => (
                  <Cards
                    {...interview}
                    interviewId={interview.id}
                    key={interview.id}
                  />
                ))
            ) : (
              <p>You haven't taken any Interview</p>
            )}
          </div>
          <h3>Other Interviews</h3>
          <div className="flex gap-4 w-full flex-wrap">
            {hasUpcomingInterviews ? (
              LatestInterviews?.map((interviews) => (
                <Cards {...interviews} key={interviews.id} />
              ))
            ) : (
              <p>There are no new Interview available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
