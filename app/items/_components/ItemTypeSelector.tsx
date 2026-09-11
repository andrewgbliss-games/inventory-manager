"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemType {
  id: string;
  category: string;
  variants: string[];
}

interface ItemTypeSelectorProps {
  itemTypes: ItemType[];
  categoryPath: string[];
  onItemTypeChange: (itemType: string, variant: string) => void;
  selectedItemType: string;
  selectedVariant: string;
}

export default function ItemTypeSelector({
  itemTypes,
  categoryPath,
  onItemTypeChange,
  selectedItemType,
  selectedVariant,
}: ItemTypeSelectorProps) {
  const [availableItemTypes, setAvailableItemTypes] = useState<ItemType[]>([]);
  const [availableVariants, setAvailableVariants] = useState<string[]>([]);

  // Filter item types based on category path
  useEffect(() => {
    if (categoryPath.length === 0) {
      // If no category path, show all item types
      setAvailableItemTypes(itemTypes);
      setAvailableVariants([]);
      return;
    }

    const categoryString = categoryPath.join(".");
    const filteredTypes = itemTypes.filter(
      (itemType) => itemType.category === categoryString
    );

    setAvailableItemTypes(filteredTypes);

    // Reset selections if current selections are no longer valid
    if (!filteredTypes.find((type) => type.id === selectedItemType)) {
      onItemTypeChange("", "");
    }
  }, [categoryPath, itemTypes, selectedItemType, onItemTypeChange]);

  // Update available variants when item type changes
  useEffect(() => {
    if (selectedItemType) {
      const itemType = availableItemTypes.find(
        (type) => type.id === selectedItemType
      );
      setAvailableVariants(itemType?.variants || []);

      // Reset variant if current variant is no longer valid
      if (
        itemType &&
        itemType.variants &&
        !itemType.variants.includes(selectedVariant)
      ) {
        onItemTypeChange(
          selectedItemType,
          itemType.variants.length > 0 ? itemType.variants[0] : ""
        );
      }
    } else {
      setAvailableVariants([]);
    }
  }, [selectedItemType, availableItemTypes, selectedVariant, onItemTypeChange]);

  const handleItemTypeChange = (newItemType: string | null) => {
    if (!newItemType) {
      onItemTypeChange("", "");
      return;
    }
    const itemType = availableItemTypes.find((type) => type.id === newItemType);
    const defaultVariant =
      itemType && itemType.variants.length > 0 ? itemType.variants[0] : "";
    onItemTypeChange(newItemType, defaultVariant);
  };

  const handleVariantChange = (newVariant: string | null) => {
    onItemTypeChange(selectedItemType, newVariant ?? "");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Item Type:</Label>
        <Select value={selectedItemType} onValueChange={handleItemTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select item type..." />
          </SelectTrigger>
          <SelectContent>
            {availableItemTypes
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((itemType) => (
                <SelectItem key={itemType.id} value={itemType.id}>
                  {itemType.id.charAt(0).toUpperCase() + itemType.id.slice(1)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {availableVariants.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Variant:</Label>
          <Select value={selectedVariant} onValueChange={handleVariantChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select variant..." />
            </SelectTrigger>
            <SelectContent>
              {availableVariants
                .sort((a, b) => a.localeCompare(b))
                .map((variant) => (
                  <SelectItem key={variant} value={variant}>
                    {variant.charAt(0).toUpperCase() +
                      variant.slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {availableItemTypes.length === 0 && categoryPath.length > 0 && (
        <div className="text-sm text-muted-foreground">
          No item types available for the selected category path:{" "}
          {categoryPath.join(" → ")}
        </div>
      )}
    </div>
  );
}
