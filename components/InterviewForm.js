import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const InterviewForm = ({ onHandleInputChange, GoToNext }) => {
  const [interviewType, setinterviewType] = useState([]);

  const InterviewType = [
    {
      title: "Technical",
    },
    {
      title: "Behavioral",
    },
    {
      title: "Experience",
    },
    {
      title: "Problem Solving",
    },
  ];

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType=(type)=>{
    const data = interviewType.includes(type)
    if(!data){
        setinterviewType((prev) => [...prev, type])
    }else{
        const result = interviewType.filter(item=>item!=type);
        setinterviewType(result)
    }
  }

  return (
    <div className="m-4 flex flex-col">
      <div className="mt-5">
        <h4>Job position</h4>
        <Input
          placeholder="e.g full stack developer"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h4>Job Description</h4>
        <Textarea
          placeholder="Enter detailed job description"
          className="h-32"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>
      <div className="mt-5 w-1/2">
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5min">5 min</SelectItem>
            <SelectItem value="15min">15 min</SelectItem>
            <SelectItem value="30min">30 min</SelectItem>
            <SelectItem value="45min">45 min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h3>Interview Type</h3>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => {
            return <div
              key={index}
              className={`flex items-center cursor-pointer gap-2 p-1 px-4 bg-gray-800 border
                 border-violet-500 rounded-2xl
                 ${interviewType.includes(type.title) && 'bg-violet-700'}`}
              onClick={() => AddInterviewType(type.title)}
            >
              <span>{type.title}</span>
            </div>;
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-end" >
        <Button className="btn-primary" onClick={()=>GoToNext()}>Generate Questions</Button>
      </div>
    </div>
  );
};

export default InterviewForm;
