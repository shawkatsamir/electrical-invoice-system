import CompaniesHeader from "../features/companies/components/CompaniesHeader";
import CompanyCard from "../features/companies/components/CompanyCard";
import { useCompanies } from "../contexts/CompaniesContext";
import { Card, CardContent } from "../ui/Card";
import { Building2 } from "lucide-react";

export default function Companies() {
  const { state } = useCompanies();
  return (
    <div className="space-y-8">
      <CompaniesHeader />

      {state.companies.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {state.companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <Card className="border-border border">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mb-4 inline-block">
              <div className="bg-muted rounded-lg p-4">
                <Building2 className="text-muted-foreground h-12 w-12" />
              </div>
            </div>

            <h3 className="text-foreground mb-2 text-lg font-medium">
              لا توجد شركات مسجلة
            </h3>

            <p className="text-muted-foreground mx-auto mb-6 max-w-md text-sm">
              ابدأ بإضافة الشركات لإدارة المنتجات والمبيعات بكفاءة أكبر.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
