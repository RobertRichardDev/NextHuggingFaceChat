"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";

import { Logo } from "../icons/logo";

export default function Header() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Chat",
      active: pathname === "/"
    },
    {
      href: "/pdf",
      label: "Chat with PDF",
      active: pathname == "/pdf"
    },
    {
      href: "/imgtt",
      label: "Image to Text",
      active: pathname == "/imgtt"
    },
    {
      href: "/ttimg",
      label: "Text To Image",
      active: pathname == "/ttimg"
    },
  ];

  return (
    <div className="w-full flex flex-col items-center border-b px-4 pb-2 shadow">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-3xl">Hugging Face Chat</h1>
        <Logo className="w-20 h-20" />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-2 pt-2">
        {links.map(({ href, label, active }) => (
          <Link
            key={`${href}${label}`}
            href={href}
            className={`${active ? "bg-yellow-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}