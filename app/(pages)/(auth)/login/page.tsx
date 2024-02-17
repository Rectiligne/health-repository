"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  } else {
    return (
      <>
        <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col p-10  lg:flex dark:border-r">
            <div className="absolute inset-0 bg-muted " />
            <div className="relative z-20 flex items-center text-lg font-medium">
              logo
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8 h-full bg-background">
            <div className="mx-auto flex h-full w-[80%] flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Se connecter
                </h1>
              </div>
              <Button onClick={() => signIn("github")}>
                <GithubIcon className="mr-2 h-4 w-4" /> Github
              </Button>
              {/* <UserAuthForm /> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
