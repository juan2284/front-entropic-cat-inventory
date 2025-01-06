export const productCategories = {
  OILS: 'oils',
  BATTERIES: 'batteries',
  PARTS: 'parts',
  ACCESSORIES: 'accessories',
  OTHERS: 'others'
};

export const progressBarOptions = {
  high: 'bg-teal-500',
  medium: 'bg-amber-500',
  low: 'bg-red-600'
};

export const paymentStatus = [
  'pending',
  'paid'
];

export const stocksStatus = [
  'in',
  'low',
  'out'
];

export const transactionType = {
  CREATION: 'creation',
  EDIT: 'edit',
  DELETE: 'delete',
  PARTIAL_PAY: 'partial',
  TOTAL_PAY: 'total'
};

export const contactResults = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  NOWHATSAPP: 'nowhatsapp',
  WRONG: 'wrong',
  INCOMPLETE: 'incomplete',
  PREVIOUSLY: 'previously'
};

export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

export const rolesList = {
  ADMIN: 'admin',
  REGULAR: 'regular'
} as const;