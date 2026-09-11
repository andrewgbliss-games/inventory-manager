const steps = [
  {
    step: "01",
    title: "Upload a sprite sheet",
    description:
      "Drop a PNG or WebP into Item Mapper. Set rows, columns, and cell size so each tile is a frame.",
  },
  {
    step: "02",
    title: "Map cells to items",
    description:
      "Click a cell, assign an id, type, and category path. The grid index becomes the frame in your JSON.",
  },
  {
    step: "03",
    title: "Edit tables and schema",
    description:
      "Open JSON Database to refine records, add columns, and keep item data consistent before you export.",
  },
] as const;

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
      aria-labelledby="workflow-heading"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">Workflow</p>
        <h2
          id="workflow-heading"
          className="font-heading mt-2 text-3xl tracking-tight"
        >
          From image to exportable JSON
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Use the mapper when you start from art. Use the database when you
          need to inspect and reshape the records.
        </p>
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((item) => (
          <li
            key={item.step}
            className="flex flex-col gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <span className="font-mono text-sm text-muted-foreground">
              {item.step}
            </span>
            <h3 className="font-heading text-lg tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
