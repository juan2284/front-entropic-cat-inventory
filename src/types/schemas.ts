import { z } from "zod";

export const customerSchema = z.object({
  _id: z.string(),
  identity_number: z.string(),
  name: z.string(),
  last_name: z.string(),
  telephone: z.string(),
  email: z.string()
});

export const productSchema = z.object({
  _id: z.string(),
  code: z.string(),
  name: z.string(),
  brand: z.string(),
  type: z.string(),
  description: z.string(),
  category: z.enum(["oils", "batteries", "parts", "accessories", "others"]),
  image: z.string()
});

export const supplierSchema = z.object({
  _id: z.string(),
  identity_number: z.string(),
  name: z.string(),
  last_name: z.string(),
  telephone: z.string(),
  email: z.string()
});

export const productPaymentSchema = z.object({
  _id: z.string(),
  id: productSchema,
  quantity: z.number(),
  unitPrice: z.number()
});

export const paymentSchema = z.object({
  _id: z.string(),
  total_amount: z.number(),
  customer: customerSchema,
  products: z.array(productPaymentSchema),
  amount_one: z.number(),
  amount_two: z.number(),
  amount_three: z.number(),
  currency_rate: z.number(),
  settlement_date: z.string(),
  status: z.enum(["pending", "paid"]),
  pending_amount: z.number()
});

export const chargeSchema = z.object({
  _id: z.string(),
  product: z.object({
    id: productSchema,
    quantity: z.number()
  }),
  total_amount: z.number(),
  supplier: supplierSchema,
  amount_one: z.number(),
  amount_two: z.number(),
  amount_three: z.number(),
  currency_rate: z.number(),
  settlement_date: z.string(),
  pending_amount: z.number(),
  status: z.enum(["pending", "paid"])
});

export const transactionsSchema = z.object({
    _id: z.string(),
    payment: z.object({
      _id: z.string(),
      total_amount: z.number(),
      customer: z.string(),
      products: z.array(z.object({
        _id: z.string(),
        id: z.string(),
        quantity: z.number()
      })),
      amount_one: z.number(),
      amount_two: z.number(),
      amount_three: z.number(),
      settlement_date: z.string(),
      status: z.enum(["pending", "paid"]),
      pending_amount: z.number()
    }),
    quantity: z.number()
  });

  export const productsTransactionSchema = z.object({
    id: productSchema,
    quantity: z.number()
  });

export const stocktakingSchema = z.object({
  _id: z.string(),
  product: productSchema,
  price_one: z.number(),
  price_two: z.number(),
  quantity: z.number(),
  supplier: supplierSchema,
  remaining: z.number(),
  stock_out: z.boolean(),
  charge:  z.object({
    _id: z.string(),
    product: z.object({
      id: z.string(),
      quantity: z.number()
    }),
    total_amount: z.number(),
    supplier: z.string(),
    amount_one: z.number(),
    amount_two: z.number(),
    amount_three: z.number(),
    settlement_date: z.string(),
    pending_amount: z.number(),
    status: z.enum(["pending", "paid"])
  }),
  transactions: z.array(transactionsSchema)
});

export const serviceSchema = z.object({
  _id: z.string(),
  customer: z.object({
    _id: z.string(),
    identity_number: z.string(),
    name: z.string(),
    last_name: z.string(),
    telephone: z.string(),
    email: z.string()
  }),
  payment: z.object({
    _id: z.string(),
    total_amount: z.number(),
    customer: z.string(),
    products: z.array(
      z.object({
        _id: z.string(),
        id: z.string(),
        quantity: z.number()
      })
    ),
    amount_one: z.number(),
    amount_two: z.number(),
    amount_three: z.number(),
    settlement_date: z.string(),
    status: z.enum(["pending", "paid"]),
    pending_amount: z.number()
  }),
  vehicle: z.string(),
  type_oil: z.string(),
  brand_oil: z.string(),
  filter: z.string(),
  mileage: z.number(),
  service_date: z.string(),
  contact: z.object({
    _id: z.string(),
    service: z.string(),
    result: z.enum(["pending", "contacted", "nowhatsapp", "wrong", "incomplete", "previously"])
  })
});

export const reminderSchema = z.object({
  _id: z.string(),
  service: serviceSchema,
  result: z.enum(["pending", "contacted", "nowhatsapp", "wrong", "incomplete", "previously"]),
  createdAt: z.string()
});

export const remindersSchema = z.array(
  reminderSchema
);

export const addChargeFormSchema = chargeSchema.pick({
  total_amount: true,
  amount_one: true,
  amount_two: true,
  amount_three: true,
  currency_rate: true,
  settlement_date: true,
  pending_amount: true,
  status: true
}).extend({
  supplier: z.string(),
  product: z.string(),
  quantity: z.number(),
  price_one: z.number(),
  price_two: z.number()
});

export const addPaymentFormSchema = paymentSchema.pick({
  total_amount: true,
  amount_one: true,
  amount_two: true,
  amount_three: true,
  currency_rate: true,
  pending_amount: true,
  status: true
}).extend({
  customer: z.string(),
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      unitPrice: z.number()
    })
  )
});

export const transactionSchema = z.object({
  _id: z.string(),
  type: z.enum(["charge", "payment", "edit", "partial", "total", 'creation']),
  total_amount: z.number(),
  pending_amount: z.number(),
  amount_one: z.number(),
  amount_two: z.number(),
  amount_three: z.number(),
  currency_rate: z.number(),
  receiver: z.string(),
  payment: paymentSchema,
  charge: chargeSchema,
  date: z.string()
});

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
});

export const userSchema = authSchema.pick({
  name: true,
  email: true,
  role: true
}).extend({
  _id: z.string()
});

export const customerReportFiltersSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

export const customersSchema = z.array(customerSchema);
export const usersSchema = z.array(userSchema);
export const paymentsSchema = z.array(paymentSchema);
export const servicesSchema = z.array(serviceSchema);
export const productsSchema = z.array(productSchema);
export const stocktakingsSchema = z.array(stocktakingSchema);
export const suppliersSchema = z.array(supplierSchema);
export const chargesSchema = z.array(chargeSchema);
export const transactionsArraySchema = z.array(transactionSchema);