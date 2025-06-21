import React from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const authLayout = async ({children}) => {
   const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated) redirect('/');
  return (
    <div className='flex justify-center items-center h-screen'>
      {children}
    </div>
  )
}

export default authLayout
