"use client";

import { useState, type KeyboardEvent } from "react";
import { useDatabase } from "./DatabaseProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddColumn: React.FC = () => {
  const { addColumn } = useDatabase();
  const [columnName, setColumnName] = useState("");
  const handleSubmit = () => {
    addColumn(columnName);
    setColumnName("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex justify-between gap-2  p-2">
      <Input
        className="flex-grow border-2 border-primary"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="New Column Name"
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={!columnName.length}
      >
        +
      </Button>
    </div>
  );
};
