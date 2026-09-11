"use client";

import { useState, type KeyboardEvent } from "react";
import { useDatabase } from "./DatabaseProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddTable: React.FC = () => {
  const { addTable } = useDatabase();
  const [tableName, setTableName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (tableName.trim()) {
      addTable(tableName);
      setTableName("");
      setOpen(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="w-full" />}
      >
        Add Table
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
          <DialogDescription>
            Enter a name for your new table. This will create a new table in
            your database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="New Table Name"
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!tableName.trim()}>
            Add Table
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
