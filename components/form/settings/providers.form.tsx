"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { AuthUser } from "next-auth";
import React from "react";
import { onSubmitForm } from "./utils.form";

const providerFormSchema = z.object({
  gitlabToken: z.string().min(2, {
    message: "token must be at least 2 characters.",
  }),
});

type providerFormValues = z.infer<typeof providerFormSchema>;

interface AccountFormProps {
  user: AuthUser | undefined;
}

export function ProvidersForm({ user }: AccountFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<providerFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      gitlabToken: user?.gitlabToken,
    },
  });

  function onSubmit(data: providerFormValues) {
    onSubmitForm(data, setIsLoading, user);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gitlabToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gitlab token</FormLabel>
              <FormControl>
                <Input placeholder="Your token" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
