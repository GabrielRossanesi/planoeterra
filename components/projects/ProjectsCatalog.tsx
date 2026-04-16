"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects, Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function ProjectsCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [initialVisual, setInitialVisual] = useState<"image" | "3d">("image");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const openProject = (project: Project, visual: "image" | "3d" = "image") => {
    setInitialVisual(visual);
    setSelectedProject(project);
  };

  return (
    <section id="projetos" className="section-padding bg-mineral-50">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Projetos em evidência"
              title="Explore por categoria e padrão de execução."
              description="Uma vitrine técnica para percorrer contexto, escopo, mídia e entregáveis em poucos segundos."
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="grid gap-4 rounded-[1.7rem] border border-ink-950/10 bg-white/65 p-5 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Resultados
                  </span>
                  <strong className="mt-2 block text-3xl text-ink-950">
                    {String(filteredProjects.length).padStart(2, "0")}
                  </strong>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Camada visual
                  </span>
                  <strong className="mt-2 block text-base text-ink-950">
                    2D e 3D
                  </strong>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Experiência
                  </span>
                  <strong className="mt-2 block text-base text-ink-950">
                    Galeria + detalhe
                  </strong>
                </div>
              </div>
              <ProjectFilters
                categories={projectCategories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={Math.min(index * 70, 260)}>
              <ProjectCard project={project} onSelect={openProject} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        initialVisual={initialVisual}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}


