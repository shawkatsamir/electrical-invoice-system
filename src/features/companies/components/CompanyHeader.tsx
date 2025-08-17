import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/Button";
import { ArrowLeft, Building2, Plus } from "lucide-react";
import { type Company } from "../../../types/index";

interface CompanyHeaderProps {
  company: Company;
  handleAddProducts: () => void;
}

export default function CompanyHeader({ company, handleAddProducts }: CompanyHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-border bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/companies")}
              className="hover:bg-muted p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <span className="text-lg font-medium">{company.logo}</span>
            </div>
            <div>
              <h2 className="text-foreground text-2xl font-medium">
                {company.name}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4" />
                شركة متخصصة في الأجهزة الكهربائية
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleAddProducts} className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة منتج جديد
        </Button>
      </div>
    </div>
  );
}
