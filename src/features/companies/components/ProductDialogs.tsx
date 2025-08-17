import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/Select";
import { Input } from "../../../ui/Input";
import { Textarea } from "../../../ui/Textarea";
import { Label } from "../../../ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/Dialog";
import { Button } from "../../../ui/Button";
import { Plus, DollarSign, Package } from "lucide-react";
import { type DeviceCategory } from "../../../types";

// Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(1, "اسم المنتج مطلوب"),
  category: z.string().min(1, "الفئة مطلوبة"),
  purchasePrice: z.number().min(0, "سعر الشراء يجب أن يكون رقمًا موجبًا"),
  sellingPrice: z.number().min(0, "سعر البيع يجب أن يكون رقمًا موجبًا"),
  quantity: z.number().min(0, "الكمية يجب أن تكون رقمًا موجبًا"),
  sku: z.string().optional(),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: DeviceCategory[];
  onSubmit: (data: Omit<ProductFormData, "id" | "dateAdded" | "lastUpdated" | "lowStock">) => void;
}

export function AddProductDialog({ open, onOpenChange, categories, onSubmit }: AddProductDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 0,
      sku: "",
      description: "",
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-foreground flex items-center gap-2 text-lg">
            <div className="bg-primary text-primary-foreground rounded p-1.5">
              <Plus className="h-3 w-3" />
            </div>
            إضافة منتج جديد
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-right text-sm">
            أدخل بيانات المنتج الجديد. جميع الحقول مطلوبة ما عدا الكود والوصف.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="max-h-96 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">اسم المنتج *</Label>
              <Input
                {...register("name")}
                placeholder="أدخل اسم المنتج"
                className="text-right"
                dir="rtl"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">الفئة *</Label>
              <Select
                value={watch("category")}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر فئة المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-sm">{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">سعر الشراء *</Label>
                <div className="relative">
                  <DollarSign className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    type="number"
                    step="0.01"
                    {...register("purchasePrice", { valueAsNumber: true })}
                    placeholder="0.00"
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
                {errors.purchasePrice && (
                  <p className="text-destructive text-sm">{errors.purchasePrice.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm">سعر البيع *</Label>
                <div className="relative">
                  <DollarSign className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    type="number"
                    step="0.01"
                    {...register("sellingPrice", { valueAsNumber: true })}
                    placeholder="0.00"
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
                {errors.sellingPrice && (
                  <p className="text-destructive text-sm">{errors.sellingPrice.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">الكمية *</Label>
                <div className="relative">
                  <Package className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    type="number"
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="1"
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
                {errors.quantity && (
                  <p className="text-destructive text-sm">{errors.quantity.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm">كود المنتج</Label>
                <Input
                  {...register("sku")}
                  placeholder="اختياري"
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">وصف المنتج</Label>
              <Textarea
                {...register("description")}
                placeholder="وصف اختياري للمنتج"
                className="text-right"
                dir="rtl"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="submit" className="flex-1">
              إضافة المنتج
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              className="flex-1"
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Update Pricing Dialog
const updatePricingSchema = z.object({
  purchasePrice: z.number().min(0, "سعر الشراء يجب أن يكون رقمًا موجبًا"),
  sellingPrice: z.number().min(0, "سعر البيع يجب أن يكون رقمًا موجبًا"),
});

type UpdatePricingFormData = z.infer<typeof updatePricingSchema>;

interface UpdatePricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPurchasePrice: number;
  currentSellingPrice: number;
  onSubmit: (data: { purchasePrice: number; sellingPrice: number }) => void;
}

export function UpdatePricingDialog({ 
  open, 
  onOpenChange, 
  currentPurchasePrice, 
  currentSellingPrice,
  onSubmit 
}: UpdatePricingDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePricingFormData>({
    resolver: zodResolver(updatePricingSchema),
    defaultValues: {
      purchasePrice: currentPurchasePrice,
      sellingPrice: currentSellingPrice,
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const handleFormSubmit = (data: UpdatePricingFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-foreground text-lg">
            تحديث الأسعار
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-right text-sm">
            قم بتحديث أسعار الشراء والبيع للمنتج
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">سعر الشراء الجديد *</Label>
              <div className="relative">
                <DollarSign className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="number"
                  step="0.01"
                  {...register("purchasePrice", { valueAsNumber: true })}
                  placeholder="0.00"
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
              {errors.purchasePrice && (
                <p className="text-destructive text-sm">{errors.purchasePrice.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">سعر البيع الجديد *</Label>
              <div className="relative">
                <DollarSign className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="number"
                  step="0.01"
                  {...register("sellingPrice", { valueAsNumber: true })}
                  placeholder="0.00"
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
              {errors.sellingPrice && (
                <p className="text-destructive text-sm">{errors.sellingPrice.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="submit" className="flex-1">
              تحديث الأسعار
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              className="flex-1"
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Update Quantity Dialog
const updateQuantitySchema = z.object({
  quantity: z.number().min(0, "الكمية يجب أن تكون رقمًا موجبًا"),
});

type UpdateQuantityFormData = z.infer<typeof updateQuantitySchema>;

interface UpdateQuantityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentQuantity: number;
  onSubmit: (data: { quantity: number }) => void;
}

export function UpdateQuantityDialog({ 
  open, 
  onOpenChange, 
  currentQuantity,
  onSubmit 
}: UpdateQuantityDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateQuantityFormData>({
    resolver: zodResolver(updateQuantitySchema),
    defaultValues: {
      quantity: currentQuantity,
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const handleFormSubmit = (data: UpdateQuantityFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-foreground text-lg">
            تحديث الكمية
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-right text-sm">
            قم بتحديث كمية المنتج في المخزون
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">الكمية الجديدة *</Label>
              <div className="relative">
                <Package className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  placeholder="0"
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
              {errors.quantity && (
                <p className="text-destructive text-sm">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="submit" className="flex-1">
              تحديث الكمية
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              className="flex-1"
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}