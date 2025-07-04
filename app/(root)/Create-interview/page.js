'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { useState ,useEffect} from 'react'
import InterviewForm from '@/components/InterviewForm'
import QuestionsList from '@/components/QuestionsList'
import { toast } from 'sonner'
import { getCurrentUser } from '@/lib/actions/auth.action'
import axios from "axios";
import InterviewLink from '@/components/InterviewLink'


const page = () => {

  const [step, setstep] = useState(1);  //<--------------------------
  const [formdata, setformdata] = useState({})
  const [loading, setloading] = useState(false);
  const [questionList, setquestionList] = useState();
  const [interviewId, setinterviewId] = useState()

  const onHandleInputChange =(field , value)=>{
    setformdata(prev=>({
      ...prev,
      [field]:value,
    }))
  }

  useEffect(() => {
  const fetchUser = async () => {
    const user = await getCurrentUser();
    if (user?.id) {
      setformdata(prev => ({
        ...prev,
        userId: user.id, // or any other user info you want
      }));
    }
  };

  fetchUser();
}, []);

const GenerateQuestionList = async () => {
    setloading(true);
    //axios is a http client libraryused to make an api call
    try {
      const result = await axios.post("/api/ai-model", {
        ...formdata,
      });


      const Content = result.data.prompt; // already parsed
      const Interview_Id = result.data.Interview_Id;
      setinterviewId(Interview_Id);
      setquestionList(Content);


      
      console.log(result.data.prompt);
      setloading(false);
    } catch (e) {
      toast("server error, try again");
      console.error("Error in GenerateQuestionList", e);

      setloading(false);
    }
  };




  const onGoToNext = async () => {
  if (!formdata?.jobPosition || !formdata?.jobDescription || !formdata?.duration || !formdata?.type) {
    toast('Please Enter All Details');
    return;
  }
  setstep(step + 1);            // ✅ Then move to step 2
  await GenerateQuestionList(); // ✅ First generate questions
};

const onFinish=()=>{
  setstep(step+1);
}

  return (
    <div className='flex flex-col items-center h-[580px]'>
      <div className='w-full bg-black sm:w-3/4 p-2 border rounded-2xl h-full'>
        <h3>Create Interview</h3>
        <Progress value={step *33.33} className="" />

        {step==1?<InterviewForm onHandleInputChange={onHandleInputChange} GoToNext={()=>onGoToNext()}/>
        :step==2?<QuestionsList questionList={questionList} loading={loading} onFinish={()=>onFinish()}/>
      :step==3?<InterviewLink interviewId={interviewId} formdata={formdata}/>:null}
      </div>
      
    </div>
  )
}

export default page




//************************* questions are not visible on the page **********************\\
