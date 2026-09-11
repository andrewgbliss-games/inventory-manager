"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImportDialog from "./ImportDialog";

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

interface ItemType {
  id: string;
  category: string;
  variants: string[];
}

interface ExportPanelProps {
  spriteSheetId: string;
  setSpriteSheetId: (id: string) => void;
  spriteSheetName: string;
  setSpriteSheetName: (name: string) => void;
  spriteSheetData: SpriteSheetData;
  itemData: Record<number, ItemData>;
  rows: number;
  cols: number;
  itemTypes: ItemType[];
  onImport: (mergedData: Record<number, ItemData>) => void;
}

export default function ExportPanel({
  spriteSheetId,
  setSpriteSheetId,
  spriteSheetName,
  setSpriteSheetName,
  spriteSheetData,
  itemData,
  rows,
  cols,
  itemTypes,
  onImport,
}: ExportPanelProps) {
  const getItemData = (index: number): ItemData => {
    return (
      itemData[index] || {
        id: index.toString(),
        type: "",
        subtype: "",
        frame: index,
      }
    );
  };

  const exportCombinedData = () => {
    const spriteSheetExport = {
      id: spriteSheetId,
      name: spriteSheetName,
      atlas: {
        path: spriteSheetData.path || "res://assets/img/uploaded-sprite.png",
        cell_size: spriteSheetData.cell_size,
        hframes: spriteSheetData.hframes,
        vframes: spriteSheetData.vframes,
      },
    };

    const itemsArray = Array.from({ length: rows * cols }, (_, i) => {
      const itemData = getItemData(i);

      // Use the category path stored in the item data
      const categoryPath = itemData.categoryPath || [];
      const categoryString = categoryPath.join(".");
      const matchingItemType = itemTypes.find(
        (itemType) =>
          itemType.category === categoryString && itemType.id === itemData.type
      );

      // Build the item data using category structure
      const itemExport: {
        id: string;
        frame: number;
        category?: string[];
        itemType?: string;
        variant?: string;
        color?: string;
      } = {
        id: itemData.id,
        frame: i,
      };

      // Add category path if we have one
      if (categoryPath.length > 0) {
        itemExport.category = categoryPath;
      }

      // Add item type and variant if we have them
      if (itemData.type && matchingItemType) {
        itemExport.itemType = itemData.type;
        if (itemData.subtype) {
          itemExport.variant = itemData.subtype;
        }
      }

      // Add color if we have one
      if (itemData.color) {
        itemExport.color = itemData.color;
      }

      return itemExport;
    });

    const combinedData = {
      spriteSheet: spriteSheetExport,
      items: itemsArray,
    };

    return JSON.stringify(combinedData, null, 2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Export Data</CardTitle>
          <ImportDialog currentItemData={itemData} onImport={onImport} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Sprite Sheet ID:</Label>
          <Input
            value={spriteSheetId}
            onChange={(e) => setSpriteSheetId(e.target.value)}
            placeholder="coins"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Sprite Sheet Name:</Label>
          <Input
            value={spriteSheetName}
            onChange={(e) => setSpriteSheetName(e.target.value)}
            placeholder="Coin Atlas"
          />
        </div>
        <div>
          <Label className="text-sm">Combined Data:</Label>
          <Textarea
            value={exportCombinedData()}
            readOnly
            className="h-64 font-mono text-xs"
          />
          <Button
            onClick={() => navigator.clipboard.writeText(exportCombinedData())}
            className="mt-2 w-full"
            size="sm"
          >
            Copy Combined Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
