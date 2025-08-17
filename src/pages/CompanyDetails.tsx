import { useState } from "react";
import { useCompanies } from "../contexts/CompaniesContext";
import { useProducts } from "../contexts/ProductsContext";
import { useParams } from "react-router-dom";
import CompanyHeader from "../features/companies/components/CompanyHeader";
import { toast } from "sonner";
import { AddProductDialog } from "../features/companies/components/ProductDialogs";

export default function CompanyDetails() {
  const { getCompanyById } = useCompanies();
  const { addProduct, state } = useProducts();

  // const [isEditingBalance, setIsEditingBalance] = useState(false);
  // const [balanceInput, setBalanceInput] = useState("");

  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedStockStatus, setSelectedStockStatus] = useState("all");

  const [showAddProductDialog, setShowAddProductDialog] = useState(false);

  const { id } = useParams<{ id: string }>();

  const companyId = parseInt(id || "0");
  const company = getCompanyById(companyId);

  const handleAddProducts = () => {
    setShowAddProductDialog(true);
  };

  const handleAddProductSubmit = (data: any) => {
    // Validation
    if (data.purchasePrice >= data.sellingPrice) {
      toast.error("سعر البيع يجب أن يكون أكبر من سعر الشراء");
      return;
    }

    const productData = {
      name: data.name.trim(),
      category: data.category,
      quantity: data.quantity,
      purchasePrice: data.purchasePrice,
      sellingPrice: data.sellingPrice,
      companyId,
      sku: data.sku?.trim() || undefined,
      description: data.description?.trim() || undefined,
    };

    addProduct(productData);
    toast.success(`تم إضافة المنتج "${data.name}" بنجاح`);
  };

  if (!company) {
    return <div>الشركة غير موجودة</div>;
  }

  return (
    <div className="space-y-8">
      <CompanyHeader company={company} handleAddProducts={handleAddProducts} />
      <AddProductDialog
        open={showAddProductDialog}
        onOpenChange={setShowAddProductDialog}
        categories={state.deviceCategories}
        onSubmit={handleAddProductSubmit}
      />
    </div>
  );
}
