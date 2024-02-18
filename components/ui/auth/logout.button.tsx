"use client";

import clsx from "clsx";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../button";

export default function LogOutButton({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <Button
      variant={"ghost"}
      className={clsx(
        "flex justify-start items-center gap-2 mt-1 px-4 py-2 w-full",
        className
      )}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutIcon size={16} />
      Log out
    </Button>
  );
}
