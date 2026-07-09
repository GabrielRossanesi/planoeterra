import Link from "next/link";
import { featuredProjects, hasPublished3D } from "@/data/projects";
import { MotionSurface } from "@/components/MotionSurface";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function ProjectsPreview() {
  return (
    <section className="section-padding bg-mineral-50">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Prova de capacidade"
              title="Projetos que comunicam execução."
              description="Uma prévia do portfólio técnico, com contexto, categoria e mídia pronta para exploração."
            />
          </ScrollReveal>
          <ScrollReveal delay={120} className="hidden md:block">
            <Link className="btn btn-secondary" href="/projetos">
              Explorar projetos
            </Link>
          </ScrollReveal>
        </div>

        <div className="snap-row mt-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 80}
              className={`snap-card ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <MotionSurface className="h-full">
                <Link
                  href="/projetos"
                  className="group block h-full overflow-hidden rounded-[1.6rem] bg-ink-950 text-mineral-50 shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={`${project.title}, ${project.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-premium group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                    {hasPublished3D(project) ? (
                      <span className="absolute right-4 top-4 rounded-full border border-mineral-200/30 bg-ink-950/60 px-3 py-1 text-xs font-semibold text-mineral-100 backdrop-blur">
                        3D disponível
                      </span>
                    ) : null}
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mineral-300">
                        {project.category}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-mineral-100/70">
                        {project.location} · {project.areaLabel}
                      </p>
                    </div>
                  </div>
                </Link>
              </MotionSurface>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-6 md:hidden">
          <Link className="btn btn-secondary w-full justify-center" href="/projetos">
            Explorar todos os projetos
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
