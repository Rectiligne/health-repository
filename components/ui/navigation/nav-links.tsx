"use client";

import { routes } from "@/app/routing";
import { Route } from "@/types/routes.type";
import clsx from "clsx";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

interface NavigationLinksProps {
  wideView: boolean;
}

export default function NavigationLinks({ wideView }: NavigationLinksProps) {
  const pathname = usePathname();

  const SmallNavigationLinkContent = ({
    route,
    Icon,
  }: {
    route: Route;
    Icon: LucideIcon;
  }) => {
    return (
      <>
        <Tooltip>
          <TooltipTrigger>
            <Icon
              size={16}
              className={clsx("h-6", {
                "text-primary":
                  pathname.split("/")[1] === route.path.split("/")[1],
              })}
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{route.title}</span>
          </TooltipContent>
        </Tooltip>
      </>
    );
  };

  const WideNavigationLinkContent = ({
    route,
    Icon,
  }: {
    route: Route;
    Icon: LucideIcon;
  }) => {
    return (
      <>
        <Icon
          size={16}
          className={clsx("h-6", {
            "text-primary": pathname.split("/")[1] === route.path.split("/")[1],
          })}
        />
        <span>{route.title}</span>
        {pathname.split("/")[1] === route.path.split("/")[1] && (
          <span className="ml-auto h-2 w-2 bg-primary rounded"></span>
        )}
      </>
    );
  };

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
            {wideView ? (
              <WideNavigationLinkContent route={route} Icon={Icon} />
            ) : (
              <SmallNavigationLinkContent route={route} Icon={Icon} />
            )}
          </Link>
        );
      })}
    </>
  );
}
