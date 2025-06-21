import Agent from "@/components/Agent";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col gap-3 sm:w-3/4">
        <h3>Interview Generation</h3>
        <Agent username="you" userId="user1" type="generate" />
      </div>
    </div>
  );
};

export default page;
