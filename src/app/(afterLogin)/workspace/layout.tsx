"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";

import settings from "@/../public/svgs/workspace/settings.svg";
import BackArrow from "../_components/BackArrow";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const workspaceId = useSelectedLayoutSegment();
  return (
    <div className="px-4 py-12 bg-custom-gradient2 h-full">
      <div className="flex justify-between">
        <BackArrow />
        <Link href={`/workspaceDetail/${workspaceId}`}>
          <div>
            <Image className="w-6 h-6" src={settings} alt="settings" />
          </div>
        </Link>
      </div>
      <nav className="my-3">
        <hr className="border w-screen -mx-4" />
        {/* 사용자가 현재 들어가 있는 화면에 대해서 네브바 글자 색을 다르게 하려면 어떤 값으로 구별하지? */}
        <ul className="flex text-sm gap-x-11 sm:gap-x-8 lg:gap-x-12 justify-center my-2.5 text-[#E5E7EB]">
          <Link href={`/workspace/${workspaceId}`}>
            <li>그룹홈</li>
          </Link>
          <li>운동하기</li>
          <li>그룹채팅</li>
          <li>운동인증</li>
        </ul>
        <hr className="border w-screen -mx-4" />
      </nav>
      {children}
    </div>
  );
}
