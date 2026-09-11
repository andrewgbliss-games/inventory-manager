import { ArrowRightIcon, DatabaseIcon, Grid2x2Icon } from "lucide-react";
import Link from "next/link";

import { DatabaseWindowMock, MapperWindowMock } from "@/components/app-window-mocks";
import { SeeDemoButton } from "@/components/product-demo";
import { buttonVariants } from "@/components/ui/button";
import { produceSheet } from "@/lib/demo-sheets";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    href: "/items",
    icon: Grid2x2Icon,
    title: "Item Mapper",
    path: "/items",
    description:
      "Upload a sprite sheet, set the grid, and click cells to assign ids, types, and categories. Export a JSON map ready for your game.",
    preview: <MapperWindowMock sheet={produceSheet} selectedIndex={2} />,
    demoTab: "mapper" as const,
    cta: "Open Item Mapper",
  },
  {
    href: "/jsondb",
    icon: DatabaseIcon,
    title: "JSON Database",
    path: "/jsondb",
    description:
      "Edit item tables with a schema-aware grid. Add columns, inspect types, and export JSON without leaving the browser.",
    preview: <DatabaseWindowMock />,
    demoTab: "database" as const,
    cta: "Open JSON Database",
  },
] as const;

export function ToolsSection() {
  return (
    <section
      id="tools"
      className="border-t bg-muted/40"
      aria-labelledby="tools-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Tools</p>
          <h2
            id="tools-heading"
            className="font-heading mt-2 text-3xl tracking-tight"
          >
            Two editors, one item pipeline
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Start with pixels or with records. Each app does one job well, and
            both speak JSON.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {tools.map((tool) => (
            <Card key={tool.href} className="pt-0">
              <div className="border-b bg-muted/30 p-4">{tool.preview}</div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tool.icon className="size-4" />
                  {tool.title}
                </CardTitle>
                <CardDescription>
                  <span className="font-mono text-xs">{tool.path}</span>
                  <span className="mt-2 block leading-relaxed">
                    {tool.description}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                <Link href={tool.href} className={cn(buttonVariants())}>
                  {tool.cta}
                  <ArrowRightIcon />
                </Link>
                <SeeDemoButton
                  label="Preview demo"
                  variant="outline"
                  size="default"
                  defaultTab={tool.demoTab}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
