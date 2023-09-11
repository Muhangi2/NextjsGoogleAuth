"use client";
import React from "react";
import { signIn } from "next-auth/react";
const Siginbtn = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-900 px-9 py-3 rounded-sm text-white shadow-md">
      Sign in with google
    </button>
  );
};

export default Siginbtn;
