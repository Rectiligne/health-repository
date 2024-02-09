"use client";

import { routes } from "@/app/routing";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
  const pathname = usePathname();

  return (
    <>
      {routes.map((route: any, index: number) => {
        const Icon = route.icon;
        return (
          <Link
            key={index}
            href={route.path}
            className={clsx("flex items-center gap-2 mt-1 px-4 py-2 rounded", {
              "bg-muted-foreground text-primary-foreground shadow-[0px_0px_0px_1px_rgba(0,0,0,0.03),0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),_0px_6px_6px_-3px_rgba(0,0,0,0.04),0px_12px_12px_-6px_rgba(0,0,0,0.04),0px_24px_24px_-12px_rgba(0,0,0,0.04)]":
                pathname === route.path,
            })}
          >
            <Icon size={16} />
            <span>{route.title}</span>
          </Link>
        );
      })}
    </>
  );
}
