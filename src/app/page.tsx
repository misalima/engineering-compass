import Link from "next/link";
import { IconLibrary, IconOverview, IconRoute, IconSettings } from "@/components/icons";
import { PRODUCT } from "@/config/product";

const navigation = [
  { label: "Visão geral", href: "#overview", icon: IconOverview, active: true },
  { label: "Área exemplo", href: "#example", icon: IconRoute, active: false },
  { label: "Componentes", href: "#components", icon: IconLibrary, active: false },
  { label: "Configurações", href: "#settings", icon: IconSettings, active: false },
] as const;

const panelClip = "[clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]";

function LogoPlaceholder() {
  return (
    <Link className="inline-flex min-h-11 items-center gap-3" href="#overview" aria-label={`${PRODUCT.name} — início`}>
      <span className="grid size-9 place-items-center border border-dashed border-line-strong bg-surface-panel font-mono text-micro uppercase tracking-[.08em] text-ink-faint" aria-hidden="true">logo</span>
      <span className="grid leading-none">
        <strong className="text-sm font-semibold tracking-[-.025em]">Engineering</strong>
        <em className="text-sm font-semibold not-italic tracking-[-.025em] text-accent">Compass</em>
      </span>
    </Link>
  );
}

function NavigationItems() {
  return navigation.map(({ label, href, icon: Icon, active }) => (
    <a
      key={label}
      href={href}
      className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] px-3.5 text-sm transition-colors duration-200 ease-[var(--ease-out)] ${active ? "bg-surface-active text-accent-strong" : "text-ink-muted hover:bg-surface-panel hover:text-ink"}`}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-[1.125rem] shrink-0" />
      {label}
    </a>
  ));
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-surface-base px-4 pb-5 pt-6 min-[781px]:flex">
      <LogoPlaceholder />
      <nav className="mt-12 grid gap-1" aria-label="Navegação principal"><NavigationItems /></nav>
      <div className="flex-1" />
      <div className="border-t border-line px-3 pt-5 text-xs leading-relaxed text-ink-faint">Shell inicial<br />Sem regras de negócio</div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex min-h-[4.25rem] items-center justify-between gap-4 border-b border-line bg-[color-mix(in_oklab,var(--surface-1)_94%,transparent)] px-4 py-2.5 backdrop-blur-[14px] min-[781px]:hidden">
      <LogoPlaceholder />
      <details className="relative [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer list-none text-xs text-accent">Menu</summary>
        <nav className="absolute right-0 top-[calc(100%+1rem)] grid w-52 border border-line-strong bg-surface-panel p-1 shadow-[var(--shadow-raised)]" aria-label="Navegação móvel"><NavigationItems /></nav>
      </details>
    </header>
  );
}

function Header() {
  return (
    <header className="flex items-end justify-between gap-8 border-b border-line pb-6 max-[640px]:items-start">
      <div>
        <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-.025em]">Base da aplicação</h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-secondary">Estrutura visual inicial para evoluir o Engineering Compass sem antecipar funcionalidades.</p>
      </div>
      <span className="shrink-0 border border-line-strong px-2 py-1.5 font-mono text-micro uppercase tracking-[.06em] text-ink-faint max-[640px]:hidden">interface scaffold</span>
    </header>
  );
}

function MainExample() {
  return (
    <section id="example" className={`border border-line-strong bg-surface-panel p-6 sm:p-8 ${panelClip}`}>
      <div className="flex items-start justify-between gap-6 border-b border-line pb-5">
        <div><h2 className="font-display text-lg font-semibold tracking-[-.025em]">Container principal</h2><p className="mt-2 text-sm text-ink-muted">Exemplo de superfície para conteúdo futuro.</p></div>
        <span className="font-mono text-label uppercase tracking-[.06em] text-ink-faint">exemplo</span>
      </div>
      <div className="grid gap-3 py-8" aria-hidden="true">
        <span className="h-3 w-2/3 bg-line-strong" />
        <span className="h-2 w-full bg-line" />
        <span className="h-2 w-5/6 bg-line" />
        <span className="h-2 w-1/2 bg-line" />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        <button className="min-h-11 rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-bold text-accent-ink transition hover:bg-accent-strong" type="button">Ação primária</button>
        <button className="min-h-11 rounded-[var(--radius-sm)] border border-line-strong px-4 text-sm font-semibold text-ink transition hover:bg-surface-active" type="button">Ação secundária</button>
      </div>
    </section>
  );
}

function ComponentExamples() {
  return (
    <section id="components" className="grid gap-4 lg:grid-cols-2">
      <article className={`border border-line bg-surface-base p-6 ${panelClip}`}>
        <h2 className="font-display text-base font-semibold tracking-[-.025em]">Superfície secundária</h2>
        <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">Um container mais discreto para blocos auxiliares, configurações ou estados vazios.</p>
        <div className="mt-8 flex flex-wrap gap-2"><span className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[.65rem] text-ink-faint">Padrão</span><span className="rounded-full border border-accent/40 px-3 py-1.5 font-mono text-[.65rem] text-accent">Selecionado</span></div>
      </article>
      <article className={`border border-line bg-surface-base p-6 ${panelClip}`}>
        <h2 className="font-display text-base font-semibold tracking-[-.025em]">Campo de exemplo</h2>
        <label className="mt-5 block text-xs font-semibold text-ink-secondary" htmlFor="sample-field">Rótulo do campo</label>
        <input className="mt-2 w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-panel px-3.5 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent focus:shadow-[0_0_0_3px_rgb(112_232_216_/_0.1)]" id="sample-field" placeholder="Conteúdo de exemplo" />
        <p className="mt-2 text-xs text-ink-faint">Texto auxiliar opcional.</p>
      </article>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <a className="fixed -top-16 left-4 z-[100] rounded-[var(--radius-sm)] bg-accent px-3.5 py-2.5 font-bold text-accent-ink focus:top-4" href="#main-content">Pular para o conteúdo</a>
      <Sidebar />
      <MobileHeader />
      <main id="main-content" className="min-h-screen min-[781px]:ml-64">
        <div id="overview" className="mx-auto grid w-full max-w-[90rem] gap-6 px-[clamp(1.25rem,3.5vw,4rem)] py-8 max-[780px]:px-4 max-[780px]:py-6">
          <Header />
          <MainExample />
          <ComponentExamples />
          <footer id="settings" className="flex justify-between gap-4 pt-2 text-[.68rem] text-ink-faint max-[520px]:grid"><span>Engineering Compass · base inicial</span><a className="hover:text-accent hover:underline" href={PRODUCT.portfolioUrl}>Parte do ecossistema misaellima.com</a></footer>
        </div>
      </main>
    </div>
  );
}
