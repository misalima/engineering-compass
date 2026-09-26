import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { sessionIsOwner } from "@/lib/owner";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const session = await auth();
  if (sessionIsOwner(session)) redirect("/");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="grid w-full max-w-sm gap-8 rounded-[var(--radius-lg)] bg-surface-panel p-8">
        <Logo size="lg" />
        <div>
          <h1 className="font-display text-2xl font-medium">Sign in</h1>
          <p className="mt-2 text-sm text-ink-muted">This is a private, single-owner workspace.</p>
        </div>
        {error ? (
          <p role="alert" className="rounded-[var(--radius-sm)] bg-surface-raised px-3.5 py-3 text-sm text-danger">
            {error === "AccessDenied" ? "This account is not allowed." : "Sign-in failed. Try again."}
          </p>
        ) : null}
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <Button className="w-full" type="submit">Continue with GitHub</Button>
        </form>
      </div>
    </main>
  );
}
