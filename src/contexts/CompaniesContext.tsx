import { createContext, useContext, useReducer, type ReactNode } from "react";
import { type Company, type DeviceCategory } from "../types";

interface CompaniesState {
  companies: Company[];
  deviceCategories: DeviceCategory[];
  isLoading: boolean;
}

type CompaniesAction =
  | { type: "ADD_COMPANY"; payload: Omit<Company, "id"> }
  | { type: "DELETE_COMPANY"; payload: number }
  | { type: "UPDATE_COMPANY"; payload: Company }
  | {
      type: "UPDATE_ACCOUNT_BALANCE";
      payload: { companyId: number; balance: number };
    }
  | { type: "SET_LOADING"; payload: boolean };

// SQLite-Ready Company Data - Each company has separate product catalog
const initialCompanies: Company[] = [
  {
    id: 1,
    name: "LG",
    logo: "LG",
    productsCount: 12,
    accountBalance: 125000,
    lastDelivery: "2024-07-28",
    totalDelivered: 450,
    deliveredPerMonth: 35,
    phone: "+966-11-456-7890",
    email: "contact@lg-saudi.com",
    address: "الرياض - طريق الملك عبدالعزيز",
    establishedYear: 1958,
  },
  {
    id: 2,
    name: "العربي",
    logo: "العربي",
    productsCount: 12,
    accountBalance: 89000,
    lastDelivery: "2024-07-25",
    totalDelivered: 320,
    deliveredPerMonth: 28,
    phone: "+966-11-234-5678",
    email: "info@elaraby.com.sa",
    address: "القاهرة - مدينة نصر",
    establishedYear: 1964,
  },
  {
    id: 3,
    name: "Fresh",
    logo: "Fresh",
    productsCount: 12,
    accountBalance: 67000,
    lastDelivery: "2024-07-30",
    totalDelivered: 280,
    deliveredPerMonth: 22,
    phone: "+966-12-345-6789",
    email: "sales@fresh-appliances.com",
    address: "جدة - طريق المدينة",
    establishedYear: 1985,
  },
  {
    id: 4,
    name: "Passap",
    logo: "Passap",
    productsCount: 12,
    accountBalance: 72000,
    lastDelivery: "2024-07-26",
    totalDelivered: 195,
    deliveredPerMonth: 18,
    phone: "+966-13-456-7890",
    email: "support@passap-ksa.com",
    address: "الدمام - طريق الخليج",
    establishedYear: 1978,
  },
  {
    id: 5,
    name: "Amazon",
    logo: "Amazon",
    productsCount: 12,
    accountBalance: 156000,
    lastDelivery: "2024-07-29",
    totalDelivered: 380,
    deliveredPerMonth: 42,
    phone: "+966-11-567-8901",
    email: "business@amazon.sa",
    address: "الرياض - حي الملك فهد",
    establishedYear: 1994,
  },
  {
    id: 6,
    name: "Beko",
    logo: "Beko",
    productsCount: 12,
    accountBalance: 98000,
    lastDelivery: "2024-07-27",
    totalDelivered: 275,
    deliveredPerMonth: 24,
    phone: "+966-11-678-9012",
    email: "contact@beko-saudi.com",
    address: "الرياض - طريق العروبة",
    establishedYear: 1955,
  },
];

// Device Categories - SQLite ready structure
const initialDeviceCategories: DeviceCategory[] = [
  {
    id: "refrigerators",
    name: "Refrigerators",
    arabicName: "ثلاجات",
    productCount: 0, // Will be calculated dynamically
    icon: "❄️",
  },
  {
    id: "freezers",
    name: "Freezers",
    arabicName: "فريزرات",
    productCount: 0, // Will be calculated dynamically
    icon: "🧊",
  },
  {
    id: "screens",
    name: "TVs & Displays",
    arabicName: "شاشات",
    productCount: 0, // Will be calculated dynamically
    icon: "📺",
  },
  {
    id: "washers",
    name: "Washing Machines",
    arabicName: "غسالات",
    productCount: 0, // Will be calculated dynamically
    icon: "🫧",
  },
  {
    id: "stoves",
    name: "Gas Stoves",
    arabicName: "مواقد",
    productCount: 0, // Will be calculated dynamically
    icon: "🔥",
  },
  {
    id: "microwaves",
    name: "Microwaves",
    arabicName: "مايكرويف",
    productCount: 0, // Will be calculated dynamically
    icon: "⏲️",
  },
];

// SQLite-Ready Product Catalog - Each company has completely separate products
/*
const initialProducts: Product[] = [
  
  {
    id: 1,
    name: "ثلاجة LG InstaView Door-in-Door 28 قدم",
    category: "refrigerators",
    quantity: 8,
    purchasePrice: 3800,
    sellingPrice: 4200,
    companyId: 1,
    lowStock: false,
    sku: "LG-REF-28-IDI",
    description: "ثلاجة متطورة مع تقنية InstaView",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "ثلاجة LG Linear Cooling 22 قدم",
    category: "refrigerators",
    quantity: 2,
    purchasePrice: 3000,
    sellingPrice: 3400,
    companyId: 1,
    lowStock: true,
    sku: "LG-REF-22-LC",
    description: "ثلاجة بتقنية التبريد الخطي",
    dateAdded: "2024-01-10",
    lastUpdated: "2024-01-20",
  },
  {
    id: 3,
    name: "فريزر LG Vertical Multi-Air 7 أدراج",
    category: "freezers",
    quantity: 12,
    purchasePrice: 1800,
    sellingPrice: 2100,
    companyId: 1,
    lowStock: false,
    sku: "LG-FRZ-7D-MA",
    description: "فريزر عمودي بتقنية التهوية المتعددة",
    dateAdded: "2024-01-08",
    lastUpdated: "2024-01-15",
  },
  {
    id: 4,
    name: "فريزر LG Chest 420 لتر",
    category: "freezers",
    quantity: 3,
    purchasePrice: 1600,
    sellingPrice: 1900,
    companyId: 1,
    lowStock: true,
    sku: "LG-FRZ-420L",
    description: "فريزر صندوق بسعة كبيرة",
    dateAdded: "2024-01-12",
    lastUpdated: "2024-01-18",
  },
  {
    id: 5,
    name: "تلفزيون LG OLED C3 65 بوصة 4K",
    category: "screens",
    quantity: 5,
    purchasePrice: 6000,
    sellingPrice: 6800,
    companyId: 1,
    lowStock: false,
    sku: "LG-TV-65-OLED",
    description: "شاشة OLED بدقة 4K",
    dateAdded: "2024-01-05",
    lastUpdated: "2024-01-22",
  },
  {
    id: 6,
    name: "تلفزيون LG NanoCell 55 بوصة",
    category: "screens",
    quantity: 1,
    purchasePrice: 3600,
    sellingPrice: 4200,
    companyId: 1,
    lowStock: true,
    sku: "LG-TV-55-NC",
    description: "شاشة بتقنية NanoCell",
    dateAdded: "2024-01-14",
    lastUpdated: "2024-01-25",
  },

  // العربي Company (ID: 2) - Affordable Quality Appliances
  {
    id: 7,
    name: "ثلاجة العربي كلاسيك 18 قدم",
    category: "refrigerators",
    quantity: 15,
    purchasePrice: 1400,
    sellingPrice: 1600,
    companyId: 2,
    lowStock: false,
    sku: "ARB-REF-18-CL",
    description: "ثلاجة اقتصادية بجودة عالية",
    dateAdded: "2024-01-20",
    lastUpdated: "2024-01-20",
  },
  {
    id: 8,
    name: "ثلاجة العربي أوتوماتيك 14 قدم",
    category: "refrigerators",
    quantity: 3,
    purchasePrice: 1000,
    sellingPrice: 1200,
    companyId: 2,
    lowStock: true,
    sku: "ARB-REF-14-AU",
    description: "ثلاجة أوتوماتيك صغيرة",
    dateAdded: "2024-01-18",
    lastUpdated: "2024-01-24",
  },
  {
    id: 9,
    name: "فريزر العربي تجاري 380 لتر",
    category: "freezers",
    quantity: 8,
    purchasePrice: 950,
    sellingPrice: 1100,
    companyId: 2,
    lowStock: false,
    sku: "ARB-FRZ-380-COM",
    description: "فريزر مناسب للاستخدام التجاري",
    dateAdded: "2024-01-16",
    lastUpdated: "2024-01-21",
  },

  // Fresh Company (ID: 3) - Commercial & Restaurant Equipment
  {
    id: 10,
    name: "ثلاجة Fresh للمطاعم 24 قدم",
    category: "refrigerators",
    quantity: 6,
    purchasePrice: 2400,
    sellingPrice: 2800,
    companyId: 3,
    lowStock: false,
    sku: "FSH-REF-24-RST",
    description: "ثلاجة مخصصة للمطاعم",
    dateAdded: "2024-01-22",
    lastUpdated: "2024-01-22",
  },
  {
    id: 11,
    name: "فريزر Fresh أيس كريم عرض",
    category: "freezers",
    quantity: 4,
    purchasePrice: 2800,
    sellingPrice: 3200,
    companyId: 3,
    lowStock: false,
    sku: "FSH-FRZ-ICE-DSP",
    description: "فريزر عرض للآيس كريم",
    dateAdded: "2024-01-19",
    lastUpdated: "2024-01-26",
  },
  {
    id: 12,
    name: "شاشة Fresh Digital Signage 55 بوصة",
    category: "screens",
    quantity: 8,
    purchasePrice: 2000,
    sellingPrice: 2400,
    companyId: 3,
    lowStock: false,
    sku: "FSH-SCR-55-DS",
    description: "شاشة للإعلانات الرقمية",
    dateAdded: "2024-01-17",
    lastUpdated: "2024-01-23",
  },
];
*/

// Price History Data
// const initialPriceHistory: PriceHistory[] = [
//   {
//     id: 1,
//     productId: 1,
//     purchasePrice: 3600,
//     sellingPrice: 4000,
//     effectiveDate: "2024-01-01",
//     note: "السعر الافتتاحي",
//   },
//   {
//     id: 2,
//     productId: 1,
//     purchasePrice: 3800,
//     sellingPrice: 4200,
//     effectiveDate: "2024-01-15",
//     note: "زيادة تكلفة المواد الخام",
//   },
//   {
//     id: 3,
//     productId: 2,
//     purchasePrice: 2800,
//     sellingPrice: 3200,
//     effectiveDate: "2024-01-01",
//     note: "السعر الافتتاحي",
//   },
//   {
//     id: 4,
//     productId: 2,
//     purchasePrice: 3000,
//     sellingPrice: 3400,
//     effectiveDate: "2024-01-20",
//     note: "تحديث أسعار السوق",
//   },
// ];

// Auto-calculate low stock based on quantity ≤ 3
// const processedProducts = initialProducts.map((product) => ({
//   ...product,
//   lowStock: product.quantity <= 3,
// }));

const initialState: CompaniesState = {
  companies: initialCompanies,
  deviceCategories: initialDeviceCategories,
  isLoading: false,
};

// Helper function to update company product count
// const updateCompanyProductCount = (
//   companies: Company[],
//   products: Product[],
// ) => {
//   return companies.map((company) => ({
//     ...company,
//     productsCount: products.filter((p) => p.companyId === company.id).length,
//   }));
// };

// Reducer
const companiesReducer = (
  state: CompaniesState,
  action: CompaniesAction,
): CompaniesState => {
  switch (action.type) {
    case "ADD_COMPANY": {
      const newCompany: Company = {
        ...action.payload,
        id: Math.max(...state.companies.map((c) => c.id), 0) + 1,
      };
      return {
        ...state,
        companies: [...state.companies, newCompany],
      };
    }
    case "DELETE_COMPANY": {
      return {
        ...state,
        companies: state.companies.filter((c) => c.id !== action.payload),
      };
    }
    case "UPDATE_COMPANY": {
      return {
        ...state,
        companies: state.companies.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    }
    case "UPDATE_ACCOUNT_BALANCE": {
      return {
        ...state,
        companies: state.companies.map((c) =>
          c.id === action.payload.companyId
            ? { ...c, accountBalance: action.payload.balance }
            : c,
        ),
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

// Context
const CompaniesContext = createContext<
  | {
      state: CompaniesState;
      addCompany: (company: Omit<Company, "id">) => void;
      deleteCompany: (id: number) => void;
      updateCompany: (company: Company) => void;
      updateAccountBalance: (companyId: number, balance: number) => void;
      getCompanyById: (id: number) => Company | undefined;
      getCategoryByName: (categoryName: string) => DeviceCategory | undefined;
    }
  | undefined
>(undefined);

// Provider
export function CompaniesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(companiesReducer, initialState);

  const addCompany = (company: Omit<Company, "id">) => {
    dispatch({ type: "ADD_COMPANY", payload: company });
  };

  const deleteCompany = (id: number) => {
    dispatch({ type: "DELETE_COMPANY", payload: id });
  };

  const updateCompany = (company: Company) => {
    dispatch({ type: "UPDATE_COMPANY", payload: company });
  };

  const updateAccountBalance = (companyId: number, balance: number) => {
    dispatch({
      type: "UPDATE_ACCOUNT_BALANCE",
      payload: { companyId, balance },
    });
  };

  const getCompanyById = (id: number) => {
    return state.companies.find((c) => c.id === id);
  };

  const getCategoryByName = (categoryName: string) => {
    return state.deviceCategories.find((c) => c.id === categoryName);
  };

  return (
    <CompaniesContext.Provider
      value={{
        state,
        addCompany,
        deleteCompany,
        updateCompany,
        updateAccountBalance,
        getCompanyById,
        getCategoryByName,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCompanies() {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error("useCompanies must be used within a CompaniesProvider");
  }
  return context;
}
