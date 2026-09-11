import { JSONDBSidebar } from "./_components/Sidebar";
import { DatabaseProvider } from "./_components/DatabaseProvider";

export default function Page() {
  return (
    <DatabaseProvider>
      <div className="h-screen">
        <JSONDBSidebar />
      </div>
    </DatabaseProvider>
  );
}
