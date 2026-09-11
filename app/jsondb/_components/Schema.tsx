"use client";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { possibleColumnTypes, type ColumnData } from "../_types/database.types";
import { AddColumnDialog } from "./AddColumnDialog";
import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SelectPossibleValuesInputProps = {
  columnName: string;
};

const SelectPossibleValuesInput: React.FC<SelectPossibleValuesInputProps> = ({
  columnName,
}) => {
  const { onChangePossibleValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState<string[]>(column?.possible_values ?? []);
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue: string[]) => {
        setValue(newValue);
        onChangePossibleValues(columnName, newValue);
      }}
    />
  );
};

type ObjectShapeInputProps = {
  columnName: string;
};

const ObjectShapeInput: React.FC<ObjectShapeInputProps> = ({ columnName }) => {
  const { onChangePossibleValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState(column?.possible_values ?? {});
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue) => {
        setValue(newValue);
        onChangePossibleValues(columnName, newValue);
      }}
    />
  );
};

type BooleanValueInputProps = {
  columnName: string;
};

const BooleanValueInput: React.FC<BooleanValueInputProps> = ({
  columnName,
}) => {
  const { onChangeDefaultValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState<boolean>(
    column?.default_values?.[0]
      ? Boolean(column?.default_values?.[0] === "true")
      : false
  );
  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue) => {
        setValue(newValue);
        onChangeDefaultValues(columnName, [newValue]);
      }}
    />
  );
};

type DefaultValueInputProps = {
  columnName: string;
};

const DefaultValueInput: React.FC<DefaultValueInputProps> = ({
  columnName,
}) => {
  const { onChangeDefaultValues, selectedTable, database } = useDatabase();
  const table = database?.tables[selectedTable];
  const schema = table?.schema ?? {};
  const column = (schema[columnName] ?? {}) as ColumnData;
  const [value, setValue] = useState<string>(column?.default_values?.[0] ?? "");
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChangeDefaultValues(columnName, [newValue]);
      }}
      className="w-full"
      placeholder="Default Value"
    />
  );
};

type ColumnProps = {
  column: ColumnData;
  columnName: string;
};

const Column: React.FC<ColumnProps> = ({ column, columnName }) => {
  const { deleteColumn, onChangeType } = useDatabase();
  const type = column?.type ?? "string";
  return (
    <div className="flex gap-3 border-b border-border/50 p-3 hover:bg-muted/30 transition-colors">
      <div className="flex-grow flex items-center">
        <Badge variant="secondary" className="font-mono text-sm">
          {columnName}
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <select
          value={type}
          onChange={(e) => onChangeType(columnName, e.target.value)}
          className="flex h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {possibleColumnTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {type === "select" && (
          <SelectPossibleValuesInput columnName={columnName} />
        )}
        {type === "object" && <ObjectShapeInput columnName={columnName} />}
        {type === "boolean" && <BooleanValueInput columnName={columnName} />}
        {type !== "select" && type !== "object" && type !== "boolean" && (
          <DefaultValueInput columnName={columnName} />
        )}
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteColumn(columnName)}
        className="h-8 w-8 p-0"
      >
        ×
      </Button>
    </div>
  );
};

export const Schema: React.FC = () => {
  const { selectedTable, schema } = useDatabase();
  return (
    <Card className="flex flex-grow flex-col justify-between gap-2 h-full border-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span className="text-muted-foreground">Table:</span>
          <Badge variant="outline" className="font-mono">
            {selectedTable}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="overflow-auto h-full">
          {Object.keys(schema).length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p className="text-sm">No columns defined yet</p>
            </div>
          ) : (
            Object.keys(schema).map((columnName, index) => {
              const column = schema[columnName]!;
              return (
                <Column key={index} column={column} columnName={columnName} />
              );
            })
          )}
        </div>
      </CardContent>
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <AddColumnDialog />
      </div>
    </Card>
  );
};
