import { TokenForm } from "@/components/form/settings/token.form";
import { Separator } from "@/components/ui/separator";

export default function Token() {
  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Token</h3>
        <p className="text-sm text-muted-foreground">
          Update your providers&apos;s token.
        </p>
      </div>
      <Separator />
      <TokenForm />
    </main>
  );
}
