type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <span
        className={`eyebrow ${
          tone === "dark" ? "text-mineral-200" : "text-forest-700"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-normal md:text-5xl ${
          tone === "dark" ? "text-mineral-50" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "dark" ? "text-mineral-100/80" : "text-ink-500"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

