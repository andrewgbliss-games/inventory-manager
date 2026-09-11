/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Texture } from "pixi.js";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import ItemDataPanel from "./ItemDataPanel";
import ExportPanel from "./ExportPanel";
import categoriesData from "../_data/item-categories.json";
import itemTypesData from "../_data/item-types.json";

interface CellData {
  id: string;
  name: string;
  row: number;
  col: number;
  index: number;
}

interface SpriteSheetData {
  path: string;
  cell_size: number;
  hframes: number;
  vframes: number;
}

interface ItemData {
  id: string;
  type: string;
  subtype: string;
  frame: number;
  categoryPath?: string[];
  color?: string;
}

interface Category {
  id: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  subcategories?: Subcategory[];
}

interface ItemType {
  id: string;
  category: string;
  variants: string[];
}

// Type the imported JSON data
const categories: Category[] = categoriesData;
const itemTypes: ItemType[] = itemTypesData;

export default function ItemIcons() {
  const [uploadedTexture, setUploadedTexture] = useState<Texture | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [spriteDimensions, setSpriteDimensions] = useState({
    width: 512,
    height: 512,
  });
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(3);
  const [selectedCell, setSelectedCell] = useState<CellData | null>(null);
  const [spriteSheetData, setSpriteSheetData] = useState<SpriteSheetData>({
    path: "",
    cell_size: 16,
    hframes: 3,
    vframes: 2,
  });
  const [spriteSheetId, setSpriteSheetId] = useState("sprite_sheet");
  const [spriteSheetName, setSpriteSheetName] = useState("Sprite Atlas");
  const [itemData, setItemData] = useState<Record<number, ItemData>>({});
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>(
    [],
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const texture = Texture.from(img);
        // Set the scale mode on the texture source
        texture.source.scaleMode = "nearest";
        setUploadedTexture(texture);
        setUploadedImageUrl(e.target?.result as string);
        setSpriteDimensions({ width: img.width, height: img.height });

        setSpriteSheetData((prev) => ({
          ...prev,
          hframes: cols,
          vframes: rows,
        }));

        setIsLoading(false);
        setSelectedCell(null);
      };
      img.onerror = () => {
        setError("Failed to load image");
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setError("Failed to read file");
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCellClick = (cellData: CellData) => {
    setSelectedCell(cellData);
    // Load the category path for the selected cell
    const cellItemData = itemData[cellData.index];
    setSelectedCategoryPath(cellItemData?.categoryPath || []);
  };

  const handlePathChange = (newPath: string) => {
    setSpriteSheetData((prev) => ({
      ...prev,
      path: newPath,
    }));
  };

  const handleCellSizeChange = (newCellSize: number) => {
    setSpriteSheetData((prev) => ({
      ...prev,
      cell_size: newCellSize,
    }));
  };

  const updateGridSize = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);

    setSpriteSheetData((prev) => ({
      ...prev,
      hframes: newCols,
      vframes: newRows,
    }));
  };

  const updateItemData = (
    index: number,
    field: keyof ItemData,
    value: string | number | string[],
  ) => {
    setItemData((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {
          id: index.toString(),
          type: "",
          subtype: "",
          frame: index,
          color: "",
        }),
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Items Editor</CardTitle>
          <CardDescription>
            Upload an image and click on grid cells to edit their item data.
            Each cell corresponds to a grid index.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="flex-1"
            />
            {isLoading && (
              <div className="text-sm text-muted-foreground">Loading...</div>
            )}
          </div>

          {uploadedTexture && (
            <>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Rows (vframes):</Label>
                  <Input
                    type="number"
                    value={rows}
                    onChange={(e) =>
                      updateGridSize(parseInt(e.target.value) || 2, cols)
                    }
                    className="w-20"
                    min="1"
                    max="32"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">
                    Columns (hframes):
                  </Label>
                  <Input
                    type="number"
                    value={cols}
                    onChange={(e) =>
                      updateGridSize(rows, parseInt(e.target.value) || 3)
                    }
                    className="w-20"
                    min="1"
                    max="32"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Cell Size:</Label>
                  <Input
                    type="number"
                    value={spriteSheetData.cell_size}
                    onChange={(e) =>
                      handleCellSizeChange(parseInt(e.target.value) || 16)
                    }
                    className="w-20"
                    min="8"
                    max="128"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium">Path:</Label>
                <Input
                  value={spriteSheetData.path}
                  onChange={(e) => handlePathChange(e.target.value)}
                  placeholder="res://assets/img/potions.png"
                  className="flex-1"
                />
              </div>
            </>
          )}

          {error && <div className="text-sm text-red-500">{error}</div>}

          {uploadedTexture && (
            <div className="flex space-x-6">
              <div className="flex-1">
                <SpriteSheetDisplay
                  uploadedTexture={uploadedTexture}
                  spriteDimensions={spriteDimensions}
                  scale={scale}
                  setScale={setScale}
                  rows={rows}
                  cols={cols}
                  selectedCell={selectedCell}
                  onCellClick={handleCellClick}
                />
              </div>

              <div className="w-96 space-y-4">
                <ItemDataPanel
                  selectedCell={selectedCell}
                  itemData={itemData}
                  updateItemData={updateItemData}
                  categories={categories}
                  itemTypes={itemTypes}
                  spriteDimensions={spriteDimensions}
                  rows={rows}
                  cols={cols}
                  selectedCategoryPath={selectedCategoryPath}
                  setSelectedCategoryPath={setSelectedCategoryPath}
                />

                <ExportPanel
                  spriteSheetId={spriteSheetId}
                  setSpriteSheetId={setSpriteSheetId}
                  spriteSheetName={spriteSheetName}
                  setSpriteSheetName={setSpriteSheetName}
                  spriteSheetData={spriteSheetData}
                  itemData={itemData}
                  rows={rows}
                  cols={cols}
                  itemTypes={itemTypes}
                  onImport={setItemData}
                />
              </div>
            </div>
          )}

          {!uploadedTexture && !isLoading && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Upload an image to start editing grid cells</p>
                <p className="text-sm mt-2">Supports: PNG, JPG, GIF, WebP</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
