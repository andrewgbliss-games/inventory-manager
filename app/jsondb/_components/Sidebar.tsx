"use client";

import { View } from "./View";
import { DatabaseName } from "./DatabaseName";
import { ThemeToggle } from "@/components/theme-toggle";
import { Database } from "lucide-react";
import { LeftColumn } from "./LeftColumn";

export function JSONDBSidebar() {
  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="w-80 bg-background flex flex-col">
        {/* Header */}
        <div className="border-b bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span className="font-semibold">JSON Database</span>
            </div>
            <ThemeToggle />
          </div>
          <DatabaseName />
        </div>

        {/* Left Column Content */}
        <div className="flex-1 p-4">
          <LeftColumn />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <View />
      </div>
    </div>
  );
}
