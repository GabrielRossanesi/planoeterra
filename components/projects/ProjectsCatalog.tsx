"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { projects, Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { premiumEase } from "@/lib/motion";

const filterCategories = [
  "Todos",
  "Usucapião",
  "Georreferenciamento",
  "Levantamento topográfico",
  "Drone/RTK",
  "Projetos com 3D",
];

export function ProjectsCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [initialVisual, setInitialVisual] = useState<"image" | "3d">("image");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    if (activeCategory === "Usucapião") {
      return projects.filter((p) => p.category === "Usucapião");
    }
    if (activeCategory === "Georreferenciamento") {
      return projects.filter((p) =>
        p.category.toLowerCase().includes("georreferenciamento")
      );
    }
    if (activeCategory === "Levantamento topográfico") {
      return projects.filter((p) => p.category === "Levantamento topográfico");
    }
    if (activeCategory === "Drone/RTK") {
      return projects.filter((p) => p.usesDroneRTK);
    }
    if (activeCategory === "Projetos com 3D") {
      return projects.filter((p) => p.has3dModel);
    }
    return projects;
  }, [activeCategory]);

  const openProject = (project: Project, visual: "image" | "3d" = "image") => {
    setInitialVisual(visual);
    setSelectedProject(project);
  };

  return (
    <section id="projetos" className="bg-mineral-50 pb-16 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Projetos em evidência"
              title="Explore por categoria e padrão de execução."
              description="Uma vitrine técnica para percorrer contexto, escopo, mídia e entregáveis em poucos segundos."
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="grid gap-4 md:rounded-[1.7rem] md:border md:border-ink-950/10 md:bg-white/65 md:p-5 md:shadow-soft">
              <div className="hidden gap-3 sm:grid-cols-3 md:grid">
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
                categories={filterCategories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </ScrollReveal>
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.38,
                    ease: premiumEase,
                    delay: Math.min(index * 0.035, 0.16),
                  }}
                >
                  <ProjectCard project={project} onSelect={openProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            initialVisual={initialVisual}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}


