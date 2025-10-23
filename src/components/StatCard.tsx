import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  gradient = false 
}: StatCardProps) => {
  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-medium",
      gradient && "bg-gradient-card"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          {change && (
            <p className={cn(
              "text-sm font-medium",
              changeType === "positive" ? "text-success" : "text-destructive"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          gradient ? "bg-primary/10" : "bg-secondary"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            gradient ? "text-primary" : "text-foreground"
          )} />
        </div>
      </div>
    </Card>
  );
};
