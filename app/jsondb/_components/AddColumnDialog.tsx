"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDatabase } from "./DatabaseProvider";

export const AddColumnDialog: React.FC = () => {
  const { addColumn } = useDatabase();
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  const handleSubmit = () => {
    if (columnName.trim()) {
      addColumn(columnName.trim());
      setColumnName("");
      setOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setColumnName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="flex items-center gap-2" />
        }
      >
        <Plus size={16} />
        Add Column
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="columnName" className="text-sm font-medium">
              Column Name
            </label>
            <Input
              id="columnName"
              className="mt-2"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Enter column name"
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!columnName.trim()}>
              Add Column
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
