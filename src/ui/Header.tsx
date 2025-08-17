import { Search, Bell, User } from "lucide-react";
import { Input } from "./Input";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="border-border flex h-16 items-center justify-between gap-4 border-b bg-white px-6">
      {/* Search Bar - Takes more space now */}
      <div className="max-w-3xl flex-1">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="ابحث عن فاتورة، عميل، أو منتج..."
            className="bg-input-background border-border w-full pr-10 text-right"
            dir="rtl"
          />
        </div>
      </div>

      {/* User Profile and Notifications - Left side for RTL */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="bg-destructive absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
          </span>
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-foreground hidden text-sm font-medium md:block">
            أحمد محمد
          </span>
        </div>
      </div>
    </header>
  );
}
