"use client";

import * as React from "react";

import { UserSchemaLogIn } from "@/components/schema/auth/user.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon, Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useToast } from "../../ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const FormShema = UserSchemaLogIn;
  const form = useForm<z.infer<typeof FormShema>>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof FormShema>,
    type: string = "credentials"
  ) => {
    setIsLoading(true);
    let singInData = null;
    if (type === "github") {
      singInData = await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } else {
      singInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    }
    if (!singInData?.ok) {
      setIsLoading(false);
      toast({
        title: "Erreur de connexion",
        description:
          "Un problème est survenu lors de la connexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit as SubmitHandler<{ email: string; password: string }>
        )}
        className={cn("grid gap-6", className)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="name@example.com"
                    autoComplete="email"
                    data-form-type="email"
                    data-dashlane-rid="8527d26ebc9889aa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel className="sr-only">Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mot de passe"
                    type="password"
                    disabled={isLoading}
                    autoComplete="current-password"
                    data-form-type="password"
                    data-dashlane-rid="f5e3e3e3e3e3e3e3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => onSubmit(form.getValues(), "github")}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </Form>
  );
}
