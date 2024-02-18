import NavigationHeader from "./nav-header";
import NavigationLinks from "./nav-links";

export default function NavigationWrapper() {
  return (
    <main className="nav-component flex flex-col h-full">
      <header className="flex justify-between">
        <NavigationHeader />
      </header>

      <section className="navigation_links mt-4 flex-1 flex flex-col">
        <NavigationLinks />
      </section>
    </main>
  );
}
