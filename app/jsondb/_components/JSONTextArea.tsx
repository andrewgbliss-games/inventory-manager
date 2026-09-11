/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useState } from "react";
import { useDatabase } from "./DatabaseProvider";
import { Toast } from "./Toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JSONTextarea: React.FC = () => {
  const { database, setDatabaseFromString, resetToDefault } = useDatabase();
  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(database))
      .then(() => {
        setMessage("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Unable to copy text to clipboard");
      });
  };
  const [message, setMessage] = useState("");
  const [dbStr, setDbStr] = useState("");
  const handleDatabaseChange = (e: any) => {
    setDbStr(e.target.value);
  };
  const handleSaveDbFromStr = () => {
    setDatabaseFromString(dbStr);
  };
  const handleResetToDefault = () => {
    resetToDefault();
    setMessage("Database reset to default");
  };
  return (
    <div className="flex h-full flex-col gap-2">
      <Textarea
        value={JSON.stringify(database, null, 2)}
        className="w-full flex-1 min-h-[200px] text-xs"
        onChange={handleDatabaseChange}
        placeholder="Paste JSON database here..."
      />
      <div className="flex flex-col gap-2">
        <Button
          className="w-full text-xs"
          size="sm"
          onClick={handleSaveDbFromStr}
        >
          Set DB From Str
        </Button>
        <Button
          className="w-full text-xs"
          size="sm"
          onClick={copyTextToClipboard}
        >
          Copy to Clipboard
        </Button>
        <Button
          className="w-full text-xs"
          size="sm"
          onClick={handleResetToDefault}
        >
          Reset to Default
        </Button>
      </div>
      {message && (
        <Toast
          message={message}
          onTimeout={() => setMessage("")}
          duration={1000}
        />
      )}
    </div>
  );
};

export default JSONTextarea;
