"use client";

import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { useState } from "react";
import NavigationHeader from "./nav-header";
import NavigationLinks from "./nav-links";

export default function NavigationWrapper() {
  const [small, expand] = useState(false);
  const props = useSpring({ width: small ? 60 : 320 });

  console.log(small);
  return (
    <animated.main
      style={props}
      className={clsx("relative py-8 px-2 flex flex-col h-full", {
        "py-8 px-6": !small,
      })}
    >
      <header className="flex justify-between">
        <NavigationHeader wideView={!small} />
      </header>

      <section className="navigation_links mt-4 flex-1 flex flex-col">
        <NavigationLinks wideView={!small} />
      </section>

      <animated.article
        className={clsx(
          "absolute top-1/2 transform -translate-y-1/2 bg-background rounded-full py-2 px-2 opacity-10 hover:opacity-100 cursor-pointer transition-opacity duration-300 ease-in-out z-10",
          {
            "left-[50%]": small,
            "left-[90%]": !small,
          }
        )}
        onClick={() => expand(!small)}
      >
        {!small ? (
          <ChevronsLeftIcon size={16} />
        ) : (
          <ChevronsRightIcon size={16} />
        )}
      </animated.article>
    </animated.main>
  );
}
