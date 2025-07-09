"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/signout", { method: "POST" }); // Calls server to clear session cookie
    router.push("/signin"); // Redirect after logout
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-violet-600 hover:bg-red-700 text-white px-3 py-1 rounded-3xl"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
