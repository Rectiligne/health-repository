import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundCatchAll() {
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <header className="text-center mb-4">
        <h1 className="text-8xl font-extrabold">404</h1>
        <p className="text-sm text-muted-foreground">You are lost</p>
      </header>
      <main className="flex items-center gap-2">
        <kbd className="text-xl pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-background px-2 font-mono font-medium text-muted-foreground opacity-100">
          ⌘
        </kbd>
        <span className="font-bold">+</span>
        <kbd className="text-xl pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-background px-2 font-mono font-medium text-muted-foreground opacity-100">
          K
        </kbd>
      </main>
      <footer>
        <Button variant={"link"} asChild>
          <Link href="/">
            <HomeIcon className="h-4 w-4 mr-2" />
            Start from home
          </Link>
        </Button>
      </footer>
    </div>
  );
}
