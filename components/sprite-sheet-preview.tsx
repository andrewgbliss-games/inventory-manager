"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { DemoSheet } from "@/lib/demo-sheets";
import { getDemoItem } from "@/lib/demo-sheets";

const pixelated = { imageRendering: "pixelated" } as const;

export function SpriteCell({
  sheet,
  index,
  size,
  className,
}: {
  sheet: DemoSheet;
  index: number;
  size: number;
  className?: string;
}) {
  const item = getDemoItem(sheet, index);
  const col = index % sheet.cols;
  const row = Math.floor(index / sheet.cols);

  return (
    <div
      className={cn("relative shrink-0 overflow-hidden bg-black", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={sheet.src}
        alt={item.name}
        width={sheet.width}
        height={sheet.height}
        unoptimized
        className="absolute max-w-none"
        style={{
          ...pixelated,
          width: sheet.cols * size,
          height: sheet.rows * size,
          left: -col * size,
          top: -row * size,
        }}
      />
    </div>
  );
}

export function SpriteSheetGrid({
  sheet,
  selectedIndex,
  onCellClick,
  priority = false,
  className,
}: {
  sheet: DemoSheet;
  selectedIndex: number;
  onCellClick?: (index: number) => void;
  priority?: boolean;
  className?: string;
}) {
  const interactive = typeof onCellClick === "function";

  return (
    <div className={cn("relative overflow-hidden rounded-md bg-black", className)}>
      <Image
        src={sheet.src}
        alt={`${sheet.name} sprite sheet`}
        width={sheet.width}
        height={sheet.height}
        unoptimized
        priority={priority}
        sizes="(max-width: 768px) 100vw, 480px"
        className="h-auto w-full"
        style={pixelated}
      />
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${sheet.cols}, 1fr)`,
          gridTemplateRows: `repeat(${sheet.rows}, 1fr)`,
        }}
      >
        {sheet.items.map((item, index) => {
          const isSelected = index === selectedIndex;
          const cellClassName = cn(
            "border border-white/10",
            isSelected && "border-2 border-primary bg-primary/20",
            interactive && !isSelected && "hover:bg-white/10"
          );

          if (interactive) {
            return (
              <button
                key={item.id}
                type="button"
                className={cellClassName}
                onClick={() => onCellClick(index)}
                aria-pressed={isSelected}
                aria-label={`Select ${item.name}`}
              />
            );
          }

          return (
            <div
              key={item.id}
              className={cellClassName}
              aria-hidden={isSelected ? undefined : true}
            />
          );
        })}
      </div>
    </div>
  );
}
