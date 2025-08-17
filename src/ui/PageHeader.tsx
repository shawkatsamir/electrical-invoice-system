import { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode; // For buttons or other actions
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-border bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-2xl font-medium">{title}</h2>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </div>
        </div>

        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}
