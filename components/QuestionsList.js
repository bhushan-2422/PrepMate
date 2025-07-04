import React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "./Loader";
import axios from "axios";
import { Button } from "./ui/button";

const QuestionsList = ({ questionList, loading,onFinish }) => {

  // const [loading, setloading] = useState(true);
  // const [questionList, setquestionList] = useState();
  
  // useEffect(() => {
  //   if (formdata) {
  //     GenerateQuestionList();
  //   }
  // }, [formdata]);

  // const GenerateQuestionList = async () => {
  //   setloading(true);
  //   //axios is a http client libraryused to make an api call
  //   try {
  //     const result = await axios.post("/api/ai-model", {
  //       ...formdata,
  //     });


  //     const Content = result.data.prompt; // already parsed
  //     setquestionList(Content);
      
  //     console.log(result.data.prompt);
  //     setloading(false);
  //   } catch (e) {
  //     toast("server error, try again");
  //     console.error("Error in GenerateQuestionList", e);

  //     setloading(false);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {loading && <Loader type="generate" />}
      {!loading && questionList && (
        <div className="w-full h-full">
          <div className="flex justify-end mt-4">
            <Button className="btn-primary" onClick={()=>onFinish()}>Generate Interview</Button>
          </div>
          <div
          className="w-full space-y-4 h-full px-2 my-4 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {questionList.map((q, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <p className="font-semibold">
                {index + 1}. {q.question}
              </p>
              <p className="text-sm text-gray-500">Type: {q.type}</p>
            </div>
          ))}
        </div>
        </div>
        
      )}
    </div>
  );
};

export default QuestionsList;
