import { useCompanies } from "../../../contexts/CompaniesContext";
import { useProducts } from "../../../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../utils/helper";
import { Button } from "../../../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/AlertDialog";
import { toast } from "sonner";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { type Company } from "../../../types/index";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const { getCompanyProductStatistics } = useProducts();
  const { deleteCompany } = useCompanies();
  const navigate = useNavigate()

  const statistics = getCompanyProductStatistics(company.id);

  const handleDeleteCompany = (companyId: number, companyName: string) => {
    deleteCompany(companyId);
    toast.success(`تم حذف شركة "${companyName}" بنجاح`);
  };

  const handleShowDetails = (companyId: number) => {
    navigate(`/company-details/${companyId}`);
  };

  return (
    <Card className="border-border border transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded p-2">
              <span className="text-sm font-medium">{company.logo}</span>
            </div>
            <div>
              <CardTitle className="text-foreground text-lg font-medium">
                {company.name}
              </CardTitle>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
              <AlertDialogHeader className="text-right">
                <AlertDialogTitle>تأكيد حذف الشركة</AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  هل أنت متأكد من حذف شركة "{company.name}"؟ سيتم حذف جميع
                  البيانات والمنتجات المرتبطة بها. هذا الإجراء لا يمكن التراجع
                  عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteCompany(company.id, company.name)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  حذف الشركة
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 border-border rounded border p-3 text-center">
            <p className="text-muted-foreground mb-1 text-xs">المنتجات</p>
            <p className="text-foreground text-sm font-medium">
              {statistics.totalProducts}
            </p>
            {statistics.totalQuantity > 0 && (
              <p className="text-muted-foreground text-xs">
                {statistics.totalQuantity} قطعة
              </p>
            )}
          </div>

          <div className="bg-muted/50 border-border rounded border p-3 text-center">
            <p className="text-muted-foreground mb-1 text-xs">رصيد الحساب</p>
            <p className="text-foreground text-sm font-medium">
              {formatCurrency(company.accountBalance)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 border-border rounded border p-3 text-center">
            <p className="text-muted-foreground mb-1 text-xs">قيمة المخزون</p>
            <p className="text-foreground text-sm font-medium">
              {formatCurrency(statistics.totalInventoryValue)}
            </p>
          </div>

          <div
            className={`rounded border p-3 text-center ${
              statistics.lowStockProducts > 0 ||
              statistics.outOfStockProducts > 0
                ? "bg-destructive/5 border-destructive/20"
                : "bg-muted/50 border-border"
            }`}
          >
            <p
              className={`mb-1 text-xs ${
                statistics.lowStockProducts > 0 ||
                statistics.outOfStockProducts > 0
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              تحذيرات المخزون
            </p>
            <div className="flex items-center justify-center gap-1">
              <p
                className={`text-sm font-medium ${
                  statistics.lowStockProducts > 0 ||
                  statistics.outOfStockProducts > 0
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {statistics.lowStockProducts + statistics.outOfStockProducts}
              </p>
              {statistics.outOfStockProducts > 0 && (
                <span className="bg-destructive/10 text-destructive rounded px-1 py-0.5 text-xs">
                  {statistics.outOfStockProducts} نفدت
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Last Delivery */}
        <div className="bg-muted/50 border-border rounded border p-3">
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-3 w-3" />
            <div className="flex-1">
              <p className="text-muted-foreground text-xs">آخر توصيل</p>
              <p className="text-foreground text-sm font-medium">
                {formatDate(company.lastDelivery)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            onClick={() => handleShowDetails(company.id)}
            className="w-full text-sm"
          >
            <Eye className="ml-2 h-3 w-3" />
            عرض التفاصيل والمنتجات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
