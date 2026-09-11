/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ItemData {
  id: string;
  type: string;
  subtype: string;
  frame: number;
  categoryPath?: string[];
  color?: string;
}

interface ImportDialogProps {
  currentItemData: Record<number, ItemData>;
  onImport: (mergedData: Record<number, ItemData>) => void;
}

export default function ImportDialog({
  currentItemData,
  onImport,
}: ImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);

  const validateAndParseJSON = () => {
    try {
      setError(null);
      setSuccess(null);

      if (!jsonInput.trim()) {
        throw new Error("Please enter JSON data");
      }

      // Just parse the JSON directly
      const parsed = JSON.parse(jsonInput.trim());

      // Validate the structure
      if (!parsed.items || !Array.isArray(parsed.items)) {
        throw new Error("Invalid JSON structure: 'items' array is required");
      }

      // Validate each item
      const validItems = parsed.items.filter((item: any) => {
        return item && typeof item === "object" && item.id !== undefined;
      });

      if (validItems.length === 0) {
        throw new Error("No valid items found in the JSON");
      }

      setPreviewData(parsed);
      setSuccess(`Found ${validItems.length} valid items to import`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
      setPreviewData(null);
    }
  };

  const handleImport = () => {
    if (!previewData) return;

    try {
      const mergedData = { ...currentItemData };

      // Process each item from the imported JSON
      previewData.items.forEach((item: any) => {
        const index = parseInt(item.id);
        if (isNaN(index)) return;

        // Convert the imported item to our ItemData format
        const importedItem: ItemData = {
          id: item.id || index.toString(),
          type: item.itemType || item.type || "",
          subtype: item.variant || item.subtype || "",
          frame: item.frame !== undefined ? item.frame : index,
          categoryPath: item.category || [],
          color: item.color || "",
        };

        // Merge with existing data (imported data takes precedence)
        mergedData[index] = {
          ...mergedData[index],
          ...importedItem,
        };
      });

      onImport(mergedData);
      setSuccess(`Successfully imported ${previewData.items.length} items`);
      setIsOpen(false);
      setJsonInput("");
      setPreviewData(null);
    } catch (err) {
      setError(
        "Failed to import data: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" />}
      >
        Import JSON
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import JSON Data</DialogTitle>
          <DialogDescription>
            Paste JSON data to merge with your current items. The imported data
            will update existing items and add new ones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="json-input">JSON Data:</Label>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste your JSON data here... Example: {"items": [{"id": "0", "itemType": "weapon", "variant": "sword", "color": "red"}]}'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {previewData && (
            <div className="space-y-2">
              <Label>Preview:</Label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <div>
                  <strong>Sprite Sheet:</strong>{" "}
                  {previewData.spriteSheet?.name || "N/A"}
                </div>
                <div>
                  <strong>Items Found:</strong> {previewData.items?.length || 0}
                </div>
                <div className="mt-2">
                  <strong>Sample Items:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {previewData.items
                      ?.slice(0, 3)
                      .map((item: any, i: number) => (
                        <li key={i}>
                          ID: {item.id} -{" "}
                          {item.itemType || item.type || "Unknown"}
                          {item.variant || item.subtype
                            ? ` (${item.variant || item.subtype})`
                            : ""}
                          {item.color ? ` - ${item.color}` : ""}
                        </li>
                      ))}
                    {previewData.items?.length > 3 && (
                      <li className="text-gray-500">
                        ... and {previewData.items.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={validateAndParseJSON} disabled={!jsonInput.trim()}>
            Validate JSON
          </Button>
          <Button
            onClick={handleImport}
            disabled={!previewData}
            variant="default"
          >
            Import & Merge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
