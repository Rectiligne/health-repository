import { ProvidersForm } from "@/components/form/settings/providers.form";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Token() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user.email!,
    },
    include: {
      accounts: true,
    },
  });

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Providers</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour vos informations de providers.
        </p>
      </div>
      <Separator />
      <ProvidersForm user={user} />
    </main>
  );
}
