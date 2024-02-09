import NavigationComponent from "@/components/navigation/NavigationComponent";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full bg-background flex">
      <header className="h-full w-[320px] py-8 px-6">
        <NavigationComponent />
      </header>

      <section className="flex-1 rounded-xl bg-muted my-1 mr-1 px-8 py-7">
        {children}
      </section>
    </main>
  );
}
