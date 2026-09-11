"use client";

import { AddTable } from "./AddTable";
import { Tables } from "./Tables";
import JSONTextarea from "./JSONTextArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LeftColumn = () => {
  return (
    <Tabs defaultValue="tables">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="tables"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
        >
          Tables
        </TabsTrigger>
        <TabsTrigger
          value="json"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
        >
          JSON Editor
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tables" className="mt-2 space-y-4">
        <Tables />
        <AddTable />
      </TabsContent>
      <TabsContent value="json" className="mt-2">
        <JSONTextarea />
      </TabsContent>
    </Tabs>
  );
};
