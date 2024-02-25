import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <section className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl uppercase font-bold text-muted">Loading</h1>
      <Loader2Icon className="animate-spin" size={96} />;
    </section>
  );
}
