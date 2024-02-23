"use client";

import { routes } from "@/app/routing";
import { Route } from "@/types/routes.type";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLinksProps {
  wideView: boolean;
}

export default function NavigationLinks({ wideView }: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {routes.map((route: Route, index: number) => {
        const Icon = route.icon;
        return (
          <Link
            key={index}
            href={route.path}
            className={clsx(
              "flex items-center gap-2 mt-1 py-2 rounded hover:bg-muted/30 cursor-pointer transition-all duration-200 ease-in-out",
              {
                "px-4 w-full justify-start": wideView,
              },
              {
                "justify-center w-10": !wideView,
              },
              {
                "text-primary font-medium":
                  pathname.split("/")[1] === route.path.split("/")[1],
              },
              {
                "mt-auto": route.position === "bottom",
              }
            )}
          >
            <Icon
              size={16}
              className={clsx("h-6", {
                "text-primary":
                  pathname.split("/")[1] === route.path.split("/")[1],
              })}
            />
            {wideView && <span>{route.title}</span>}

            {wideView &&
              pathname.split("/")[1] === route.path.split("/")[1] && (
                <span className="ml-auto h-2 w-2 bg-primary rounded"></span>
              )}
          </Link>
        );
      })}
    </>
  );
}
