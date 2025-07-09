import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from '@/lib/actions/auth.action';
import SignOutButton from './SignOutButton';

const Navbar =async () => {
  const user =await getCurrentUser();
  return (
    <div>
      <nav className=" shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="font-bold">
              <span className="text-green-400">&lt;</span>
              Prep<span className="text-green-400">Mate/&gt;</span>
            </h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-bold text-[18px]">
            <Link href="/" className="hover:text-violet-500">Home</Link>
            <Link href="/all-interviews" className="hover:text-violet-500">All Interviews</Link>
            <Link href="/services/about" className="hover:text-violet-500">About</Link>
            <Link href="/services/give-feedback" className="hover:text-violet-500">Feedback</Link>
            <SignOutButton/>
          </div>

          {/* Welcome (desktop only) */}
          <div className="hidden md:block font-bold">
            <h4 className="text-[20px]">
              Welcome, <span className="text-green-500">{user.name}</span>
            </h4>
          </div>

          {/* Mobile menu (hamburger) */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="cursor-pointer list-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-black border rounded-md shadow-lg p-4 space-y-2 z-50 text-[16px] font-bold">
                <Link href="/" className="block hover:text-violet-500">Home</Link>
                <Link href="/all-interviews" className="block hover:text-violet-500">All Interviews</Link>
                <Link href="/services/about" className="block hover:text-violet-500">About</Link>
                <Link href="/services/give-feedback" className="block hover:text-violet-500">Feedback</Link>
                <SignOutButton/>
                <hr />
                <h4 className="text-sm font-bold ">
                  Welcome, <span className="text-green-500">{user.name}</span>
                </h4>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
