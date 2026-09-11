"use client";

import { DatabaseIcon, Grid2x2Icon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SpriteCell, SpriteSheetGrid } from "@/components/sprite-sheet-preview";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  produceSheet,
  weaponsSheet,
  type DemoSheet,
} from "@/lib/demo-sheets";
import { cn } from "@/lib/utils";

export type DemoTab = "mapper" | "database";

type SeeDemoButtonProps = {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  defaultTab?: DemoTab;
  className?: string;
};

export function SeeDemoButton({
  label = "See the demo",
  variant = "outline",
  size = "lg",
  defaultTab = "mapper",
  className,
}: SeeDemoButtonProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<DemoTab>(defaultTab);
  const [sheet, setSheet] = useState<DemoSheet>(weaponsSheet);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedItem = sheet.items[selectedIndex] ?? sheet.items[0];

  const selectSheet = (nextSheet: DemoSheet) => {
    setSheet(nextSheet);
    setSelectedIndex(0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setTab(defaultTab);
          setSheet(weaponsSheet);
          setSelectedIndex(0);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant={variant} size={size} className={className} />
        }
      >
        <PlayIcon />
        {label}
      </DialogTrigger>
      <DialogContent className="max-h-[min(90vh,48rem)] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product demo</DialogTitle>
          <DialogDescription>
            Click a cell on the weapons or produce sheet. This is sample art —
            open a tool to map your own images.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as DemoTab)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mapper" className="gap-1.5">
              <Grid2x2Icon />
              Item Mapper
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-1.5">
              <DatabaseIcon />
              JSON Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapper" className="mt-3">
            <div className="mb-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={sheet.id === "weapons" ? "default" : "outline"}
                onClick={() => selectSheet(weaponsSheet)}
              >
                WeaponsAndArmor.png
              </Button>
              <Button
                size="sm"
                variant={sheet.id === "produce" ? "default" : "outline"}
                onClick={() => selectSheet(produceSheet)}
              >
                FruitAndVegetable.png
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_14rem]">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {sheet.name} · {sheet.cols} × {sheet.rows}
                </p>
                <SpriteSheetGrid
                  sheet={sheet}
                  selectedIndex={selectedIndex}
                  onCellClick={setSelectedIndex}
                />
                <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                  {sheet.path}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-3">
                <SpriteCell
                  sheet={sheet}
                  index={selectedIndex}
                  size={64}
                  className="rounded-md ring-1 ring-foreground/10"
                />
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{selectedItem.name}</p>
                  <Badge variant="secondary">{selectedItem.category}</Badge>
                </div>
                <dl className="grid gap-2 font-mono text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">id</dt>
                    <dd>{selectedItem.id}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">type</dt>
                    <dd>{selectedItem.type}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">subtype</dt>
                    <dd>{selectedItem.subtype}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">frame</dt>
                    <dd>{selectedIndex}</dd>
                  </div>
                </dl>
                <pre className="mt-auto overflow-x-auto rounded-lg bg-background p-2 font-mono text-[10px] leading-relaxed text-muted-foreground ring-1 ring-foreground/10">
                  {JSON.stringify(
                    {
                      id: selectedItem.id,
                      type: selectedItem.type,
                      subtype: selectedItem.subtype,
                      frame: selectedIndex,
                      texture: {
                        src: sheet.path,
                        x: (selectedIndex % sheet.cols) * sheet.cellSize,
                        y: Math.floor(selectedIndex / sheet.cols) * sheet.cellSize,
                        w: sheet.cellSize,
                        h: sheet.cellSize,
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="database" className="mt-3">
            <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <div className="flex min-h-64">
                <aside className="w-36 shrink-0 border-r bg-muted/40 p-3">
                  <p className="mb-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    Tables
                  </p>
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-md px-2 py-1.5 text-left text-xs",
                      sheet.id === "weapons"
                        ? "bg-secondary font-medium"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                    onClick={() => selectSheet(weaponsSheet)}
                  >
                    weapons
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "mt-1 w-full rounded-md px-2 py-1.5 text-left text-xs",
                      sheet.id === "produce"
                        ? "bg-secondary font-medium"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                    onClick={() => selectSheet(produceSheet)}
                  >
                    produce
                  </button>
                </aside>
                <div className="max-h-80 min-w-0 flex-1 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10"> </TableHead>
                        <TableHead>id</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>type</TableHead>
                        <TableHead>frame</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sheet.items.map((item, index) => (
                        <TableRow
                          key={item.id}
                          data-state={
                            index === selectedIndex ? "selected" : undefined
                          }
                          className="cursor-pointer"
                          onClick={() => setSelectedIndex(index)}
                        >
                          <TableCell>
                            <SpriteCell
                              sheet={sheet}
                              index={index}
                              size={20}
                              className="rounded-sm"
                            />
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {item.id}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.subtype}</TableCell>
                          <TableCell>{index}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Selected{" "}
              <span className="font-medium text-foreground">
                {selectedItem.name}
              </span>{" "}
              from {sheet.name} — in the full editor you can change schema,
              cells, and export JSON.
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          <Link
            href="/items"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Grid2x2Icon />
            Open Item Mapper
          </Link>
          <Link href="/jsondb" className={cn(buttonVariants())}>
            <DatabaseIcon />
            Open JSON Database
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
