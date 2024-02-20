"use client";

import { z } from "zod";

import { providerFormSchema } from "@/components/schema/provider.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account } from "@prisma/client";
import { GithubIcon, GitlabIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { submitProvidersForm } from "./utils.form";

interface AccountFormProps {
  user: any;
}

export function ProvidersForm({ user }: AccountFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const githubProvider = user.accounts.find(
    (account: Account) => account.provider === "github"
  );
  const gitlabId = process.env.NEXT_PUBLIC_GITHUB_ID;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      github_endpoint: "",
      gitlab_endpoint: "",
    },
  });
  type AccountFormValues = z.infer<typeof providerFormSchema>;

  async function onSubmit(data: AccountFormValues) {
    await submitProvidersForm(data, user, setIsLoading);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section>
          <header className="space-y-1">
            <h3 className="text-xl font-medium tracking-tight flex gap-2 items-center">
              <GithubIcon className="w-5 h-5" /> Github
            </h3>
          </header>
          <section className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="github_endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="github.com/{utilisateur}"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex gap-4">
              <Button variant={"outline"} asChild>
                <Link
                  href={
                    "https://github.com/login/oauth/authorize?client_id=" +
                    gitlabId
                  }
                >
                  Generer un access_token
                </Link>
              </Button>
              {githubProvider && (
                <Button variant={"link"} asChild>
                  <Link
                    target="_blank"
                    href={
                      "https://github.com/apps/health-repository/installations/new/permissions?target_id=" +
                      githubProvider.providerAccountId
                    }
                  >
                    Autoriser l&apos;application
                  </Link>
                </Button>
              )}
            </section>
          </section>
          <Separator className="my-6" />
        </section>

        <section>
          <header className="space-y-1">
            <h3 className="text-xl font-medium tracking-tight flex gap-2 items-center">
              <GitlabIcon className="w-5 h-5" /> Gitlab
            </h3>
          </header>
          <section className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="gitlab_endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="gitlab.com/{utilisateur}"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Separator className="my-6" />
        </section>

        <Button type="submit">
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
