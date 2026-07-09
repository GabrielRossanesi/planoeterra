"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryWhatsappLink, stripBasePath } from "@/lib/site";

type TabItem = {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const tabs: TabItem[] = [
  {
    label: "Início",
    href: "/",
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.6v-5.6h-4.8V21H5a1 1 0 0 1-1-1v-9.5Z"
          {...strokeProps}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.16 : 0}
        />
      </svg>
    ),
  },
  {
    label: "Serviços",
    href: "/servicos",
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
        <path
          d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"
          {...strokeProps}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.16 : 0}
        />
        <path d="m4 12.4 8 4.5 8-4.5M4 16.9l8 4.5 8-4.5" {...strokeProps} />
      </svg>
    ),
  },
  {
    label: "Projetos",
    href: "/projetos",
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
        <path
          d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"
          {...strokeProps}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.16 : 0}
        />
        <path d="M9 4v14M15 6v14" {...strokeProps} />
      </svg>
    ),
  },
  {
    label: "Contato",
    href: "/contato",
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
        <path
          d="M4.5 5.5h15a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H9l-4.2 3.2a.4.4 0 0 1-.65-.32V6.5a1 1 0 0 1 1-1Z"
          {...strokeProps}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.16 : 0}
        />
        <path d="M8.2 10h7.6M8.2 13.2h4.8" {...strokeProps} />
      </svg>
    ),
  },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6">
      <path
        fill="currentColor"
        d="M16 3C8.83 3 3 8.64 3 15.59c0 2.44.73 4.8 2.12 6.83L3.7 29l6.78-1.77A13.12 13.12 0 0 0 16 28.18c7.17 0 13-5.64 13-12.59S23.17 3 16 3Zm0 22.94a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.02 1.05 1.08-3.9-.26-.4a10.25 10.25 0 0 1-1.6-5.34C5.24 9.89 10.05 5.24 16 5.24s10.76 4.65 10.76 10.35S21.95 25.94 16 25.94Zm5.9-7.73c-.32-.15-1.9-.91-2.2-1.02-.3-.11-.51-.15-.73.15s-.84 1.01-1.03 1.21c-.19.21-.38.23-.7.08-.32-.15-1.35-.49-2.58-1.56-.96-.83-1.6-1.86-1.79-2.17-.19-.31-.02-.47.14-.62.15-.15.32-.39.48-.58.16-.19.22-.32.33-.53.11-.21.06-.4-.02-.55-.08-.15-.73-1.72-1-2.36-.26-.62-.53-.54-.73-.55h-.62c-.21 0-.55.08-.84.38-.29.3-1.1 1.05-1.1 2.56s1.12 2.97 1.28 3.17c.16.21 2.2 3.43 5.33 4.8.75.32 1.34.52 1.8.66.76.23 1.45.2 2 .12.61-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.12-.29-.2-.61-.36Z"
      />
    </svg>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const normalizedPath = stripBasePath(pathname).replace(/\/$/, "") || "/";

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-950/94 pb-safe text-mineral-100 shadow-[0_-14px_40px_rgba(0,0,0,.32)] backdrop-blur-2xl lg:hidden"
    >
      <div className="mx-auto grid h-[4.25rem] max-w-lg grid-cols-5 items-stretch px-1">
        {tabs.slice(0, 2).map((tab) => (
          <TabLink key={tab.href} tab={tab} normalizedPath={normalizedPath} />
        ))}

        <div className="relative flex items-center justify-center">
          <a
            href={primaryWhatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Solicitar atendimento pelo WhatsApp"
            className="absolute -top-6 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f5f] text-white shadow-[0_14px_34px_rgba(12,74,46,.45)] ring-4 ring-[#0a130e] transition active:scale-95"
          >
            <WhatsAppIcon />
          </a>
          <span className="mt-8 text-[10px] font-semibold uppercase tracking-wide text-mineral-100/60">
            WhatsApp
          </span>
        </div>

        {tabs.slice(2).map((tab) => (
          <TabLink key={tab.href} tab={tab} normalizedPath={normalizedPath} />
        ))}
      </div>
    </nav>
  );
}

function TabLink({
  tab,
  normalizedPath,
}: {
  tab: TabItem;
  normalizedPath: string;
}) {
  const normalizedHref = tab.href.replace(/\/$/, "") || "/";
  const active = normalizedPath === normalizedHref;

  return (
    <Link
      href={tab.href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-mineral-300 ${
        active ? "text-mineral-200" : "text-mineral-100/55 active:text-mineral-100"
      }`}
    >
      {tab.icon(active)}
      <span className="text-[10px] font-semibold uppercase tracking-wide">
        {tab.label}
      </span>
      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full transition ${
          active ? "bg-mineral-200" : "bg-transparent"
        }`}
      />
    </Link>
  );
}
