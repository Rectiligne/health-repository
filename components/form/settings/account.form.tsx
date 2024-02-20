"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userAccountFormSchema } from "@/components/schema/account.schema";
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
import { Loader2Icon } from "lucide-react";
import { AuthUser } from "next-auth";
import React from "react";
import { submitUserForm } from "./utils.form";

type AccountFormValues = z.infer<typeof userAccountFormSchema>;

interface AccountFormProps {
  user: AuthUser | undefined;
}

export function AccountForm({ user }: AccountFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(userAccountFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  async function onSubmit(data: AccountFormValues) {
    await submitUserForm(data, setIsLoading, user);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>FirstName</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="First name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>LastName</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button type="submit">
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
