import { ArrowRightIcon, DatabaseIcon, Grid2x2Icon } from "lucide-react";
import Link from "next/link";

import { DatabaseWindowMock, MapperWindowMock } from "@/components/app-window-mocks";
import { SeeDemoButton } from "@/components/product-demo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.92_0_0),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.28_0_0),transparent_55%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="secondary">Item authoring toolkit</Badge>
          <div className="flex flex-col gap-4">
            <h1 className="font-heading max-w-xl text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Create items from sprites and structured JSON.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Two focused editors: map a sprite sheet to item records, then
              refine tables, schema, and exports in a JSON database.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/items" className={cn(buttonVariants({ size: "lg" }))}>
              <Grid2x2Icon />
              Item Mapper
              <ArrowRightIcon />
            </Link>
            <Link
              href="/jsondb"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <DatabaseIcon />
              JSON Database
            </Link>
            <SeeDemoButton />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <MapperWindowMock className="relative z-10" priority />
          <DatabaseWindowMock className="absolute -right-2 -bottom-10 z-20 hidden w-[78%] sm:block lg:-right-4" />
          <div className="h-16 sm:h-20" />
        </div>
      </div>
    </section>
  );
}
