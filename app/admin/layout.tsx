"use client"

import { assets } from "@/Assets/assets";
import Sidebar from "@/components/Admin/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-(--bg-primary)">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col w-full h-dvh overflow-y-auto">
        <div className="h-20 flex items-center justify-between w-full px-4 sm:px-12 border-b border-(--border-color) bg-(--bg-primary) sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden w-9 h-9 flex flex-col items-center justify-center gap-1"
              aria-label="Open menu"
            >
              <span className="w-5 h-0.5 bg-(--text-primary)"></span>
              <span className="w-5 h-0.5 bg-(--text-primary)"></span>
              <span className="w-5 h-0.5 bg-(--text-primary)"></span>
            </button>
            <h3 className="font-medium text-(--text-primary)">Admin Panel</h3>
          </div>
          <div className="flex items-center gap-4">
              <ThemeToggle />
              <Image src={assets.profile_icon} alt="" width={36} height={36} className="rounded-full" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}