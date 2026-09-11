"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Subcategory {
  id: string;
  subcategories?: Subcategory[];
}

interface Category {
  id: string;
  subcategories?: Subcategory[];
}

interface CategorySelectorProps {
  categories: Category[];
  onCategoryChange: (categoryPath: string[]) => void;
  selectedCategoryPath?: string[];
}

export default function CategorySelector({
  categories,
  onCategoryChange,
  selectedCategoryPath = [],
}: CategorySelectorProps) {
  // Use the selectedCategoryPath prop directly instead of local state
  const selectedCategory = selectedCategoryPath[0] || "";
  const selectedSubcategory = selectedCategoryPath[1] || "";
  const selectedSubSubcategory = selectedCategoryPath[2] || "";

  // Compute available options based on current selections
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category?.subcategories || [];
  }, [selectedCategory, categories]);

  const availableSubSubcategories = useMemo(() => {
    if (!selectedSubcategory) return [];
    const subcategory = availableSubcategories.find(
      (sub) => sub.id === selectedSubcategory
    );
    return subcategory?.subcategories || [];
  }, [selectedSubcategory, availableSubcategories]);

  const handleCategoryChange = (newCategory: string | null) => {
    const categoryPath = newCategory ? [newCategory] : [];
    onCategoryChange(categoryPath);
  };

  const handleSubcategoryChange = (newSubcategory: string | null) => {
    const categoryPath = [selectedCategory, newSubcategory].filter(
      (value): value is string => Boolean(value)
    );
    onCategoryChange(categoryPath);
  };

  const handleSubSubcategoryChange = (newSubSubcategory: string | null) => {
    const categoryPath = [
      selectedCategory,
      selectedSubcategory,
      newSubSubcategory,
    ].filter((value): value is string => Boolean(value));
    onCategoryChange(categoryPath);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Category:</Label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            {categories
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {availableSubcategories.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Subcategory:</Label>
          <Select
            value={selectedSubcategory}
            onValueChange={handleSubcategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory..." />
            </SelectTrigger>
            <SelectContent>
              {availableSubcategories
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.id.charAt(0).toUpperCase() +
                      subcategory.id.slice(1)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {availableSubSubcategories.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Sub-subcategory:</Label>
          <Select
            value={selectedSubSubcategory}
            onValueChange={handleSubSubcategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sub-subcategory..." />
            </SelectTrigger>
            <SelectContent>
              {availableSubSubcategories
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((subSubcategory) => (
                  <SelectItem key={subSubcategory.id} value={subSubcategory.id}>
                    {subSubcategory.id.charAt(0).toUpperCase() +
                      subSubcategory.id.slice(1)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
