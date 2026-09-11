"use client";

import { useState, useEffect } from "react";
import { Data } from "./Data";
import { useDatabase } from "./DatabaseProvider";
import { Schema } from "./Schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Database, Download, Copy, Check } from "lucide-react";

export const View: React.FC = () => {
  const { selectedTable, viewSchema, viewData, exportData, database } =
    useDatabase();
  const [activeTab, setActiveTab] = useState<"schema" | "data" | "export">(
    "data"
  );
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Update formatted JSON when selected table changes
  useEffect(() => {
    if (selectedTable && database.tables[selectedTable]) {
      const data = database.tables[selectedTable]?.data ?? [];
      setFormattedJson(JSON.stringify(data, null, 2));
    } else {
      setFormattedJson("");
    }
  }, [selectedTable, database.tables]);

  if (!selectedTable) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">JSON Database Viewer</h2>
          <p className="text-sm text-muted-foreground">
            Select a table from the sidebar to view and edit data
          </p>
        </div>
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "schema" | "data" | "export");
    if (value === "schema") {
      viewSchema(selectedTable);
    } else if (value === "data") {
      viewData(selectedTable);
    }
  };

  const handleExport = () => {
    exportData(selectedTable);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div className="flex h-full flex-col p-4">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="schema"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-4 w-4" />
            Schema
          </TabsTrigger>
          <TabsTrigger
            value="data"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
          >
            <Database className="h-4 w-4" />
            Data
          </TabsTrigger>
          <TabsTrigger
            value="export"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
          >
            <Download className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="schema" className="mt-0 h-full">
            <Schema />
          </TabsContent>
          <TabsContent value="data" className="mt-0 h-full">
            <Data />
          </TabsContent>
          <TabsContent value="export" className="mt-0 h-full">
            <div className="flex h-full flex-col space-y-3 text-muted-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Export {selectedTable}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Export the table data as JSON
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleExport}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex-1 h-full">
                <Textarea
                  value={formattedJson}
                  readOnly
                  className="h-96 resize-none font-mono text-sm bg-secondary"
                  placeholder="No data available"
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
