import { hasPublished3D, Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project, visual?: "image" | "3d") => void;
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const published3D = hasPublished3D(project);

  return (
    <article className="group h-full overflow-hidden rounded-[1.7rem] border border-ink-950/10 bg-mineral-50 shadow-[0_18px_55px_rgba(8,10,9,.08)] transition duration-300 hover:-translate-y-1 hover:border-forest-700/25">
      <button
        type="button"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        onClick={() => onSelect(project, published3D ? "3d" : "image")}
        aria-label={`Ver detalhes do projeto ${project.title}`}
      >
        <span className="relative block aspect-[4/3] overflow-hidden bg-ink-950">
          <img
            src={project.coverImage}
            alt={`${project.title} em ${project.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-mineral-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-forest-800">
            {project.category}
          </span>
          {published3D ? (
            <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-mineral-200/30 bg-ink-950/60 p-3 text-mineral-50 backdrop-blur">
              <span>
                <strong className="block text-sm">
                  {project.modelBadgeLabel || "Visualização 3D"}
                </strong>
                <span className="text-xs text-mineral-100/70">
                  {project.modelCtaLabel || "Abrir modelo"}
                </span>
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mineral-200 text-ink-950">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12 2 4.5 6.25v11.5L12 22l7.5-4.25V6.25L12 2Zm0 1.96 5.66 3.2L12 10.36 6.34 7.16 12 3.96Zm-6 4.58 5.1 2.9v7.64L6 16.2V8.54Zm12 0v7.66l-5.1 2.88v-7.64L18 8.54Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </span>
          ) : project.has3dModel ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-ink-950/48 px-3 py-1 text-xs font-semibold text-mineral-100 backdrop-blur">
              3D preparado
            </span>
          ) : null}
        </span>

        <span className="block p-6">
          <span className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">
            <span>{project.id}</span>
            <span>{project.areaLabel}</span>
          </span>
          <span className="mt-4 block text-sm text-ink-500">
            {project.location}
          </span>
          <strong className="mt-2 block text-2xl font-semibold leading-tight text-ink-950">
            {project.title}
          </strong>
          <span className="mt-3 block text-sm font-medium text-ink-700">
            {project.serviceType}
          </span>
          <span className="mt-4 block text-sm leading-7 text-ink-500">
            {project.shortDescription}
          </span>
          <span className="mt-7 flex items-center justify-between border-t border-ink-950/10 pt-5 text-sm">
            <span className="text-ink-500">{project.status}</span>
            <strong className="text-forest-700">
              {published3D ? "Detalhes e mídia" : "Ver projeto"}
            </strong>
          </span>
        </span>
      </button>
    </article>
  );
}


