import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { primaryWhatsappLink, withBasePath } from "@/lib/site";
import { ScrollReveal } from "@/components/ScrollReveal";

type InteriorHeroProps = {
  eyebrow: string;
  kicker?: string;
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function InteriorHero({
  eyebrow,
  kicker,
  title,
  description,
  image = "/photos/aerea-bairro-02.webp",
  children,
  secondaryHref,
  secondaryLabel,
}: InteriorHeroProps) {
  const internalSecondaryLink = secondaryHref?.startsWith("/");

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-28 text-mineral-50 md:pt-32">
      <Image
        src={withBasePath(image)}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,8,.95),rgba(5,10,8,.74)_48%,rgba(5,10,8,.36)),linear-gradient(0deg,rgba(5,10,8,.9),transparent_64%)]" />
      <div className="absolute inset-0 precision-grid opacity-[0.16]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-14 md:px-8 md:pb-20 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
        <ScrollReveal initialVisible className="min-w-0 max-w-full lg:max-w-4xl">
          <span className="eyebrow text-mineral-200">{eyebrow}</span>
          {kicker ? (
            <p className="mt-4 text-xs uppercase tracking-[0.26em] text-mineral-100/70 md:mt-5 md:text-sm md:tracking-[0.34em]">
              {kicker}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-full text-balance break-words font-display text-[2rem] font-semibold leading-[1.08] md:mt-6 md:text-7xl md:leading-[1.04]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-mineral-100/75 md:mt-7 md:text-lg md:leading-8">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-9">
            <a
              className="btn btn-primary justify-center"
              href={primaryWhatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar atendimento
            </a>
            {secondaryHref && secondaryLabel ? (
              internalSecondaryLink ? (
                <Link
                  className="btn btn-dark-secondary justify-center"
                  href={secondaryHref}
                >
                  {secondaryLabel}
                </Link>
              ) : (
                <a
                  className="btn btn-dark-secondary justify-center"
                  href={secondaryHref}
                >
                  {secondaryLabel}
                </a>
              )
            ) : null}
          </div>
        </ScrollReveal>

        {children ? (
          <ScrollReveal initialVisible delay={140} className="hidden lg:block">
            {children}
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
