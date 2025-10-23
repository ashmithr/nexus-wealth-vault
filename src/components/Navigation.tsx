import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Wallet, TrendingUp, Target, Settings, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Wallet, label: "Accounts", path: "/accounts" },
  { icon: TrendingUp, label: "Portfolio", path: "/portfolio" },
  { icon: PieChart, label: "Budgets", path: "/budgets" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-soft z-50">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Nexus Wealth
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Personal Finance</p>
      </div>
      
      <div className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
