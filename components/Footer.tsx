import Image from "next/image";
import Link from "next/link";
import { navigation, primaryWhatsappLink, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-mineral-50">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 border-y border-white/10 py-10 md:grid-cols-[1.4fr_.8fr_.8fr]">
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
            >
              <span className="relative h-14 w-14 overflow-hidden rounded-full bg-mineral-50 p-2">
                <Image
                  src="/assets/logo-plano-terra.svg"
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </span>
              <span>
                <strong className="block text-lg">{site.name}</strong>
                <span className="text-sm text-mineral-100/70">
                  {site.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-mineral-100/70">
              Topografia, agrimensura e regularização fundiária com leitura
              técnica clara para imóveis urbanos e rurais.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-mineral-300">
              Contato
            </span>
            <div className="mt-5 grid gap-3 text-sm text-mineral-100/75">
              <a className="footer-link" href={primaryWhatsappLink} target="_blank" rel="noreferrer">
                WhatsApp: atendimento direto
              </a>
              <a className="footer-link" href={`tel:${site.phone}`}>
                Telefone: {site.phoneLabel}
              </a>
              <a className="footer-link" href={site.instagram} target="_blank" rel="noreferrer">
                Instagram: @planoeterra
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-mineral-300">
              Links rápidos
            </span>
            <div className="mt-5 grid gap-3 text-sm text-mineral-100/75">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-mineral-100/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Plano & Terra. Todos os direitos reservados.</p>
          <a
            href={site.creditUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-mineral-50"
          >
            Desenvolvido por <strong>Morales Soluções</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}


