import Agent from '@/components/Agent'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser();

  return (
    <div className='w-full sm:w-3/4'>    
      <Agent/>
    </div>
  )
}

export default page
