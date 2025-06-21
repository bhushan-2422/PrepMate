import React from "react";
import Cards from "@/components/Cards";
import { dummyInterviews } from "@/constants";

const page = () => {
  return (
    <div className="dark flex justify-center items-center">
      <div className="mx-2 sm:mx-20 p-2 w-3/4 flex flex-col gap-4">
        <h3>Your Interviews</h3>
        <div className="flex gap-4 max-w-[560px] flex-col sm:flex-row">
          {dummyInterviews.map((interviews)=>(
            <Cards {...interviews} key={interviews.id}/>
          ))}
          
        </div>
        <h3>Other Interviews</h3>
        <div className="flex gap-4 max-w-[560px] flex-col sm:flex-row">
          {dummyInterviews.map((interviews)=>(
            <Cards {...interviews} key={interviews.id}/>
          ))}

        </div>
      </div>
    </div>
  );
};

export default page;
