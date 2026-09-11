import { ThemeToggle } from "@/components/theme-toggle";
import { DatabaseName } from "./DatabaseName";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-2 flex justify-between">
      <div className="flex-grow">
        <DatabaseName />
      </div>
      <ThemeToggle />
    </header>
  );
};
