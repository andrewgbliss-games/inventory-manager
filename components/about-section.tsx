import Image from "next/image";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pillars = [
  {
    title: "Edited, not endless",
    description:
      "We keep a short floor. Each piece earns its place through use, repairability, and a clear maker.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    alt: "Handmade ceramic bowls and plates arranged on a wooden table",
  },
  {
    title: "Makers we know",
    description:
      "Studio visits, small batches, and names on the invoice. If we cannot tell you who made it, we do not stock it.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
    alt: "Woodworker shaping a piece at a sunlit bench",
  },
  {
    title: "Built for daily use",
    description:
      "Nothing here is meant to sit behind glass. Bring it home, cook with it, sit in it, and wear it in.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    alt: "A kitchen counter set with linens, wood boards, and everyday tools",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t bg-muted/40"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">About</p>
          <h2
            id="about-heading"
            className="font-heading mt-2 text-3xl tracking-tight"
          >
            A shop with a point of view
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Northline started as a buying desk for a few households and grew
            into a storefront on Pine Street. We still buy the same way: slowly,
            in person, and with the next decade in mind.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="overflow-hidden pt-0">
              <div className="relative aspect-4/3">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription>{pillar.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
