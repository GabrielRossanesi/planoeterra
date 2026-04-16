"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, primaryWhatsappLink, site } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm8.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 1.8A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 18);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        scrolled || open
          ? "bg-ink-950/80 shadow-[0_12px_42px_rgba(0,0,0,.16)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
        <Link
          href="/"
          className="group flex min-w-0 max-w-[calc(100%-4rem)] items-center gap-3 rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-mineral-300 lg:max-w-none"
          aria-label="Plano & Terra - Início"
          onClick={() => setOpen(false)}
        >
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-mineral-50/90 p-1.5 shadow-soft ring-1 ring-white/20">
            <Image
              src="/assets/logo-plano-terra.svg"
              alt=""
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="min-w-0 leading-tight">
            <strong className="block truncate text-sm font-semibold text-mineral-50 md:text-base">
              {site.name}
            </strong>
            <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-mineral-100/65 max-[430px]:hidden sm:text-[11px] sm:tracking-[0.22em]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl lg:flex">
          {navigation.slice(0, 4).map((item) => {
            const normalizedPath = pathname.replace(/\/$/, "") || "/";
            const normalizedHref = item.href.replace(/\/$/, "") || "/";
            const active = normalizedPath === normalizedHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                  active
                    ? "bg-mineral-50 text-ink-950"
                    : "text-mineral-50/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Plano & Terra"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-mineral-50/80 transition hover:border-mineral-200/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
          >
            <InstagramIcon />
          </a>
          <a
            href={primaryWhatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Solicitar atendimento
          </a>
        </div>

        <button
          type="button"
          className="fixed right-5 top-[18px] z-50 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-950/70 text-mineral-50 shadow-soft backdrop-blur-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-1 h-px w-5 bg-current transition ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-1 left-0 h-px w-5 bg-current transition ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-3 top-24 z-40 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-950/95 shadow-premium backdrop-blur-2xl transition duration-300 ease-premium lg:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="p-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium text-mineral-50 transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
              <span aria-hidden="true" className="text-mineral-300">
                →
              </span>
            </Link>
          ))}
          <div className="mt-3 grid gap-3 border-t border-white/10 p-3">
            <a
              href={primaryWhatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary justify-center"
            >
              Solicitar atendimento
            </a>
            <a
              href={`tel:${site.phone}`}
              className="btn btn-secondary justify-center"
            >
              Ligar {site.phoneLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}


