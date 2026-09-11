"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategorySelector from "./CategorySelector";
import ItemTypeSelector from "./ItemTypeSelector";

interface CellData {
  id: string;
  name: string;
  row: number;
  col: number;
  index: number;
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

interface ItemDataPanelProps {
  selectedCell: CellData | null;
  itemData: Record<number, ItemData>;
  updateItemData: (
    index: number,
    field: keyof ItemData,
    value: string | number | string[]
  ) => void;
  categories: Category[];
  itemTypes: ItemType[];
  spriteDimensions: { width: number; height: number };
  rows: number;
  cols: number;
  selectedCategoryPath: string[];
  setSelectedCategoryPath: (path: string[]) => void;
}

export default function ItemDataPanel({
  selectedCell,
  itemData,
  updateItemData,
  categories,
  itemTypes,
  spriteDimensions,
  rows,
  cols,
  selectedCategoryPath,
  setSelectedCategoryPath,
}: ItemDataPanelProps) {
  const getItemData = (index: number): ItemData => {
    return (
      itemData[index] || {
        id: index.toString(),
        type: "",
        subtype: "",
        frame: index,
        color: "",
      }
    );
  };

  const handleCategoryChange = (categoryPath: string[]) => {
    if (!selectedCell) return;
    setSelectedCategoryPath(categoryPath);
    // Save the category path to the item data
    updateItemData(selectedCell.index, "categoryPath", categoryPath);
  };

  const handleItemTypeChange = (itemType: string, variant: string) => {
    if (!selectedCell) return;

    // Only update if the values actually changed
    if (
      currentItemData.type !== itemType ||
      currentItemData.subtype !== variant
    ) {
      updateItemData(selectedCell.index, "type", itemType);
      updateItemData(selectedCell.index, "subtype", variant);
    }
  };

  if (!selectedCell) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Item Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Click on a grid cell to edit its item data
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentItemData = getItemData(selectedCell.index);

  // Use the selectedCategoryPath from props instead of deriving from item data
  const categoryPath = selectedCategoryPath;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Item Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm">ID:</Label>
          <Input
            value={currentItemData.id}
            onChange={(e) =>
              updateItemData(selectedCell.index, "id", e.target.value)
            }
            placeholder="1"
          />
        </div>

        <div>
          <Label className="text-sm">Color:</Label>
          <Select
            value={currentItemData.color || ""}
            onValueChange={(value) =>
              updateItemData(selectedCell.index, "color", value ?? "")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color..." />
            </SelectTrigger>
            <SelectContent>
              {[
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "pink",
                "brown",
                "black",
                "white",
                "gray",
                "silver",
                "gold",
                "bronze",
                "copper",
                "teal",
                "cyan",
                "magenta",
                "lime",
                "navy",
                "maroon",
                "olive",
                "coral",
                "indigo",
                "violet",
                "turquoise",
                "crimson",
                "azure",
                "amber",
                "emerald",
              ]
                .sort((a, b) => a.localeCompare(b))
                .map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{
                          backgroundColor: color,
                          boxShadow:
                            color === "white" ? "inset 0 0 0 1px #ccc" : "none",
                        }}
                      />
                      <span className="capitalize">{color}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <CategorySelector
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selectedCategoryPath={categoryPath}
        />

        {categoryPath.length > 0 && (
          <>
            <div className="text-sm text-muted-foreground">
              Selected category path: {categoryPath.join(" → ")}
            </div>
            <ItemTypeSelector
              itemTypes={itemTypes}
              categoryPath={categoryPath}
              onItemTypeChange={handleItemTypeChange}
              selectedItemType={currentItemData.type}
              selectedVariant={currentItemData.subtype}
            />
          </>
        )}

        <div>
          <Label className="text-sm">Icon Information:</Label>
          <div className="space-y-1 mt-2">
            <div className="text-sm text-muted-foreground">
              Index: {selectedCell?.index || "None"}
            </div>
            <div className="text-sm text-muted-foreground">
              Position: ({selectedCell?.row || 0}, {selectedCell?.col || 0})
            </div>
            <div className="text-sm text-muted-foreground">
              Cell Size: {Math.floor(spriteDimensions.width / cols)}×
              {Math.floor(spriteDimensions.height / rows)}px
            </div>
            <div className="text-sm text-muted-foreground">
              Source: (
              {Math.floor(selectedCell?.col * (spriteDimensions.width / cols))},{" "}
              {Math.floor(selectedCell?.row * (spriteDimensions.height / rows))}
              )
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
