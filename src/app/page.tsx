import Link from "next/link";
import { IconLibrary, IconOverview, IconRoute, IconSettings } from "@/components/icons";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { SidebarMenu } from "@/components/layout/sidebar-menu";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { PRODUCT } from "@/config/product";

const navigation = [
  { label: "Overview", href: "#overview", icon: IconOverview, active: true },
  { label: "Example area", href: "#example", icon: IconRoute, active: false },
  { label: "Components", href: "#components", icon: IconLibrary, active: false },
  { label: "Settings", href: "#settings", icon: IconSettings, active: false },
] as const;

function LogoPlaceholder() {
  return (
    <Link className="inline-flex min-h-11 items-center gap-3" href="#overview" aria-label={`${PRODUCT.name} — home`}>
      <span className="grid size-9 place-items-center rounded-[var(--radius-sm)] bg-surface-raised text-[.65rem] font-medium text-ink-faint" aria-hidden="true">logo</span>
      <span className="grid leading-none">
        <strong className="text-sm font-semibold tracking-[-.025em]">Engineering</strong>
        <em className="text-sm font-semibold not-italic tracking-[-.025em] text-accent">Compass</em>
      </span>
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-surface-base px-4 pb-5 pt-6 min-[781px]:flex">
      <LogoPlaceholder />
      <div className="mt-12"><SidebarMenu items={navigation} label="Main navigation" /></div>
      <div className="flex-1" />
      <div className="px-3 pt-5 text-xs leading-relaxed text-ink-faint">Initial shell<br />No business rules</div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex min-h-[4.25rem] items-center justify-between gap-4 border-b border-line bg-[color-mix(in_oklab,var(--surface-1)_94%,transparent)] px-4 py-2.5 backdrop-blur-[14px] min-[781px]:hidden">
      <LogoPlaceholder />
      <details className="relative [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer list-none text-xs text-accent">Menu</summary>
        <div className="absolute right-0 top-[calc(100%+1rem)] w-52 rounded-[var(--radius-md)] bg-surface-raised p-1 shadow-[var(--shadow-raised)]"><SidebarMenu items={navigation} label="Mobile navigation" /></div>
      </details>
    </header>
  );
}

function Header() {
  return (
    <header className="flex items-end justify-between gap-8 pb-4 max-[640px]:items-start">
      <div>
        <h1 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.05] tracking-[-.025em]">Application foundation</h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-secondary">Initial visual structure for evolving Engineering Compass without assuming product functionality.</p>
      </div>
      <span className="shrink-0 text-xs text-ink-faint max-[640px]:hidden">Interface scaffold</span>
    </header>
  );
}

function MainExample() {
  return (
    <section id="example" className="rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6 pb-5">
        <div><h2 className="font-display text-lg font-semibold tracking-[-.025em]">Main container</h2><p className="mt-2 text-sm text-ink-muted">Example surface for future content.</p></div>
        <span className="text-xs text-ink-faint">Example</span>
      </div>
      <div className="grid gap-3 py-8" aria-hidden="true">
        <span className="h-3 w-2/3 bg-line-strong" />
        <span className="h-2 w-full bg-line" />
        <span className="h-2 w-5/6 bg-line" />
        <span className="h-2 w-1/2 bg-line" />
      </div>
      <div className="flex flex-wrap gap-3 pt-5">
        <PrimaryButton>Primary action</PrimaryButton>
        <SecondaryButton>Secondary action</SecondaryButton>
      </div>
    </section>
  );
}

function ComponentExamples() {
  return (
    <section id="components" className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-[var(--radius-md)] bg-surface-base p-6">
        <h2 className="font-display text-base font-semibold tracking-[-.025em]">Secondary surface</h2>
        <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">A quieter container for supporting content, settings, or empty states.</p>
        <div className="mt-8 flex flex-wrap gap-2"><span className="rounded-full bg-surface-panel px-3 py-1.5 text-xs text-ink-faint">Default</span><span className="rounded-full bg-surface-active px-3 py-1.5 text-xs text-ink-secondary">Selected</span></div>
      </article>
      <article className="rounded-[var(--radius-md)] bg-surface-raised p-6">
        <h2 className="font-display text-base font-semibold tracking-[-.025em]">Example field</h2>
        <label className="mt-5 block text-xs font-semibold text-ink-secondary" htmlFor="sample-field">Field label</label>
        <input className="mt-2 w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-panel px-3.5 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent focus:shadow-[0_0_0_3px_rgb(112_232_216_/_0.1)]" id="sample-field" placeholder="Example content" />
        <p className="mt-2 text-xs text-ink-faint">Optional helper text.</p>
      </article>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <a className="fixed -top-16 left-4 z-[100] rounded-[var(--radius-sm)] bg-accent px-3.5 py-2.5 font-bold text-accent-ink focus:top-4" href="#main-content">Skip to content</a>
      <Sidebar />
      <MobileHeader />
      <main id="main-content" className="min-h-screen min-[781px]:ml-60">
        <MainContentContainer id="overview">
          <Header />
          <MainExample />
          <ComponentExamples />
          <footer id="settings" className="flex justify-between gap-4 pt-2 text-[.68rem] text-ink-faint max-[520px]:grid"><span>Engineering Compass · initial foundation</span><a className="hover:text-accent hover:underline" href={PRODUCT.portfolioUrl}>Part of the misaellima.com ecosystem</a></footer>
        </MainContentContainer>
      </main>
    </div>
  );
}
