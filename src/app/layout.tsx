import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { PRODUCT } from "@/config/product";
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
  openGraph: { title: PRODUCT.name, description: PRODUCT.description, url: PRODUCT.url, siteName: PRODUCT.name, locale: "pt_BR", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}><body>{children}</body></html>;
}
