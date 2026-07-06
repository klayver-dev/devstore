"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { CartWidget } from "./cart";
import { SearchForm } from "./search-form";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Logo + Busca */}
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="text-xl font-extrabold text-white sm:text-2xl"
        >
          Dev Store
        </Link>

        <div className="hidden md:block">
          <SearchForm />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <CartWidget />

        <div className="h-4 w-px bg-zinc-700" />

        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span>Account</span>

          <Image
            alt="Photo profile"
            src="https://github.com/klayver-dev.png"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-3 md:hidden">
        <CartWidget />

        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-md p-2 hover:bg-zinc-800">
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="border-zinc-800 bg-zinc-950">
            <div className="mt-8 flex flex-col gap-6 px-6">
              <SearchForm />

              <div className="h-px bg-zinc-800" />

              <Link href="/" className="flex items-center gap-3">
                <Image
                  alt="Photo profile"
                  src="https://github.com/klayver-dev.png"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <span>Account</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
