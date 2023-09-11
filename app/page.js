import UserInfo from "@/components/UserInfo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid place-items-center mt-9 h-screen">
      <UserInfo />
    </div>
  );
}
