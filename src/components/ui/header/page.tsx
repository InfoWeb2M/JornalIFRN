"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

import { isAdminRoutesActions } from "@/actions/isAdminActions/isAdminActions";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginButton from "../loginButton/page";
import "./style.css";

type Routes = Record<string, string>;

export default function Header() {
    const [headerRoutes, setHeaderRoutes] = useState<Routes>({});

    useEffect(() => {
        isAdminRoutesActions().then(res => {
            setHeaderRoutes(res);
        });
    }, []);

    return (
        <header
            className="
        rounded-[1.5em]
        sticky top-[0.5em] z-50 w-[98%]
        mx-auto
        flex items-center justify-between
        px-16 py-2
        bg-(--cards)/80
        border-b border-(--bordas)
        shadow-(--shadow)
        backdrop-blur
        transition-colors
      "
        >
            {/* Logo + nome */}
            <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                    <Image src="/logo_teresa.png" alt="Logo Teresa" fill className="object-contain" priority />
                </div>

                <h1 className="text-(--titulo) font-semibold tracking-wide text-[1.3em] leading-none">
                    <i>J</i>ornal <br /> <i>T</i>eresa
                </h1>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex gap-10 items-center">
                {Object.entries(headerRoutes).map(([label, path]) =>
                    label === "logout" ? null : label === "Login" ? (
                        <LoginButton key={label} href={path} label={label} />
                    ) : (
                        <Link
                            prefetch={false}
                            key={label}
                            href={path}
                            className="
              relative text-(--links)
              transition-colors duration-200
              hover:text-(--hover)
              after:absolute after:left-0 after:-bottom-1
              after:h-0.5 after:w-0
              after:bg-(--hover)
              after:transition-all after:duration-300
              hover:after:w-full
            "
                        >
                            {label}{" "}
                        </Link>
                    ),
                )}
            </nav>

            {/* Mobile menu */}
            <Sheet>
                <SheetTrigger className="md:hidden">
                    <Menu className="w-7 h-7 text-(--text) transition-transform hover:scale-110" />
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="
            bg-(--background)/80
            backdrop-blur-lg
            border-l border-(--bordas)
            text-(--text)
            slide-from-right
          "
                >
                    <SheetHeader>
                        <SheetTitle className="text-(--titulo) text-center">Menu</SheetTitle>
                    </SheetHeader>

                    <nav className="mt-10 flex flex-col items-center gap-4 text-lg h-full mobile-nav">
                        {Object.entries(headerRoutes).map(([label, path]) =>
                            label === "logout" ? null : label === "Login" ? (
                                <LoginButton key={label} href={path} label={label} />
                            ) : (
                                <SheetClose asChild key={label}>
                                    <Link
                                        prefetch={false}
                                        href={path}
                                        data-text={label}
                                        className="
          text-(--links)
          text-center py-2
          transition-all duration-200
          header-item-hover-effect
        "
                                    >
                                        {label}
                                    </Link>
                                </SheetClose>
                            ),
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
