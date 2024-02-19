import { toast } from "@/components/ui/use-toast";
import { SparklesIcon } from "lucide-react";
import { AuthUser } from "next-auth";

export async function onSubmitForm(
  data: any,
  callback: (state: boolean) => void,
  user: AuthUser | undefined
) {
  callback(true);

  const res = await fetch("/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, email: user?.email }),
  });

  let toastContent = {};
  if (!res.ok) {
    const result = await res.json();
    toastContent = {
      title: "Erreur de connexion",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-destructive-foreground  p-4">
          <code className="text-destructive">
            {JSON.stringify(result, null, 2)}
          </code>
        </pre>
      ),
      variant: "destructive",
    };
  } else {
    toastContent = {
      description: (
        <p className="flex items-center">
          Compte mis à jour
          <SparklesIcon className="ml-2 w-4 h-4" />
        </p>
      ),
    };
  }
  toast(toastContent);
  callback(false);
}
