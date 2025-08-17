// import { Building2, Package, DollarSign, BarChart3 } from "lucide-react";
// import { StatsCards } from "../../../ui/StatsCards";
// import { useCompanies } from "../../../contexts/CompaniesContext";

// const statsCards = [
//   {
//     id: "companies",
//     icon: Building2,
//     title: "الشركات",

//     subtitle: "إجمالي الشركات",
//     variant: "primary" as const,
//     badge: "الشركات",
//   },
//   {
//     id: "products",
//     icon: Package,

//     subtitle: "إجمالي المنتجات",
//     badge: "المنتجات",
//   },
//   {
//     id: "balance",
//     icon: DollarSign,
//     title: "الأرصدة",

//     subtitle: "إجمالي الأرصدة",
//     badge: "الأرصدة",
//   },
//   {
//     id: "active",
//     icon: BarChart3,
//     title: "النشطة",

//     subtitle: "شركات نشطة",
//     badge: "النشطة",
//   },
// ];

// const getCompanyProductStatistics = (companyId: number) => {
//   const products = getProductsByCompany(companyId);
//   return {
//     totalProducts: products.length,
//     totalInventoryValue: products.reduce(
//       (total, product) => total + product.purchasePrice * product.quantity,
//       0,
//     ),
//     lowStockProducts: products.filter(
//       (product) => product.quantity <= 3 && product.quantity > 0,
//     ).length,
//     outOfStockProducts: products.filter((product) => product.quantity === 0)
//       .length,
//     totalQuantity: products.reduce(
//       (total, product) => total + product.quantity,
//       0,
//     ),
//   };
// };
// const overallStatistics = {
//   totalCompanies: state.companies.length,
//   totalProducts: state.products.length,
//   totalAccountBalance: state.companies.reduce(
//     (total, company) => total + company.accountBalance,
//     0,
//   ),
//   activeCompanies: state.companies.filter(
//     (company) => getCompanyProductStatistics(company.id).totalProducts > 0,
//   ).length,
// };

// export default function CompaniesStatas() {
//   const { state } = useCompanies();
//    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   return (
//     <div>
//       <StatsCards cards={statsCards} />
//     </div>
//   );
// }
