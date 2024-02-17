"use client";

import { routes } from "@/app/routing";
import { Route } from "@/lib/models/routes.type";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
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
              "flex items-center gap-2 mt-1 px-4 py-2 rounded",
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
              className={clsx({
                "text-primary":
                  pathname.split("/")[1] === route.path.split("/")[1],
              })}
            />
            <span>{route.title}</span>
            {pathname.split("/")[1] === route.path.split("/")[1] && (
              <span className="ml-auto h-2 w-2 bg-primary rounded"></span>
            )}
          </Link>
        );
      })}
    </>
  );
}
