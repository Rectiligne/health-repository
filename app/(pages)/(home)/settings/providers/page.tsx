import { ProvidersForm } from "@/components/form/settings/providers.form";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Token() {
  const session = await getServerSession(authOptions);

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Providers</h3>
        <p className="text-sm text-muted-foreground">
          Update your providers&apos;s tokens.
        </p>
      </div>
      <Separator />
      <ProvidersForm user={session?.user} />
    </main>
  );
}
