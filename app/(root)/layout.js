import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from 'next/navigation';
import Navbar from "@/components/Navbar";


const rootLayout =async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect('/signin'); //<-----check here after developement this prevents from going to home page

  return (
    <div className=" w-screen">
      <Navbar/>
      {children}
    </div>
  );
};

export default rootLayout;
