import type { ReactNode } from "react";
import { signOut } from "@/auth";
import { BackButton } from "@/components/layout/back-button";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SidebarMenu } from "@/components/layout/sidebar-menu";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button className="cursor-pointer text-xs text-ink-faint hover:text-accent" type="submit">Sign out</button>
    </form>
  );
}

function Sidebar({ standardVersion }: { standardVersion: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--sidebar-width)] flex-col bg-surface-base px-4 pb-5 pt-6 min-[781px]:flex">
      <Logo size="lg" />
      <div className="mt-12"><SidebarMenu label="Main navigation" /></div>
      <div className="flex-1" />
      <div className="flex items-center justify-between px-3 pt-5 text-xs text-ink-faint">
        <span>Path v2 · Skills v{standardVersion}</span>
        <SignOut />
      </div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex min-h-[4.25rem] items-center justify-between gap-4 border-b border-line bg-[color-mix(in_oklab,var(--surface-1)_94%,transparent)] px-4 py-2.5 backdrop-blur-[14px] min-[781px]:hidden">
      <Logo />
      <MobileMenu>
        <SidebarMenu label="Mobile navigation" />
        <div className="border-t border-line px-3.5 py-3"><SignOut /></div>
      </MobileMenu>
    </header>
  );
}

export function AppShell({ children, standardVersion }: { children: ReactNode; standardVersion: string }) {
  return (
    <div className="min-h-screen">
      <a className="fixed -top-16 left-4 z-[100] rounded-[var(--radius-sm)] bg-accent px-3.5 py-2.5 font-bold text-accent-ink focus:top-4" href="#main-content">Skip to content</a>
      <Sidebar standardVersion={standardVersion} />
      <MobileHeader />
      <main id="main-content" className="min-h-screen min-[781px]:ml-[var(--sidebar-width)]">
        <BackButton />
        {children}
      </main>
    </div>
  );
}
