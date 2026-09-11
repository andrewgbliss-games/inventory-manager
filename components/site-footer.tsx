import { BoxesIcon } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const footerColumns = [
  {
    title: "Tools",
    links: [
      { href: "/items", label: "Item Mapper" },
      { href: "/jsondb", label: "JSON Database" },
    ],
  },
  {
    title: "On this page",
    links: [
      { href: "#tools", label: "Overview" },
      { href: "#workflow", label: "Workflow" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Link href="#top" className="flex items-center gap-2 font-medium">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BoxesIcon className="size-4" />
              </span>
              <span className="font-heading">Item Editor</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Map sprite sheets to item JSON, then edit and export tables in
              the browser.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className="text-sm font-medium">{column.title}</p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Item Editor. Local tooling for game
          item data.
        </p>
      </div>
    </footer>
  );
}
