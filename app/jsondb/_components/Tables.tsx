"use client";

import { useDatabase } from "./DatabaseProvider";

export const Tables: React.FC = () => {
  const { database, selectedTable, viewData } = useDatabase();

  return (
    <div className="space-y-1">
      {Object.keys(database.tables).map((tableName) => (
        <div
          key={tableName}
          className={`p-2 rounded-md cursor-pointer ${
            selectedTable === tableName ? "bg-secondary" : "hover:bg-accent"
          }`}
          onClick={() => viewData(tableName)}
        >
          <h3
            className={`text-sm font-medium truncate ${
              selectedTable === tableName
                ? "text-secondary-foreground"
                : "text-foreground"
            }`}
          >
            {tableName}
          </h3>
        </div>
      ))}
    </div>
  );
};
