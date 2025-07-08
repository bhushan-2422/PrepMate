import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, Clock, List, Mail, Send } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const InterviewLink = ({interviewId, formdata}) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interviewId;

  const GetInterviewUrl =()=>{
    return url;
  }
  const onCopyLink = async()=>{
    await navigator.clipboard.writeText(url)
    toast("link copied")
  }
  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='flex flex-col items-center mt-4'>
        <Image src={'/check.png'} height={200} width={200} alt='check' className='h-[70px] w-[70px]'/>
        <h3>Your AI Interview is ready!!</h3>
        <p>share this link with your candidates to start interview process</p>
      </div>
      <div className="mt-6 w-full lg:w-3/4 bg-slate-800 p-2 border rounded-lg">
        <div className="flex justify-between ">
          <h4 className='font-bold text-blue-400'>Interview Link</h4>
          <h4 className='font-bold text-blue-400'>Valid for 30 days</h4>
        </div>
        <div className='mt-3 flex gap-2'>
          <Input defaultValue={GetInterviewUrl()} disabled={true}/>
          <Button className='btn-secondary' onClick={()=>onCopyLink()}>copy link</Button>

        </div>
        <hr className='my-5'/>
        <div className='flex gap-5'>
          <h4 className='text-sm flex gap-2 items-center'><Clock className='h-4 w-4'/>{formdata?.duration}</h4>
          <h4 className='text-sm flex gap-2 items-center'><List className='h-4 w-4'/>10 questions</h4>

        </div>

      </div>

      <div className="mt-6 w-full lg:w-3/4 bg-slate-800 p-2 border rounded-lg">
        <h4 className='font-bold text-blue-400'>share via</h4>
        <div className='flex gap-4'>
        <Button variant={'outline'}><Mail/> Email</Button>
        <Button variant={'outline'}><Send/> slack</Button>
        <Button variant={'outline'}><Mail/> whatsapp</Button>

        </div>
      
      </div>
      <div className='mt-6 w-full lg:w-3/4 flex justify-between'>
      <Link href={'/'}>
          <Button><ArrowLeft/>Back to dashboard</Button>
      </Link>
      <Link href={'/interview/'+interviewId}>
        <Button><ArrowRight/>Take Interview</Button>
      </Link>
      </div>
    </div>
  )
}

export default InterviewLink
