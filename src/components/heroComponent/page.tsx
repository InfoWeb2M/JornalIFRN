"use client";

import { useAppTheme } from "@/hooks/useAppTheme";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroComponent() {
    const theme = useAppTheme();
    const [imageSrc, setImageSrc] = useState<string>("/Jornal_light.png");

    useEffect(() => {
        if (!theme) return;

        setImageSrc(theme === "dark" ? "/Jornal_dark.png" : "/Jornal_light.png");
    }, [theme]);

    if (!theme) return null;

    return (
        <div className="space-y-8">
            <div className="relative p-6 w-[90%] md:w-[65vw] m-auto mb-4 h-75 lg:h-170 border-t border-b md:border-t-2 md:border-b-2 border-(--bordas)">
                <Image src={imageSrc} alt="Logo do Jornal Teresa" fill className="object-contain" priority />
            </div>
        </div>
    );
}
