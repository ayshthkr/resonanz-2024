import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Navbar({
  loading,
  className,
}: {
  loading?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `absolute h-full w-full top-0 left-0 text-white z-50 transition-all duration-1000 ease-in-out 
          ${!!loading ? "opacity-0" : "opacity-100"}
        `,
        className
      )}
    >
      <div className="w-full p-8 space-x-6 md:space-x-12 flex items-center justify-between font-tungsten tracking-wide text-2xl uppercase">
        <div className="space-x-12 flex">
          <h1>Events</h1>
          <h1>Sponsors</h1>
        </div>
        <Link className="justify-end px-6 py-1 rounded-full bg-white text-black" href="/signup">
          Register
        </Link>
      </div>
    </div>
  );
}
