"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { ColumnData, Row } from "../_types/database.types";
import { useDatabase } from "./DatabaseProvider";
import { JSONInput } from "./JSONInput";
import { useEffect, useRef, useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Search,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SelectPossibleValuesInputProps = {
  rowIndex: number;
  column: ColumnData;
  columnName: string;
};

const SelectPossibleValuesInput: React.FC<SelectPossibleValuesInputProps> = ({
  rowIndex,
  column,
  columnName,
}) => {
  const { onColumnValueChange, getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const [value, setValue] = useState<string>(
    currentValue ?? getDefaultValue({ column }) ?? ""
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onColumnValueChange(rowIndex, columnName, newValue);
  };

  return (
    <select
      value={value}
      onChange={handleOnChange}
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <option value="">Select value</option>
      {column?.possible_values?.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

type ObjectDataPropertyProps = {
  propertyName: string;
  defaultType: string;
  defaultValue: string;
  handleOnChangeDefaultValue: (key: string, newValue: string | null) => void;
};

const ObjectDataProperty: React.FC<ObjectDataPropertyProps> = ({
  propertyName,
  defaultType,
  defaultValue,
  handleOnChangeDefaultValue,
}) => {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg border">
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="font-medium text-sm truncate" title={propertyName}>
          {propertyName}
        </span>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded w-fit">
          {defaultType}
        </span>
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          handleOnChangeDefaultValue(propertyName, newValue);
        }}
        className="w-32 h-8 text-sm"
        placeholder="Value"
      />
    </div>
  );
};

interface ObjectDataInputProps {
  rowIndex: number;
  column: ColumnData;
  columnName: string;
}

export const ObjectDataInput: React.FC<ObjectDataInputProps> = ({
  rowIndex,
  column,
  columnName,
}) => {
  const { getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const [value, setValue] = useState<any>(
    currentValue ?? getDefaultValue({ column }) ?? {}
  );

  const { onColumnValueChange } = useDatabase();
  const handleOnChangeDefaultValue = (key: string, newValue: string | null) => {
    const newObj = { ...value };
    newObj[key] = [newValue];
    onColumnValueChange(rowIndex, columnName, newObj);
    setValue(newObj);
  };

  return (
    <div className="space-y-3">
      {Object.keys(column?.possible_values ?? {}).map((key: any, index) => {
        const possible_values: any = column?.possible_values ?? {};
        const type = possible_values[key]?.type ?? "string";
        const defaultValue = value[key];
        return (
          <ObjectDataProperty
            key={`${index}-${key}`}
            propertyName={key}
            defaultType={type}
            defaultValue={defaultValue}
            handleOnChangeDefaultValue={handleOnChangeDefaultValue}
          />
        );
      })}
    </div>
  );
};

type ObjectInputProps = {
  rowIndex: number;
  column: ColumnData;
  columnName: string;
};

const ObjectInput: React.FC<ObjectInputProps> = ({
  rowIndex,
  column,
  columnName,
}) => {
  const { getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const objectKeys = Object.keys(currentValue || {});

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="h-8" />}
      >
        <Eye className="h-4 w-4 mr-1" />
        {objectKeys.length > 0 ? `${objectKeys.length} props` : "Empty"}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Object Properties</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <ObjectDataInput
            rowIndex={rowIndex}
            column={column}
            columnName={columnName}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getDefaultValue = ({ column }: { column: ColumnData }) => {
  if (column?.type === "string") {
    return "";
  }
  if (column?.type === "number") {
    return 0;
  }
  if (column?.type === "boolean") {
    return false;
  }
  if (column?.type === "null") {
    return null;
  }
  if (column?.type === "array") {
    return [];
  }
  if (column?.type === "object") {
    return {};
  }
};

const ColumnInput = ({
  column,
  columnName,
  rowIndex,
}: {
  column: ColumnData;
  columnName: string;
  rowIndex: number;
}) => {
  const { onColumnValueChange, getCurrentValue } = useDatabase();
  const currentValue = getCurrentValue(rowIndex, columnName);
  const [value, setValue] = useState(
    currentValue ?? getDefaultValue({ column })
  );

  if (column.type === "select") {
    return (
      <SelectPossibleValuesInput
        rowIndex={rowIndex}
        column={column}
        columnName={columnName}
      />
    );
  }

  if (column.type === "object") {
    return (
      <ObjectInput
        rowIndex={rowIndex}
        column={column}
        columnName={columnName}
      />
    );
  }

  if (column.type === "boolean") {
    return (
      <select
        value={String(value)}
        onChange={(e) => {
          const boolValue = e.target.value === "true";
          setValue(boolValue);
          onColumnValueChange(rowIndex, columnName, boolValue);
        }}
        className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  }

  return (
    <JSONInput
      defaultValue={value}
      onChange={(newValue: any) => {
        setValue(newValue);
        onColumnValueChange(rowIndex, columnName, newValue);
      }}
    />
  );
};

const TableHeaderCell = ({
  columnName,
  sortColumn,
  sortDirection,
  onSort,
}: {
  columnName: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (column: string) => void;
}) => {
  const isSorted = sortColumn === columnName;

  return (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
      onClick={() => onSort(columnName)}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{columnName}</span>
        {isSorted ? (
          sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );
};

export const Data: React.FC = () => {
  const { selectedTable, database, schema, addRow, deleteRow } = useDatabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [width, setWidth] = useState(100);
  const demoRef = useRef<any>(null);

  const table = database.tables[selectedTable];
  const columnNames = Object.keys(schema);
  const data = table?.data ?? [];

  // Filter and sort data
  const filteredAndSortedData = data
    .filter((row: Row) => {
      if (!searchTerm) return true;
      return columnNames.some((columnName) => {
        const value = row[columnName];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    })
    .sort((a: Row, b: Row) => {
      if (!sortColumn || !sortDirection) return 0;

      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleAddNewRow = () => {
    const newRow: Row = {
      id: createId(),
    };
    columnNames.forEach((columnName) => {
      if (columnName === "id") return;
      const column = table?.schema[columnName];
      let field = null;
      if (column?.type === "string") {
        field = column?.default_values?.[0] ?? "";
      }
      if (column?.type === "number") {
        field = column?.default_values?.[0] ?? 0;
      }
      if (column?.type === "boolean") {
        field = Boolean(column?.default_values?.[0] === "true") ?? false;
      }
      if (column?.type === "null") {
        field = column?.default_values?.[0] ?? null;
      }
      if (column?.type === "select") {
        field = column?.possible_values ? column?.possible_values?.[0] : "";
      }
      if (column?.type === "array") {
        field = column?.possible_values ?? [];
      }
      if (column?.type === "object") {
        const newFieldObj: any = {};
        const possible_values: any = column?.possible_values ?? {};
        Object.keys(possible_values).forEach((value) => {
          newFieldObj[value] = possible_values[value]?.default_values ?? [];
        });
        field = newFieldObj;
      }
      newRow[columnName] = field;
    });
    addRow(newRow);
  };

  const handleDeleteRow = (index: number) => {
    deleteRow(index);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth((event?.[0]?.contentBoxSize?.[0]?.inlineSize ?? 0) - 10);
    });
    if (demoRef?.current) {
      resizeObserver.observe(demoRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [demoRef]);

  if (!selectedTable) return null;

  return (
    <div ref={demoRef} className="flex flex-col h-full">
      <Card className="mb-4 border-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Table: {selectedTable}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                {filteredAndSortedData.length} rows
              </span>
              <Button onClick={handleAddNewRow} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Row
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            {sortColumn && (
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded flex items-center gap-1">
                <Filter className="h-3 w-3" />
                {sortColumn} {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-none">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <div style={{ width }}>
              <Table>
                <TableHeader className="sticky top-0 z-10  border-none">
                  <TableRow className="hover:bg-muted/50  border-none">
                    {columnNames.map((columnName) => (
                      <TableHeaderCell
                        key={columnName}
                        columnName={columnName}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    ))}
                    <TableHead className="w-20 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columnNames.length + 1}
                        className="text-center py-8 text-muted-foreground border-none"
                      >
                        {searchTerm
                          ? "No rows match your search"
                          : "No data available"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedData.map((row: Row, rowIndex: number) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-muted/30 transition-colors border-none"
                      >
                        {columnNames.map((columnName) => {
                          const column = table?.schema[columnName];
                          if (!column)
                            return <TableCell key={columnName}></TableCell>;
                          return (
                            <TableCell key={columnName} className="py-2">
                              <ColumnInput
                                column={column}
                                columnName={columnName}
                                rowIndex={rowIndex}
                              />
                            </TableCell>
                          );
                        })}
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                />
                              }
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleDeleteRow(rowIndex)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Row
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
