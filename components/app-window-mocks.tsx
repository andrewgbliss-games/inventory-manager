import { DatabaseIcon, Grid2x2Icon } from "lucide-react";
import type { ReactNode } from "react";

import { SpriteCell, SpriteSheetGrid } from "@/components/sprite-sheet-preview";
import { produceSheet, weaponsSheet, type DemoSheet } from "@/lib/demo-sheets";
import { cn } from "@/lib/utils";

const databasePreviewRows = [
  { sheet: weaponsSheet, index: 0 },
  { sheet: weaponsSheet, index: 8 },
  { sheet: weaponsSheet, index: 13 },
  { sheet: produceSheet, index: 2 },
  { sheet: produceSheet, index: 14 },
  { sheet: produceSheet, index: 26 },
] as const;

function WindowChrome({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b bg-muted/50 px-3 py-2">
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
      </div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {title}
      </div>
    </div>
  );
}

export function MapperWindowMock({
  className,
  sheet = weaponsSheet,
  selectedIndex = 0,
  priority = false,
}: {
  className?: string;
  sheet?: DemoSheet;
  selectedIndex?: number;
  priority?: boolean;
}) {
  const item = sheet.items[selectedIndex] ?? sheet.items[0];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-foreground/10",
        className
      )}
    >
      <WindowChrome
        icon={<Grid2x2Icon className="size-3.5" />}
        title="Item Mapper"
      />
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_9rem]">
        <div className="space-y-1.5">
          <SpriteSheetGrid
            sheet={sheet}
            selectedIndex={selectedIndex}
            priority={priority}
          />
          <p className="truncate font-mono text-[10px] text-muted-foreground">
            {sheet.path}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-muted/60 p-2.5">
          <SpriteCell sheet={sheet} index={selectedIndex} size={48} className="rounded-md" />
          <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Frame {selectedIndex}
          </p>
          <div className="space-y-1 font-mono text-[10px] leading-tight">
            <p>id: {item.id}</p>
            <p>type: {item.subtype}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DatabaseWindowMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-foreground/10",
        className
      )}
    >
      <WindowChrome
        icon={<DatabaseIcon className="size-3.5" />}
        title="JSON Database"
      />
      <div className="flex min-h-40">
        <div className="w-24 shrink-0 border-r bg-muted/30 p-2">
          <p className="mb-2 text-[10px] font-medium text-muted-foreground">
            Tables
          </p>
          <div className="space-y-1">
            <div className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium">
              items
            </div>
            <div className="rounded-md px-2 py-1 text-[11px] text-muted-foreground">
              produce
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1 p-2">
          <table className="w-full text-left text-[10px]">
            <thead className="text-muted-foreground">
              <tr>
                <th className="px-1.5 py-1 font-medium"> </th>
                <th className="px-1.5 py-1 font-medium">id</th>
                <th className="px-1.5 py-1 font-medium">type</th>
                <th className="px-1.5 py-1 font-medium">frame</th>
              </tr>
            </thead>
            <tbody>
              {databasePreviewRows.map((row, index) => {
                const item = row.sheet.items[row.index];
                return (
                  <tr
                    key={`${row.sheet.id}-${item.id}`}
                    className={cn("border-t", index === 0 && "bg-muted/70")}
                  >
                    <td className="px-1.5 py-1">
                      <SpriteCell
                        sheet={row.sheet}
                        index={row.index}
                        size={16}
                        className="rounded-sm"
                      />
                    </td>
                    <td className="truncate px-1.5 py-1.5 font-mono">{item.id}</td>
                    <td className="px-1.5 py-1.5">{item.subtype}</td>
                    <td className="px-1.5 py-1.5">{row.index}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
