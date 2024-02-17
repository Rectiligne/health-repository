import { SettingsForm } from "@/components/settings/settings.form";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your favorites project.
        </p>
      </div>
      <Separator />
      <SettingsForm />
    </main>
  );
}
