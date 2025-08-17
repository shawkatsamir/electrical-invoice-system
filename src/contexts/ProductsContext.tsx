import{ createContext, useContext, useReducer, type ReactNode } from "react";

// Types
export interface DeviceCategory {
  id: string;
  name: string;
  arabicName: string;
  productCount: number;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number; 
  sellingPrice: number; 
  companyId: number;
  lowStock: boolean;
  sku?: string;
  description?: string;
  specifications?: string;
  dateAdded: string;
  lastUpdated: string;
}

export interface PriceHistory {
  id: number;
  productId: number;
  purchasePrice: number;
  sellingPrice: number;
  effectiveDate: string;
  note: string;
  updatedBy?: string;
}

interface ProductsState {
  deviceCategories: DeviceCategory[];
  products: Product[];
  priceHistory: PriceHistory[];
  isLoading: boolean;
}

type ProductsAction =
  | {
      type: "ADD_PRODUCT";
      payload: Omit<Product, "id" | "dateAdded" | "lastUpdated" | "lowStock">;
    }
  | {
      type: "UPDATE_PRODUCT_QUANTITY";
      payload: { productId: number; additionalQuantity: number };
    }
  | {
      type: "UPDATE_PRODUCT_PRICE";
      payload: {
        productId: number;
        purchasePrice: number;
        sellingPrice: number;
        effectiveDate: string;
        note: string;
      };
    }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "DELETE_PRODUCTS_BY_COMPANY"; payload: number }
  | { type: "SET_LOADING"; payload: boolean };

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
const initialProducts: Product[] = [
  // LG Company (ID: 1) - Premium Electronics with Advanced Technology
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

// Price History Data
const initialPriceHistory: PriceHistory[] = [
  {
    id: 1,
    productId: 1,
    purchasePrice: 3600,
    sellingPrice: 4000,
    effectiveDate: "2024-01-01",
    note: "السعر الافتتاحي",
  },
  {
    id: 2,
    productId: 1,
    purchasePrice: 3800,
    sellingPrice: 4200,
    effectiveDate: "2024-01-15",
    note: "زيادة تكلفة المواد الخام",
  },
  {
    id: 3,
    productId: 2,
    purchasePrice: 2800,
    sellingPrice: 3200,
    effectiveDate: "2024-01-01",
    note: "السعر الافتتاحي",
  },
  {
    id: 4,
    productId: 2,
    purchasePrice: 3000,
    sellingPrice: 3400,
    effectiveDate: "2024-01-20",
    note: "تحديث أسعار السوق",
  },
];

// Auto-calculate low stock based on quantity ≤ 3
const processedProducts = initialProducts.map((product) => ({
  ...product,
  lowStock: product.quantity <= 3,
}));

const initialState: ProductsState = {
  deviceCategories: initialDeviceCategories,
  products: processedProducts,
  priceHistory: initialPriceHistory,
  isLoading: false,
};

// Reducer
const productsReducer = (
  state: ProductsState,
  action: ProductsAction,
): ProductsState => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newProduct: Product = {
        ...action.payload,
        id: Math.max(...state.products.map((p) => p.id), 0) + 1,
        dateAdded: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
        lowStock: action.payload.quantity <= 3,
      };

      return {
        ...state,
        products: [...state.products, newProduct],
      };
    }
    case "UPDATE_PRODUCT_QUANTITY": {
      const updatedProducts = state.products.map((p) =>
        p.id === action.payload.productId
          ? {
              ...p,
              quantity: p.quantity + action.payload.additionalQuantity,
              lowStock: p.quantity + action.payload.additionalQuantity <= 3,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }
    case "UPDATE_PRODUCT_PRICE": {
      const { productId, purchasePrice, sellingPrice, effectiveDate, note } =
        action.payload;

      // Update the product prices
      const updatedProducts = state.products.map((p) =>
        p.id === productId
          ? {
              ...p,
              purchasePrice,
              sellingPrice,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      );

      // Add to price history
      const newPriceHistory: PriceHistory = {
        id: Math.max(...state.priceHistory.map((ph) => ph.id), 0) + 1,
        productId,
        purchasePrice,
        sellingPrice,
        effectiveDate,
        note,
      };

      return {
        ...state,
        products: updatedProducts,
        priceHistory: [...state.priceHistory, newPriceHistory],
      };
    }
    case "DELETE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        priceHistory: state.priceHistory.filter(
          (ph) => ph.productId !== action.payload,
        ),
      };
    }
    case "DELETE_PRODUCTS_BY_COMPANY": {
      const productsToDelete = state.products
        .filter((p) => p.companyId === action.payload)
        .map((p) => p.id);
      return {
        ...state,
        products: state.products.filter((p) => p.companyId !== action.payload),
        priceHistory: state.priceHistory.filter(
          (ph) => !productsToDelete.includes(ph.productId),
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
const ProductsContext = createContext<
  | {
      state: ProductsState;
      addProduct: (
        product: Omit<Product, "id" | "dateAdded" | "lastUpdated" | "lowStock">,
      ) => void;
      updateProductQuantity: (
        productId: number,
        additionalQuantity: number,
      ) => void;
      updateProductPrice: (
        productId: number,
        purchasePrice: number,
        sellingPrice: number,
        effectiveDate: string,
        note: string,
      ) => void;
      deleteProduct: (productId: number) => void;
      deleteProductsByCompany: (companyId: number) => void;
      getProductsByCategory: (
        category: string,
        companyId?: number,
      ) => Product[];
      getProductsByCompany: (companyId: number) => Product[];
      getProductById: (productId: number) => Product | undefined;
      getPriceHistory: (productId: number) => PriceHistory[];
      getCategoryByName: (categoryName: string) => DeviceCategory | undefined;
      getCategoryProductCount: (
        categoryId: string,
        companyId?: number,
      ) => number;
      getCompanyStatistics: (companyId: number) => {
        totalProducts: number;
        totalValue: number;
        lowStockProducts: number;
        averagePrice: number;
      };
      getCompanyProductStatistics: (companyId: number) => {
        totalProducts: number;
        totalInventoryValue: number;
        lowStockProducts: number;
        outOfStockProducts: number;
        totalQuantity: number;
      };
    }
  | undefined
>(undefined);

// Provider
export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const addProduct = (
    product: Omit<Product, "id" | "dateAdded" | "lastUpdated" | "lowStock">,
  ) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const updateProductQuantity = (
    productId: number,
    additionalQuantity: number,
  ) => {
    dispatch({
      type: "UPDATE_PRODUCT_QUANTITY",
      payload: { productId, additionalQuantity },
    });
  };

  const updateProductPrice = (
    productId: number,
    purchasePrice: number,
    sellingPrice: number,
    effectiveDate: string,
    note: string,
  ) => {
    dispatch({
      type: "UPDATE_PRODUCT_PRICE",
      payload: { productId, purchasePrice, sellingPrice, effectiveDate, note },
    });
  };

  const deleteProduct = (productId: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
  };

  const deleteProductsByCompany = (companyId: number) => {
    dispatch({ type: "DELETE_PRODUCTS_BY_COMPANY", payload: companyId });
  };

  const getProductsByCategory = (category: string, companyId?: number) => {
    return state.products.filter((p) => {
      const matchesCategory = p.category === category;
      const matchesCompany = companyId ? p.companyId === companyId : true;
      return matchesCategory && matchesCompany;
    });
  };

  const getProductsByCompany = (companyId: number) => {
    return state.products.filter((p) => p.companyId === companyId);
  };

  const getProductById = (productId: number) => {
    return state.products.find((p) => p.id === productId);
  };

  const getPriceHistory = (productId: number) => {
    return state.priceHistory
      .filter((ph) => ph.productId === productId)
      .sort(
        (a, b) =>
          new Date(b.effectiveDate).getTime() -
          new Date(a.effectiveDate).getTime(),
      );
  };

  const getCategoryByName = (categoryName: string) => {
    return state.deviceCategories.find((c) => c.id === categoryName);
  };

  const getCategoryProductCount = (categoryId: string, companyId?: number) => {
    return getProductsByCategory(categoryId, companyId).length;
  };

  const getCompanyStatistics = (companyId: number) => {
    const companyProducts = getProductsByCompany(companyId);
    const totalProducts = companyProducts.length;
    const totalValue = companyProducts.reduce(
      (sum, p) => sum + p.sellingPrice * p.quantity,
      0,
    );
    const lowStockProducts = companyProducts.filter((p) => p.lowStock).length;
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

    return {
      totalProducts,
      totalValue,
      lowStockProducts,
      averagePrice,
    };
  };

  const getCompanyProductStatistics = (companyId: number) => {
    const products = getProductsByCompany(companyId);
    return {
      totalProducts: products.length,
      totalInventoryValue: products.reduce(
        (total, product) => total + product.purchasePrice * product.quantity,
        0,
      ),
      lowStockProducts: products.filter(
        (product) => product.quantity <= 3 && product.quantity > 0,
      ).length,
      outOfStockProducts: products.filter((product) => product.quantity === 0)
        .length,
      totalQuantity: products.reduce(
        (total, product) => total + product.quantity,
        0,
      ),
    };
  };

  return (
    <ProductsContext.Provider
      value={{
        state,
        addProduct,
        updateProductQuantity,
        updateProductPrice,
        deleteProduct,
        deleteProductsByCompany,
        getProductsByCategory,
        getProductsByCompany,
        getProductById,
        getPriceHistory,
        getCategoryByName,
        getCategoryProductCount,
        getCompanyStatistics,
        getCompanyProductStatistics,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

// Custom hook that provides the same interface as useCompanies for products
// This allows existing code to work without changes while using the separated context
// export function useCompanies() {
//   const context = useContext(ProductsContext);
//   if (context === undefined) {
//     throw new Error("useCompanies must be used within a ProductsProvider");
//   }
//   return context;
// }
