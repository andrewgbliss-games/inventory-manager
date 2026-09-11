"use client";

import { useDatabase } from "./DatabaseProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DatabaseName: React.FC = () => {
  const { database, setDatabaseName } = useDatabase();
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="dbName" className="w-32">
        Database Name:
      </Label>
      <Input
        type="text"
        id="dbName"
        value={database.name}
        onChange={(e) => setDatabaseName(e.target.value)}
        className="w-full bg-primary-foreground text-primary"
      />
    </div>
  );
};
