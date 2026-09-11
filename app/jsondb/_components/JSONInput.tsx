"use client";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, type KeyboardEvent } from "react";
import { type ColumnType, possibleObjectTypes } from "../_types/database.types";
import { removeItemAtIndex } from "../_utils/removeItemAtIndex";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StringInputProps {
  defaultValue: string;
  onChange: (newValue: string) => void;
}

export const StringInput: React.FC<StringInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const handleOnChange = (event: any) => {
    const newValue = event.target.value as string;
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <Input
      type="text"
      value={value}
      onChange={handleOnChange}
      className="w-full"
    />
  );
};

interface NumberInputProps {
  defaultValue: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue ?? 0);
  const handleOnChange = (event: any) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <Input
      type="number"
      value={value}
      onChange={handleOnChange}
      className="w-full"
    />
  );
};

interface BooleanInputProps {
  defaultValue: boolean;
  onChange: (newValue: boolean) => void;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<boolean>(defaultValue ?? false);
  const handleOnChange = (event: any) => {
    const newValue = Boolean(event.target.value === "true");
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <select
      value={value.toString()}
      onChange={handleOnChange}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  );
};

const NullInput: React.FC = () => <span>null</span>;

interface ArrayInputProps {
  defaultValue: string[];
  onChange: (newValue: string[]) => void;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string[]>(defaultValue ?? []);
  const handleOnChange = (index: number, newValue: string | null) => {
    let newArray = [...value];
    if (newValue === null) {
      newArray = removeItemAtIndex(newArray, index);
    } else {
      newArray[index] = newValue;
    }
    setValue(newArray);
    onChange(newArray);
  };
  return (
    <ul>
      {value.map((item, index) => (
        <li className="flex justify-between gap-2 pb-2" key={index}>
          <JSONInput
            defaultValue={item}
            onChange={(newValue) => handleOnChange(index, newValue as string)}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleOnChange(index, null)}
          >
            Remove
          </Button>
        </li>
      ))}
      <li className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleOnChange(value.length, "")}
        >
          +
        </Button>
      </li>
    </ul>
  );
};

type ObjectPropertyProps = {
  propertyName: string;
  defaultType: string;
  defaultValue: string;
  handleOnChangeType: (key: string, newValue: string | null) => void;
  handleOnChangeDefaultValue: (key: string, newValue: string | null) => void;
};

const ObjectProperty: React.FC<ObjectPropertyProps> = ({
  propertyName,
  defaultType,
  defaultValue,
  handleOnChangeType,
  handleOnChangeDefaultValue,
}) => {
  const [type, setType] = useState(defaultType ?? "");
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <li className="flex w-72 justify-between gap-2 bg-slate-300 p-1">
      <span className="w-72 truncate" title={propertyName}>
        {propertyName}:{" "}
      </span>
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          handleOnChangeType(propertyName, e.target.value);
        }}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {possibleObjectTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          handleOnChangeDefaultValue(propertyName, newValue);
        }}
        className="w-full"
        placeholder="Default Value"
      />
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleOnChangeType(propertyName, null)}
      >
        x
      </Button>
    </li>
  );
};

interface ObjectInputProps {
  defaultValue: Record<string, { type: ColumnType; default_values?: string[] }>;
  onChange: (newValue: any) => void;
}

export const ObjectInput: React.FC<ObjectInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue ?? {});
  const [newPropertyName, setNewPropertyName] = useState("");

  const handleOnChangeType = (key: string, newValue: string | null) => {
    const newObj = { ...value };
    if (newValue === null) {
      delete newObj[key];
    } else {
      newObj[key] = { type: newValue as ColumnType };
    }
    setValue(newObj);
    onChange(newObj);
  };

  const handleOnChangeDefaultValue = (key: string, newValue: string | null) => {
    const newObj = { ...value };
    if (newObj[key]) {
      newObj[key] = {
        ...newObj[key],
        default_values: newValue ? [newValue] : undefined,
      };
    }
    setValue(newObj);
    onChange(newObj);
  };

  const handleSubmit = () => {
    if (newPropertyName && !value[newPropertyName]) {
      handleOnChangeType(newPropertyName, "string");
      setNewPropertyName("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <ul>
        {Object.keys(value).map((key, index) => {
          const property = value[key];
          const type = property?.type ?? "string";
          const defaultValue = property?.default_values?.[0] ?? "";
          return (
            <ObjectProperty
              key={`${index}-${key}`}
              propertyName={key}
              defaultType={type}
              defaultValue={defaultValue}
              handleOnChangeType={handleOnChangeType}
              handleOnChangeDefaultValue={handleOnChangeDefaultValue}
            />
          );
        })}
      </ul>
      <div className="flex gap-2 pt-2">
        <Input
          value={newPropertyName}
          onChange={(e) => setNewPropertyName(e.target.value)}
          placeholder="New Property Name"
          onKeyPress={handleKeyPress}
        />
        <Button variant="secondary" size="sm" onClick={handleSubmit}>
          +
        </Button>
      </div>
    </div>
  );
};

interface JSONInputProps {
  defaultValue: any;
  onChange: (newValue: any) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({
  defaultValue,
  onChange,
}) => {
  if (typeof defaultValue === "string") {
    return <StringInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "number") {
    return <NumberInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "boolean") {
    return <BooleanInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (defaultValue === null) {
    return <NullInput />;
  }
  if (Array.isArray(defaultValue)) {
    return <ArrayInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "object") {
    return <ObjectInput defaultValue={defaultValue} onChange={onChange} />;
  }
  return <StringInput defaultValue="" onChange={onChange} />;
};
