"use client";

import React from "react";
import Siginbtn from "./Siginbtn";
import { useSession } from "next-auth/react";
import Image from "next/image";
const UserInfo = () => {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <div className="shadow-xl flex flex-col gap-3 p-4 rounded-md bg-gray-500 text-white">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
          alt=""
        />
        <h2>
          Name:<span className="font-bold">{session?.user?.name}</span>
        </h2>
        <h2>
          Email:<span className="font-bold">{session?.user?.email}</span>
        </h2>
      </div>
    );
  } else {
    return <Siginbtn />;
  }
};

export default UserInfo;
