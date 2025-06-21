import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between p-3 px-4 ">
              <div className="logo flex items-center w-auto">
                {/* <Image src="/logo.svg" alt="Logo" width={56} height={42} /> */}
                <h2>
                  <span className='text-green-400'>&lt;</span>
                  Prep<span className="text-green-400">Mate/&gt;</span>
                </h2>
              </div>
             
              {/* <div className="flex gap-2">
                <Button className="btn-secondary">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="btn-primary">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div> */}
            </nav>
    </div>
  )
}

export default Navbar
