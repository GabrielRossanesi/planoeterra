type ProjectFiltersProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function ProjectFilters({
  categories,
  activeCategory,
  onChange,
}: ProjectFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      aria-label="Filtrar projetos por categoria"
    >
      {categories.map((category) => {
        const active = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 ${
              active
                ? "border-forest-800 bg-forest-800 text-mineral-50 shadow-soft"
                : "border-ink-950/10 bg-white/70 text-ink-700 hover:border-forest-700/30 hover:bg-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

