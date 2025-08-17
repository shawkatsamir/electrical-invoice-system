import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { PageHeader } from "../../../ui/PageHeader";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "@radix-ui/react-label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/Dialog";

export default function CompaniesHeader() {

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    logo: "",
    productsCount: 0,
    accountBalance: 0,
    lastDelivery: new Date().toISOString().split("T")[0],
    totalDelivered: 0,
    deliveredPerMonth: 0,
    phone: "",
    email: "",
    address: "",
    establishedYear: new Date().getFullYear(),
  });
  return (
    <PageHeader
      icon={Building2}
      title="إدارة الشركات"
      description="عرض وإدارة شركات الأجهزة الكهربائية"
    >
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة شركة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-foreground flex items-center gap-2 text-lg">
              <div className="bg-primary text-primary-foreground rounded p-1.5">
                <Plus className="h-3 w-3" />
              </div>
              إضافة شركة جديدة
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-right text-sm">
              أدخل بيانات الشركة الجديدة. الحقول المطلوبة مُشار إليها بعلامة *.
            </DialogDescription>
          </DialogHeader>

          <form  className="space-y-6">
            <div className="max-h-96 space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground text-sm">
                  اسم الشركة *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={newCompany.name}
                  onChange={(e) =>
                    setNewCompany((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="أدخل اسم الشركة"
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground text-sm">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={newCompany.phone}
                  onChange={(e) =>
                    setNewCompany((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="+966xxxxxxxxx"
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm">
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={newCompany.email}
                  onChange={(e) =>
                    setNewCompany((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="company@example.com"
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground text-sm">
                  العنوان
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={newCompany.address}
                  onChange={(e) =>
                    setNewCompany((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="أدخل عنوان الشركة"
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="accountBalance"
                  className="text-foreground text-sm"
                >
                  الرصيد الحالي
                </Label>
                <Input
                  id="accountBalance"
                  name="accountBalance"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newCompany.accountBalance}
                  onChange={(e) =>
                    setNewCompany((prev) => ({
                      ...prev,
                      accountBalance: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0"
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                إضافة الشركة
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setNewCompany({
                    name: "",
                    logo: "",
                    productsCount: 0,
                    accountBalance: 0,
                    lastDelivery: new Date().toISOString().split("T")[0],
                    totalDelivered: 0,
                    deliveredPerMonth: 0,
                    phone: "",
                    email: "",
                    address: "",
                    establishedYear: new Date().getFullYear(),
                  });
                }}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageHeader>
  );
}
