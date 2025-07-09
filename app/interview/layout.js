'use client'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

const InterviewLayout = ({children}) => {
    const [interviewInfo, setinterviewInfo] = useState()
  return (
    <InterviewDataContext.Provider value={{interviewInfo, setinterviewInfo}}>
    <div>
      <div className='p-4'>
        <Link href={'/'}><Button className='btn-primary'>Home</Button></Link>
      </div>
      {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
