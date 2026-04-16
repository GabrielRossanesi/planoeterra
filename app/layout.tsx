import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Plano & Terra | Topografia e Agrimensura",
    template: "%s | Plano & Terra",
  },
  description: site.description,
  keywords: [
    "topografia",
    "agrimensura",
    "regularização de terreno",
    "georreferenciamento urbano",
    "georreferenciamento rural",
    "usucapião",
  ],
  authors: [{ name: "Plano & Terra" }],
  creator: "Plano & Terra",
  publisher: "Plano & Terra",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Plano & Terra | Topografia e Agrimensura",
    description:
      "Regularize seu terreno com precisão técnica, segurança jurídica e atendimento especializado.",
    url: site.url,
    siteName: "Plano & Terra",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/og-plano-terra.svg",
        width: 1200,
        height: 630,
        alt: "Plano & Terra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plano & Terra | Topografia e Agrimensura",
    description:
      "Topografia e agrimensura para regularização de terrenos com precisão técnica.",
    images: ["/assets/og-plano-terra.svg"],
  },
  icons: {
    icon: "/assets/logo-plano-terra.svg",
    shortcut: "/assets/logo-plano-terra.svg",
    apple: "/assets/logo-plano-terra.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06100b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}


