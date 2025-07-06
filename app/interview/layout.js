'use client'
import Navbar from '@/components/Navbar'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React from 'react'
import { useState } from 'react'

const InterviewLayout = ({children}) => {
    const [interviewInfo, setinterviewInfo] = useState()
  return (
    <InterviewDataContext.Provider value={{interviewInfo, setinterviewInfo}}>
    <div>
        <Navbar/>
      {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
