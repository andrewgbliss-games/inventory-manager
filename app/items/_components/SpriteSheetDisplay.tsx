/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

interface CellData {
  id: string;
  name: string;
  row: number;
  col: number;
  index: number;
}

interface GridSpriteProps {
  texture: Texture;
  rows: number;
  cols: number;
  onCellClick: (cellData: CellData) => void;
  selectedCell: CellData | null;
  spriteDimensions: { width: number; height: number };
  scale: number;
}

interface SpriteSheetDisplayProps {
  uploadedTexture: Texture | null;
  spriteDimensions: { width: number; height: number };
  scale: number;
  setScale: (scale: number) => void;
  rows: number;
  cols: number;
  selectedCell: CellData | null;
  onCellClick: (cellData: CellData) => void;
}

function GridSprite({
  texture,
  rows,
  cols,
  onCellClick,
  selectedCell,
  spriteDimensions,
  scale,
}: GridSpriteProps) {
  const spriteRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the actual sprite dimensions for display, scaled by the scale factor
  const displayWidth = spriteDimensions.width * scale;
  const displayHeight = spriteDimensions.height * scale;
  const gridCellSize = displayWidth / cols; // Calculate cell size based on display width and columns
  const gridHeight = rows * gridCellSize; // Calculate actual grid height

  const handleClick = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / gridCellSize);
    const row = Math.floor(y / gridCellSize);

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const index = row * cols + col; // Calculate linear index
      const cellId = `${row}-${col}`;
      onCellClick({
        id: cellId,
        name: `Cell ${row}-${col}`,
        row,
        col,
        index,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg overflow-hidden cursor-crosshair"
      style={{
        width: displayWidth,
        height: displayHeight,
      }}
      onClick={handleClick}
    >
      <div
        className="pixi-app-container"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: spriteDimensions.width,
          height: spriteDimensions.height,
        }}
      >
        <Application
          width={spriteDimensions.width}
          height={spriteDimensions.height}
          backgroundColor={0xf0f0f0}
        >
          <pixiSprite
            ref={spriteRef}
            texture={texture}
            width={spriteDimensions.width}
            height={spriteDimensions.height}
          />
        </Application>
      </div>

      {/* Grid overlay - only covers the specified rows and columns */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: displayWidth,
          height: gridHeight,
          backgroundImage: `
            linear-gradient(to right, rgba(255,0,0,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,0,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: `${gridCellSize}px ${gridCellSize}px`,
        }}
      />

      {/* Selected cell highlight */}
      {selectedCell && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/50 bg-opacity-20 pointer-events-none"
          style={{
            left: selectedCell.col * gridCellSize,
            top: selectedCell.row * gridCellSize,
            width: gridCellSize,
            height: gridCellSize,
          }}
        />
      )}
    </div>
  );
}

export default function SpriteSheetDisplay({
  uploadedTexture,
  spriteDimensions,
  scale,
  setScale,
  rows,
  cols,
  selectedCell,
  onCellClick,
}: SpriteSheetDisplayProps) {
  const displayScale = typeof scale === "number" && !Number.isNaN(scale) ? scale : 1;

  const handleScaleChange = (value: number | readonly number[]) => {
    const next = Array.isArray(value) ? value[0] : value;
    if (typeof next === "number" && !Number.isNaN(next)) {
      setScale(next);
    }
  };

  if (!uploadedTexture) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Upload an image to start editing grid cells</p>
          <p className="text-sm mt-2">Supports: PNG, JPG, GIF, WebP</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">Scale:</Label>
        <div className="flex items-center space-x-2 w-32">
          <Slider
            value={[displayScale]}
            onValueChange={handleScaleChange}
            min={0.1}
            max={5}
            step={0.1}
            className="flex-1"
          />
          <span className="text-sm w-8">{displayScale.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>
          Grid: {cols}×{rows} cells ({spriteDimensions.width}×
          {spriteDimensions.height}px sprite,{" "}
          {Math.round(spriteDimensions.width * displayScale)}×
          {Math.round(spriteDimensions.height * displayScale)}px display)
        </span>
      </div>

      <div
        className="border rounded-lg overflow-hidden"
        style={{
          width: spriteDimensions.width * displayScale,
          height: spriteDimensions.height * displayScale,
        }}
      >
        <GridSprite
          texture={uploadedTexture}
          rows={rows}
          cols={cols}
          onCellClick={onCellClick}
          selectedCell={selectedCell}
          spriteDimensions={spriteDimensions}
          scale={displayScale}
        />
      </div>
    </div>
  );
}
