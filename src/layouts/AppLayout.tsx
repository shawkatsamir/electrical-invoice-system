import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header";
import { Sidebar } from "../ui/Sidebar";

export default function AppLayout() {
  return (
    <div className="bg-background flex h-screen overflow-hidden" dir="rtl">
      <div className="">
        <Sidebar />
      </div>

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="flex-shrink-0">
          <Header />
        </div>

        <main className="bg-background flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
