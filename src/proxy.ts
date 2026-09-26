// Optimistic cookie check only; real authorization happens in src/data/auth.ts.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/((?!api/auth|login|_next/static|_next/image|assets|favicon.ico).*)"],
};
