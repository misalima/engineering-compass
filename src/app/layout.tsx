import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { PRODUCT } from "@/config/product";
import { parseTheme } from "@/lib/theme";
import "./globals.css";

const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist" });
const display = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-plex-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCT.url),
  title: { default: PRODUCT.name, template: `%s — ${PRODUCT.name}` },
  description: PRODUCT.description,
  applicationName: PRODUCT.name,
  alternates: { canonical: "/" },
  openGraph: { title: PRODUCT.name, description: PRODUCT.description, url: PRODUCT.url, siteName: PRODUCT.name, locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = parseTheme((await cookies()).get("theme")?.value);
  return (
    <html lang="en" data-theme={theme === "system" ? undefined : theme} className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
