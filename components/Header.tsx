"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  menuPanelVariants,
  motionDurations,
  premiumEase,
} from "@/lib/motion";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 28);
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

  const headerActive = scrolled || open;
  const normalizedPath = stripBasePath(pathname).replace(/\/$/, "") || "/";

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: premiumEase }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5"
    >
      <motion.div
        animate={{
          backgroundColor: headerActive
            ? "rgba(8, 10, 9, 0.78)"
            : "rgba(8, 10, 9, 0.22)",
          borderColor: headerActive
            ? "rgba(247, 244, 237, 0.16)"
            : "rgba(247, 244, 237, 0.10)",
          boxShadow: headerActive
            ? "0 18px 54px rgba(0, 0, 0, 0.22)"
            : "0 10px 34px rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: motionDurations.short, ease: premiumEase }}
        className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-3 rounded-full border px-3 text-mineral-50 backdrop-blur-2xl md:px-4"
      >
        <Link
          href="/"
          className="group flex min-w-0 max-w-[calc(100%-4.5rem)] items-center gap-3 rounded-full px-1 outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 lg:max-w-none"
          aria-label="Plano & Terra - Início"
          onClick={() => setOpen(false)}
        >
          <motion.span
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mineral-50/95 p-1.5 shadow-soft ring-1 ring-white/25"
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

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          {navigation.map((item) => {
            const normalizedHref = item.href.replace(/\/$/, "") || "/";
            const active = normalizedPath === normalizedHref;
            return (
              <Link
                key={item.href}
                href={item.href}
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
                <span
                  className={`relative z-10 transition ${
                    active ? "text-ink-950" : ""
                  }`}
                >
                  {item.label}
                </span>
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

        <motion.button
          type="button"
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          className="relative z-50 ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-mineral-50 shadow-soft backdrop-blur-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className="relative block h-4 w-5">
            <motion.span
              animate={
                open
                  ? { y: 5, rotate: 45 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: motionDurations.short, ease: premiumEase }}
              className="absolute left-0 top-1 h-px w-5 bg-current"
            />
            <motion.span
              animate={
                open
                  ? { y: -5, rotate: -45 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: motionDurations.short, ease: premiumEase }}
              className="absolute bottom-1 left-0 h-px w-5 bg-current"
            />
          </span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-30 bg-ink-950/20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionDurations.short, ease: premiumEase }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              variants={menuPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: motionDurations.overlay, ease: premiumEase }}
              className="fixed inset-x-3 top-24 z-40 overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink-950/92 shadow-premium backdrop-blur-2xl lg:hidden"
            >
              <motion.nav
                className="p-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.055,
                      delayChildren: 0.08,
                    },
                  },
                }}
                aria-label="Navegação mobile"
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.32, ease: premiumEase }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium text-mineral-50 transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-mineral-300 transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.32, ease: premiumEase }}
                  className="mt-3 grid gap-3 border-t border-white/10 p-3"
                >
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
                    className="btn btn-dark-secondary justify-center"
                  >
                    Ligar {site.phoneLabel}
                  </a>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
