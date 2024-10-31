"use client";

import backArrow from "@/../public/svgs/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackArrow() {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <Image className="w-6 h-6" src={backArrow} alt="backArrow" />
    </div>
  );
}
