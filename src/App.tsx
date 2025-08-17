import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CustomerInvoice from "./pages/CustomerInvoice";
import PreviousCustomerInvoices from "./pages/PreviousCustomerInvoices";
import Traders from "./pages/Traders";
import Warehouses from "./pages/Warehouses";
import Companies from "./pages/Companies";
import Employees from "./pages/Employees";
import DailyTransactions from "./pages/DailyTransactions";
import Settings from "./pages/Settings";
import { CompaniesProvider } from "./contexts/CompaniesContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { Toaster } from "./ui/Sonner";
import CompanyDetails from "./pages/CompanyDetails";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <CompaniesProvider>
      <ProductsProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer-invoice" element={<CustomerInvoice />} />
              <Route
                path="/previous-customer-invoices"
                element={<PreviousCustomerInvoices />}
              />
              <Route path="/traders" element={<Traders />} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/company-details/:id" element={<CompanyDetails />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee-details/:id" element={<EmployeeDetails />} />
              <Route
                path="/daily-transactions"
                element={<DailyTransactions />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </ProductsProvider>
    </CompaniesProvider>
  );
}

export default App;
