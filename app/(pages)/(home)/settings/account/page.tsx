import { AccountForm } from "@/components/form/settings/account.form";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <AccountForm user={session?.user} />
    </main>
  );
}

export default page;
