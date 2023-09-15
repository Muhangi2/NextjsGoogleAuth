"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  //returns an object
  const { status } = useSession();
  console.log(status);
  return (
    <div className="flex justify-between shadow-md items-center p-5 my-5">
      <Link href={"/"} className="font-2xl text-blue-600 text-lg">
        Eliod Coding
      </Link>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-900 px-5 text-white py-2 rounded-md ">
          Sign out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-slate-900 px-5 text-white py-2 rounded-md ">
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
