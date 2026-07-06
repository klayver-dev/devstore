"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { CartWidget } from "./cart";
import { SearchForm } from "./search-form";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Suspense } from "react";

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Logo + Busca */}
      <div className="flex items-center gap-2 sm:gap-5 min-w-0">
        <Link
          href="/"
          className="text-lg font-extrabold text-white sm:text-2xl whitespace-nowrap"
        >
          Dev Store
        </Link>

        <div className="hidden md:block">
          <Suspense fallback={null}>
            <SearchForm />
          </Suspense>
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
      <div className="flex items-center gap-2 sm:gap-3 md:hidden shrink-0">
        <CartWidget />

        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-md p-1 sm:p-2 hover:bg-zinc-800 transition-colors">
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
          </SheetTrigger>

          {/* AJUSTE RESPONSIVO E TRAVA EM 320px */}
          <SheetContent
            side="right"
            className="w-[320px] min-[320px]:w-[85vw] sm:w-[350px] border-zinc-800 bg-zinc-950 p-4 sm:p-6 overflow-x-hidden"
          >
            <div className="mt-10 sm:mt-8 flex flex-col gap-4 sm:gap-6 w-full">
              {/* O input de busca se adapta ao container */}
              <div className="w-full">
                <Suspense fallback={null}>
                  <SearchForm />
                </Suspense>
              </div>

              <div className="h-px bg-zinc-800 w-full" />

              <Link
                href="/"
                className="flex items-center gap-3 hover:bg-zinc-900 p-2 rounded-md transition-colors"
              >
                <Image
                  alt="Photo profile"
                  src="https://github.com/klayver-dev.png"
                  width={40}
                  height={40}
                  className="rounded-full shrink-0"
                />
                <span className="text-sm sm:text-base truncate text-white">
                  Account
                </span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
