import { z } from "zod";
import { addChargeFormSchema, addPaymentFormSchema, authSchema, chargeSchema, chargesSchema, customerReportFiltersSchema, customerSchema, customersSchema, paymentSchema, paymentsSchema, productSchema, productsSchema, productsTransactionSchema, reminderSchema, remindersSchema, serviceSchema, servicesSchema, stocktakingSchema, stocktakingsSchema, supplierSchema, suppliersSchema, transactionsArraySchema, transactionSchema, userSchema, usersSchema } from "@/types/schemas";

export type GlobalStockByCategoriesType = {
  category: Product['category'];
  productQ: number;
  initialStock: number;
  stocksQ: number;
  stock: number; 
};

export type ResultsContactsCountType = {
  contactResult: string;
  quantity: number | undefined;
};

export type ProductsDetailsType = {
  id: string;
  code: string;
  product: string;
  globalStock: number;
  sales: number;
  partialStock: number;
  globalQuantity: number;
  stockStatus: string;
  category: Product['category'];
  priceOne: number;
  priceTwo: number;
  currencyTotal: number;
  amountTotal: number;
};

export type StatusStockType = {
  inStock: number;
  lowStock: number;
  outStock: number;
};

export type TransactionsSuppliersDetailsType = {
  grossAmount: number;
  totalAmountDelivered: number;
  totalAmountPending: number;
  totalCurrencyDelivered: number;
  totalLocalDelivered: number;
  totalCardDelivered: number;
  totalQuantityPending: number;
  totalQuantityPaid: number;
};

export type TransactionsCustomersDetailsType ={
  grossAmountPurchases: number;
  totalAmountReceived: number;
  totalAmountPending: number;
  totalQuantityProducts: number;
  totalNumberTransactions: number;
  totalCurrencyReceived: number;
  totalLocalReceived: number;
  totalCardReceived: number;
  totalQuantityPending: number;
  totalQuantityPaid: number;
};

export type StocksFilterView = {
  supplier: string;
  productCode: string;
  paymentStatus: string;
  stockStatus: string;
};

export type PaymentsFilterView = {
  identityNumber: string;
  paymentStatus: string;
};

export type ServicesFilterView = {
  identityNumber: string;
  payment: string;
  vehicle: string;
  service_date: string;
  contact: Reminder['result'];
};

export type RemindersFilterView = {
  identityNumber: string;
  payment: string;
  service_date: string;
  contact: Reminder['result'];
};

export type UsersFilterView = {
  email: string;
  name: string;
  role: string;
};

export type ProductArray = {
  id: Product['_id'];
  name: string;
  price_one: number;
  unit_price_one: number;
  total_price_one: number;
  total_price_two: number;
  price_two: number;
  quantity: number;
};

export type ServiceFormType = {
  customer: string;
  payment: string;
  vehicle: string;
  type_oil: string;
  brand_oil: string;
  filter: string;
  mileage: number;
};

export type StockFormType = {
  price_one: number;
  price_two: number;
  stock_out: boolean;
};

export type ActivateStockType = {
  stock_out: boolean;
};

export type TransactionEditForm = {  
total_amount: number,
amount_one: number,
amount_two: number,
amount_three: number,
currency_rate: number
};

export type ProductReport = {
  code: string;
  name: string;
  brand: string;
  type: string;
  description: string;
  category: string;
  stock: string;
  sales: string;
  stocksNumber: string;
}[];

export type SalesXProduct = {
  id: string;
  code: string;
  product: string;
  saleDate: string;
  quantity: string;
}[];

export type Auth = z.infer<typeof authSchema>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'role' | 'password' | 'password_confirmation'>;
export type ProductsTransactionSchema = z.infer<typeof productsTransactionSchema>;
export type ProductsArray = ProductArray[];
export type AddChargeFormType = z.infer<typeof addChargeFormSchema>;
export type AddPaymentFormType = z.infer<typeof addPaymentFormSchema>;
export type Customer = z.infer<typeof customerSchema>;
export type Customers = z.infer<typeof customersSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type Payments = z.infer<typeof paymentsSchema>;
export type Charge = z.infer<typeof chargeSchema>;
export type Charges = z.infer<typeof chargesSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Services = z.infer<typeof servicesSchema>;
export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;
export type Reminder = z.infer<typeof reminderSchema>;
export type Reminders = z.infer<typeof remindersSchema>;
export type Stocktaking = z.infer<typeof stocktakingSchema>;
export type Stocktakings = z.infer<typeof stocktakingsSchema>;
export type Supplier = z.infer<typeof supplierSchema>;
export type Suppliers = z.infer<typeof suppliersSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Transactions = z.infer<typeof transactionsArraySchema>;
export type User = z.infer<typeof userSchema>;
export type Users = z.infer<typeof usersSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type ChargesFilterView = Pick<StocksFilterView, 'supplier' | 'productCode' | 'paymentStatus'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;
export type CustomerReportFilters = z.infer<typeof customerReportFiltersSchema>;