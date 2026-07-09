"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionDurations, premiumEase } from "@/lib/motion";
import {
  navigation,
  primaryWhatsappLink,
  site,
  stripBasePath,
  withBasePath,
} from "@/lib/site";

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
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 28);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const headerActive = scrolled;
  const normalizedPath = stripBasePath(pathname).replace(/\/$/, "") || "/";

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: premiumEase }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 md:px-5 md:pt-3"
    >
      <motion.div
        animate={{
          y: headerActive ? -2 : 0,
          height: headerActive ? "3.75rem" : "4rem",
          backgroundColor: headerActive
            ? "rgba(6, 14, 10, 0.82)"
            : "rgba(6, 14, 10, 0.18)",
          borderColor: headerActive
            ? "rgba(247, 244, 237, 0.18)"
            : "rgba(247, 244, 237, 0.09)",
          boxShadow: headerActive
            ? "0 18px 60px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255,255,255,.07)"
            : "0 10px 34px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,.05)",
        }}
        transition={{ duration: motionDurations.short, ease: premiumEase }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border px-3 text-mineral-50 backdrop-blur-2xl md:px-4"
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-full px-1 outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
          aria-label="Plano & Terra - Início"
        >
          <motion.span
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-mineral-50/95 p-1 shadow-soft ring-1 ring-white/25 md:h-11 md:w-11 md:p-1.5"
          >
            <Image
              src={withBasePath("/assets/logo-plano-terra.svg")}
              alt=""
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </motion.span>
          <span className="min-w-0 leading-tight">
            <strong className="block truncate text-sm font-semibold text-mineral-50 md:text-base">
              {site.name}
            </strong>
            <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-mineral-100/65 max-[430px]:hidden sm:text-[11px] sm:tracking-[0.22em]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navigation.map((item) => {
            const normalizedHref = item.href.replace(/\/$/, "") || "/";
            const active = normalizedPath === normalizedHref;
            const hovered = hoveredHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setHoveredHref(item.href)}
                onBlur={() => setHoveredHref(null)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-mineral-50/76 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-mineral-300"
              >
                {active ? (
                  <motion.span
                    layoutId="site-nav-active"
                    className="absolute inset-0 rounded-full bg-mineral-50 shadow-[0_8px_22px_rgba(247,244,237,.16)]"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.8,
                    }}
                  />
                ) : null}
                {hovered && !active ? (
                  <motion.span
                    layoutId="site-nav-hover"
                    className="absolute inset-0 rounded-full bg-white/[0.075]"
                    transition={{
                      duration: motionDurations.short,
                      ease: premiumEase,
                    }}
                  />
                ) : null}
                <span
                  className={`relative z-10 transition ${
                    active ? "text-ink-950" : ""
                  }`}
                >
                  {item.label}
                </span>
                <motion.span
                  aria-hidden="true"
                  className={`absolute bottom-1.5 left-4 right-4 h-px origin-left rounded-full ${
                    active ? "bg-ink-950/40" : "bg-mineral-200/70"
                  }`}
                  initial={false}
                  animate={{
                    scaleX: active || hovered ? 1 : 0,
                    opacity: active || hovered ? 1 : 0,
                  }}
                  transition={{
                    duration: motionDurations.short,
                    ease: premiumEase,
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <motion.a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Plano & Terra"
            whileHover={reduceMotion ? undefined : { y: -1, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.035] text-mineral-50/80 transition hover:border-mineral-200/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
          >
            <InstagramIcon />
          </motion.a>
          <motion.a
            href={primaryWhatsappLink}
            target="_blank"
            rel="noreferrer"
            whileHover={reduceMotion ? undefined : { y: -1, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className="btn btn-primary"
          >
            Solicitar atendimento
          </motion.a>
        </div>

        <a
          href={`tel:${site.phone}`}
          aria-label={`Ligar para ${site.phoneLabel}`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-mineral-50 shadow-soft backdrop-blur-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 lg:hidden"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
            <path
              d="M7.1 4.2c.5-.5 1.3-.5 1.8 0l1.9 1.9c.5.5.5 1.3 0 1.8l-1 1c-.2.2-.3.6-.1.9a12.4 12.4 0 0 0 4.5 4.5c.3.2.7.1.9-.1l1-1c.5-.5 1.3-.5 1.8 0l1.9 1.9c.5.5.5 1.3 0 1.8l-1.2 1.2c-.7.7-1.7 1-2.6.7-2.5-.8-4.9-2.3-6.9-4.3s-3.5-4.4-4.3-6.9c-.3-.9 0-1.9.7-2.6l1.2-1.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </motion.header>
  );
}
