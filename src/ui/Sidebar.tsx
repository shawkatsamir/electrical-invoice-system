import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  Building,
  UserCheck,
  Calendar,
  Archive,
  Settings,
} from "lucide-react";
// import { Button } from "../ui/Button"; // Button is no longer used directly for links
import { cn } from "../ui/utils";
// Import NavLink instead of useNavigate and useLocation
import { NavLink } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard, path: "/" },
  {
    id: "invoice",
    label: "تحرير فاتورة",
    icon: FileText,
    path: "/customer-invoice",
  },
  {
    id: "previous-customer-invoices",
    label: "الفواتير السابقة",
    icon: Archive,
    path: "/previous-customer-invoices",
  },
  { id: "merchants", label: "التجار", icon: Users, path: "/traders" },
  { id: "warehouses", label: "المخازن", icon: Package, path: "/warehouses" },
  { id: "companies", label: "الشركات", icon: Building, path: "/companies" },
  { id: "employees", label: "الموظفون", icon: UserCheck, path: "/employees" },
  {
    id: "daily-transactions",
    label: "التعاملات اليومية",
    icon: Calendar,
    path: "/daily-transactions",
  },
  { id: "settings", label: "الإعدادات", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  // const navigate = useNavigate(); // No longer needed for link navigation
  // const location = useLocation(); // No longer needed for manual active state

  // The custom isActive function is replaced by NavLink's built-in logic

  return (
    <aside className="bg-sidebar border-sidebar-border flex h-full w-64 flex-col border-l">
      {/* Simple Company Header */}
      <div className="border-sidebar-border border-b px-6 py-8">
        <div className="text-center">
          <h1 className="text-sidebar-foreground mb-1 text-2xl font-medium">
            الحرمين
          </h1>
          <p className="text-muted-foreground text-sm">للأجهزة الكهربائية</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-3">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Determine if we need the 'end' prop for exact matching (only for root path "/")
            const isRoot = item.path === "/";

            return (
              // Replace Button with NavLink for automatic active state handling
              <NavLink
                key={item.id}
                to={item.path}
                // Add 'end' prop for the root path to match only "/"
                end={isRoot}
                // Use a function as children to access the 'isActive' prop provided by NavLink
                // and to apply conditional styling
                className={({ isActive }) =>
                  cn(
                    "block h-auto w-full rounded-md p-3 text-right transition-colors", // Base link styles (mimicking Button)
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary border-sidebar-primary border-r-2" // Active styles
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground", // Inactive styles
                  )
                }
              >
                {/* Function as children to access isActive for icon styling */}
                {({ isActive }) => (
                  <div className="flex w-full items-center gap-3">
                    <div
                      className={cn(
                        "rounded p-1.5 transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Simple Footer */}
      <div className="border-sidebar-border border-t p-4">
        <div className="space-y-2 text-center">
          <div className="text-muted-foreground text-xs">الإصدار 2.1.0</div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground text-xs">متصل</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
