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

  const navItems = [
    // nav 값들 임의로 정의
    { name: "그룹홈", path: `/workspace/${workspaceId}`, segment: workspaceId },
    {
      name: "운동하기",
      path: `/workspace/${workspaceId}/exercise`,
      segment: "exercise",
    },
    {
      name: "그룹채팅",
      path: `/workspace/${workspaceId}/chat`,
      segment: "chat",
    },
    {
      name: "운동인증",
      path: `/workspace/${workspaceId}/auth`,
      segment: "auth",
    },
  ];

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
        <ul className="flex text-sm gap-x-11 sm:gap-x-8 lg:gap-x-12 justify-center my-2.5 text-[#E5E7EB]">
          {navItems.map((navItem) => (
            <Link href={navItem.path} key={navItem.name}>
              <li
                className={`${
                  navItem.segment === workspaceId
                    ? "text-[#4B5563]"
                    : "text-[#E5E7EB]"
                }`}
              >
                {navItem.name}
              </li>
            </Link>
          ))}
        </ul>
        <hr className="border w-screen -mx-4" />
      </nav>
      {children}
    </div>
  );
}
