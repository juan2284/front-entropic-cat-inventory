import { Charge, Charges, ChargesFilterView, Customer, Customers, Payment, Payments, PaymentsFilterView, Product, Products, Reminder, Reminders, RemindersFilterView, Service, Services, ServicesFilterView, StocksFilterView, Stocktaking, Stocktakings, Supplier, Suppliers, Transaction, Transactions, User, Users, UsersFilterView } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";

export type ListActions = 
  {type: 'show-modal'} |
  {type: 'show-add'} |
  {type: 'show-edit'} |
  {type: 'show-delete'} |
  {type: 'show-details', payload: {result: boolean}} |
  {type: 'clear-filters'} |
  {type: 'clear-states'} |
  {type: 'set-user', payload: {user: User}} |

  {type: 'search-customer', payload: {search: string, data: Customers}} |
  {type: 'search-supplier', payload: {search: string, data: Suppliers}} |
  {type: 'search-product', payload: {search: string, data: Products}} |
  {type: 'search-stock', payload: {search: string, data: Stocktakings}} |
  {type: 'search-charge', payload: {search: string, data: Charges}} |
  {type: 'search-payment', payload: {search: string, data: Payments}} |
  {type: 'search-service', payload: {search: string, data: Services}} |
  {type: 'search-reminder', payload: {search: string, data: Reminders}} |
  {type: 'search-transaction', payload: {search: string, data: Transactions}} |
  {type: 'search-user', payload: {search: string, data: Users}} |

  {type: 'filter-customers', payload: {customers: Customers, filters: Customer}} |
  {type: 'filter-suppliers', payload: {suppliers: Suppliers, filters: Supplier}} |
  {type: 'filter-products', payload: {products: Products, filters: Product}} |
  {type: 'filter-stocks-view', payload: {stocks: Stocktakings, filters: StocksFilterView}} |
  {type: 'filter-charges-view', payload: {charges: Charges, filters: ChargesFilterView}} |
  {type: 'filter-payments-view', payload: {payments: Payments, filters: PaymentsFilterView}} |
  {type: 'filter-services-view', payload: {services: Services, filters: ServicesFilterView}} |
  {type: 'filter-reminders-view', payload: {reminders: Reminders, filters: RemindersFilterView}} |
  {type: 'filter-users-view', payload: {users: Users, filters: UsersFilterView}} |

  {type: 'set-customer-details', payload: {customer: Customer}} |
  {type: 'set-supplier-details', payload: {supplier: Supplier}} |
  {type: 'set-product-details', payload: {product: Product}} |
  {type: 'set-stock-details', payload: {stock: Stocktaking}} |
  {type: 'set-charge-details', payload: {charge: Charge}} |
  {type: 'set-payment-details', payload: {payment: Payment}} |
  {type: 'set-service-details', payload: {service: Service}} |
  {type: 'set-reminder-details', payload: {reminder: Reminder}} |
  {type: 'set-transaction-details', payload: {transaction: Transaction}} |
  {type: 'set-user-details', payload: {user: User}} |
  
  {type: 'filter-charges', payload: {filter: string}} |
  {type: 'filter-payments', payload: {filter: string}} |
  {type: 'filter-stocks', payload: {filter: string}} |
  {type: 'filter-services', payload: {filter: string}} |
  {type: 'filter-reminders', payload: {filter: string}} |
  {type: 'filter-transactions', payload: {filter: string}} |
  {type: 'filter-users', payload: {filter: string}}
;

export type ListState = {
  customerDetails: Customer;
  supplierDetails: Supplier;
  productDetails: Product;
  stockDetails: Stocktaking;
  chargeDetails: Charge;
  paymentDetails: Payment;
  serviceDetails: Service;
  reminderDetails: Reminder;
  transactionDetails: Transaction;
  userDetails: User;

  customers: Customers;
  suppliers: Suppliers;
  products: Products;
  stocks: Stocktakings;
  charges: Charges;
  payments: Payments;
  services: Services;
  reminders: Reminders;
  transactions: Transactions;
  users: Users;

  searchCustomer: Customers;
  searchSupplier: Suppliers;
  searchProduct: Products;
  searchStock: Stocktakings;
  searchCharge: Charges;
  searchPayment: Payments;
  searchService: Services;
  searchReminder: Reminders;
  searchTransaction: Transactions;
  searchUser: Users;

  paymentFilter: string;
  stocksFilter: string;
  chargeFilter: string;
  servicesFilter: string;
  remindersFilter: string;
  transactionsFilter: string;
  usersFilter: string;

  show: boolean;
  filteredCustomers: boolean;
  viewDeleteCustomer: boolean;
  viewAddCustomer: boolean;
  viewEditCustomer: boolean;
  viewDetailsCustomer: boolean;
  userAuthenticated: User;
};

export const emptyCustomer: Customer = <Customer>{};
export const emptySupplier: Supplier = <Supplier>{};
export const emptyProduct: Product = <Product>{};
export const emptyStocktaking: Stocktaking = <Stocktaking>{};
export const emptyCharge: Charge = <Charge>{};
export const emptyPayment: Payment = <Payment>{};
export const emptyService: Service = <Service>{};
export const emptyReminder: Reminder = <Reminder>{};
export const emptyTransaction: Transaction = <Transaction>{};
export const emptyUser: User = <User>{};

export const initialState: ListState = {
  customers: [],
  suppliers: [],
  products: [],
  stocks: [],
  charges: [],
  payments: [],
  services: [],
  reminders: [],
  transactions: [],
  users: [],

  searchCustomer: [],
  searchSupplier: [],
  searchProduct: [],
  searchStock: [],
  searchCharge: [],
  searchPayment: [],
  searchService: [],
  searchReminder: [],
  searchTransaction: [],
  searchUser: [],

  customerDetails: emptyCustomer,
  supplierDetails: emptySupplier,
  productDetails: emptyProduct,
  stockDetails: emptyStocktaking,
  chargeDetails: emptyCharge,
  paymentDetails: emptyPayment,
  serviceDetails: emptyService,
  reminderDetails: emptyReminder,
  transactionDetails: emptyTransaction,
  userDetails: emptyUser,

  paymentFilter: 'todos',
  chargeFilter: 'todos',
  stocksFilter: 'todos',
  servicesFilter: 'todos',
  remindersFilter: 'todos',
  transactionsFilter: 'todos',
  usersFilter: 'todos',

  show: false,
  filteredCustomers: false,
  viewAddCustomer: false,
  viewDeleteCustomer: false,
  viewEditCustomer: false,
  viewDetailsCustomer: false,
  userAuthenticated: emptyUser
};

export const CustomerReducer = (
  state: ListState = initialState,
  action: ListActions
) => {

  if (action.type === 'show-modal') {
    return {
      ...state,
      show: state.show === true ? false : true
    };
  }

  if (action.type === 'search-customer') {
    const customerSearch = action.payload.data.filter(customerFiltered => customerFiltered.identity_number === action.payload.search || customerFiltered.telephone === action.payload.search);
    return {
      ...state,
      searchCustomer: customerSearch
    };
  }

  if (action.type === 'search-supplier') {
    const supplierSearch = action.payload.data.filter(supplierFiltered => supplierFiltered.identity_number === action.payload.search || supplierFiltered.telephone === action.payload.search);
    return {
      ...state,
      searchSupplier: supplierSearch
    };
  }

  if (action.type === 'search-product') {
    const productSearch = action.payload.data.filter(productFiltered => productFiltered.code === action.payload.search);
    return {
      ...state,
      searchProduct: productSearch
    };
  }

  if (action.type === 'search-stock') {
    const stockSearch = action.payload.data.filter(stockFiltered => stockFiltered.product.code === action.payload.search);
    return {
      ...state,
      searchStock: stockSearch
    };
  }

  if (action.type === 'search-charge') {
    const chargeSearch = action.payload.data.filter(chargeFiltered => chargeFiltered._id.slice(-5) === action.payload.search.slice(-5));
    return {
      ...state,
      searchCharge: chargeSearch
    };
  }

  if (action.type === 'search-payment') {
    const paymentSearch = action.payload.data.filter(paymentFiltered => paymentFiltered._id.slice(-5) === action.payload.search.slice(-5));
    return {
      ...state,
      searchPayment: paymentSearch
    };
  }

  if (action.type === 'search-service') {
    const serviceSearch = action.payload.data.filter(serviceFiltered => serviceFiltered.customer.identity_number === action.payload.search);
    return {
      ...state,
      searchService: serviceSearch
    };
  }

  if (action.type === 'search-reminder') {
    const remindersSearch = action.payload.data.filter(reminderFiltered => reminderFiltered.service.customer.identity_number === action.payload.search);
    return {
      ...state,
      searchReminder: remindersSearch
    };
  }

  if (action.type === 'search-transaction') {    
    const transactionsSearch: Transactions = [];    
    action.payload.data.map(transactionFiltered => {
      if (transactionFiltered.payment !== null) {
        if (transactionFiltered.payment._id.slice(-5) === action.payload.search.slice(-5)) {
          transactionsSearch.push(transactionFiltered);          
        }
      } else if (transactionFiltered.charge !== null) {
        if (transactionFiltered.charge._id.slice(-5) === action.payload.search.slice(-5)) {
          transactionsSearch.push(transactionFiltered);          
        }
      }
    });
    return {
      ...state,
      searchTransaction: transactionsSearch
    };
  }

  if (action.type === 'search-user') {
    const usersSearch = action.payload.data.filter(userFiltered => userFiltered.email.toLowerCase() === action.payload.search.toLowerCase() || userFiltered.name.toLowerCase() === action.payload.search.toLowerCase());
    return {
      ...state,
      searchUser: usersSearch
    };
  }

  if (action.type === 'filter-customers') {

    let customersFiltered: Customers = [];
    action.payload.customers.map(customerFiltered => {
      if (
        customerFiltered.identity_number.toLowerCase().includes(action.payload.filters.identity_number.toLowerCase()) && action.payload.filters.identity_number !== '' ||
        customerFiltered.name.toLowerCase().includes(action.payload.filters.name.toLowerCase()) && action.payload.filters.name !== '' ||
        customerFiltered.last_name.toLowerCase().includes(action.payload.filters.last_name.toLowerCase()) && action.payload.filters.last_name !== '' ||
        customerFiltered.telephone.toLowerCase().includes(action.payload.filters.telephone.toLowerCase()) && action.payload.filters.telephone !== '' ||
        customerFiltered.email.toLowerCase().includes(action.payload.filters.email.toLowerCase()) && action.payload.filters.email !== ''
      ) {
        customersFiltered.push(customerFiltered);
      }
    });
    
    return {
      ...state,
      customers: customersFiltered
    };
  }

  if (action.type === 'filter-suppliers') {

    let suppliersFiltered: Suppliers = [];
    action.payload.suppliers.map(supplierFiltered => {
      if (
        supplierFiltered.identity_number.toLowerCase().includes(action.payload.filters.identity_number.toLowerCase()) && action.payload.filters.identity_number !== '' ||
        supplierFiltered.name.toLowerCase().includes(action.payload.filters.name.toLowerCase()) && action.payload.filters.name !== '' ||
        supplierFiltered.last_name.toLowerCase().includes(action.payload.filters.last_name.toLowerCase()) && action.payload.filters.last_name !== '' ||
        supplierFiltered.telephone.toLowerCase().includes(action.payload.filters.telephone.toLowerCase()) && action.payload.filters.telephone !== '' ||
        supplierFiltered.email.toLowerCase().includes(action.payload.filters.email.toLowerCase()) && action.payload.filters.email !== ''
      ) {
        suppliersFiltered.push(supplierFiltered);
      }
    });
    
    return {
      ...state,
      suppliers: suppliersFiltered
    };
  }

  if (action.type === 'filter-products') {

    let productsFiltered: Products = [];
    action.payload.products.map(productFiltered => {
      if (
        productFiltered.code.toLowerCase().includes(action.payload.filters.code.toLowerCase()) && action.payload.filters.code !== '' ||
        productFiltered.name.toLowerCase().includes(action.payload.filters.name.toLowerCase()) && action.payload.filters.name !== '' ||
        productFiltered.brand.toLowerCase().includes(action.payload.filters.brand.toLowerCase()) && action.payload.filters.brand !== '' ||
        productFiltered.type.toLowerCase().includes(action.payload.filters.type.toLowerCase()) && action.payload.filters.type !== '' ||
        productFiltered.description.toLowerCase().includes(action.payload.filters.description.toLowerCase()) && action.payload.filters.description !== '' ||
        productFiltered.category.toLowerCase().includes(action.payload.filters.category.toLowerCase())
      ) {
        productsFiltered.push(productFiltered);
      }
    });
    
    return {
      ...state,
      products: productsFiltered
    };
  }

  if (action.type === 'filter-stocks-view') {

    let stocksFiltered: Stocktakings = [];
    action.payload.stocks.map(stockFiltered => {
      const statusStock: string = (stockFiltered.remaining/stockFiltered.quantity)*100 >50 ? 'in' : (stockFiltered.remaining/stockFiltered.quantity)*100 <=50 && (stockFiltered.remaining/stockFiltered.quantity)*100 > 0 ? 'low' : 'out';
      if (
        stockFiltered.supplier.identity_number.toLowerCase().includes(action.payload.filters.supplier.toLowerCase()) && action.payload.filters.supplier !== '' ||
        stockFiltered.product.code.toLowerCase().includes(action.payload.filters.productCode.toLowerCase()) && action.payload.filters.productCode !== '' ||
        stockFiltered.charge.status.toLowerCase().includes(action.payload.filters.paymentStatus.toLowerCase()) && action.payload.filters.paymentStatus !== '' ||
        statusStock === action.payload.filters.stockStatus && action.payload.filters.stockStatus !== ''
      ) {
        stocksFiltered.push(stockFiltered);
      }
    });
    
    return {
      ...state,
      stocks: stocksFiltered
    };
  }

  if (action.type === 'filter-charges-view') {
    let chargesFiltered: Charges = [];
    action.payload.charges.map(chargeFiltered => {
      if (
        chargeFiltered.supplier.identity_number.toLowerCase().includes(action.payload.filters.supplier.toLowerCase()) && action.payload.filters.supplier !== '' ||
        chargeFiltered.product.id.code.toLowerCase().includes(action.payload.filters.productCode.toLowerCase()) && action.payload.filters.productCode !== '' ||
        chargeFiltered.status.toLowerCase().includes(action.payload.filters.paymentStatus.toLowerCase()) && action.payload.filters.paymentStatus !== ''
      ) {
        chargesFiltered.push(chargeFiltered);
      }
    });
    
    return {
      ...state,
      charges: chargesFiltered
    };
  }

  if (action.type === 'filter-payments-view') {
    let paymentsFiltered: Payments = [];
    action.payload.payments.map(paymentFiltered => {
      if (
        paymentFiltered.customer.identity_number.toLowerCase().includes(action.payload.filters.identityNumber.toLowerCase()) && action.payload.filters.identityNumber !== '' ||
        paymentFiltered.status.toLowerCase().includes(action.payload.filters.paymentStatus.toLowerCase()) && action.payload.filters.paymentStatus !== ''
      ) {
        paymentsFiltered.push(paymentFiltered);
      }
    });
    
    return {
      ...state,
      payments: paymentsFiltered
    };
  }

  if (action.type === 'filter-services-view') {
    let servicesFiltered: Services = [];
    action.payload.services.map(serviceFiltered => {
      const serviceDate = formatDate(serviceFiltered.service_date);
      const fourHoursMs = 4 * 60 * 60 * 1000;
      const dateMs = action.payload.filters.service_date ? Date.parse(action.payload.filters.service_date) + fourHoursMs : 0;
      const transformDate = new Date(dateMs).toDateString();
      const filterDate = formatDate(transformDate);
      if (
        serviceFiltered.customer.identity_number.toLowerCase().includes(action.payload.filters.identityNumber.toLowerCase()) && action.payload.filters.identityNumber !== '' ||
        serviceFiltered.payment._id.slice(-5).toLowerCase() === action.payload.filters.payment.toLowerCase() && action.payload.filters.payment !== '' ||
        serviceFiltered.vehicle.toLowerCase().includes(action.payload.filters.vehicle.toLowerCase()) && action.payload.filters.vehicle !== '' ||
        serviceFiltered.contact.result === action.payload.filters.contact.toLowerCase() ||
        serviceDate === filterDate && action.payload.filters.service_date !== ''
      ) {
        servicesFiltered.push(serviceFiltered);
      }
    });
    
    return {
      ...state,
      services: servicesFiltered
    };
  }

  if (action.type === 'filter-reminders-view') {
    let remindersFiltered: Reminders = [];
    action.payload.reminders.map(reminderFiltered => {
      const serviceDate = formatDate(reminderFiltered.createdAt);
      const fourHoursMs = 4 * 60 * 60 * 1000;
      const dateMs = action.payload.filters.service_date ? Date.parse(action.payload.filters.service_date) + fourHoursMs : 0;
      const transformDate = new Date(dateMs).toDateString();
      const filterDate = formatDate(transformDate);
      if (
        reminderFiltered.service.customer.identity_number.toLowerCase().includes(action.payload.filters.identityNumber.toLowerCase()) && action.payload.filters.identityNumber !== '' ||
        reminderFiltered.service.payment._id.slice(-5).toLowerCase() === action.payload.filters.payment.toLowerCase() && action.payload.filters.payment !== '' ||
        reminderFiltered.service.contact.result === action.payload.filters.contact.toLowerCase() ||
        serviceDate === filterDate && action.payload.filters.service_date !== ''
      ) {
        remindersFiltered.push(reminderFiltered);
      }
    });
    
    return {
      ...state,
      reminders: remindersFiltered
    };
  }

  if (action.type === 'filter-users-view') {
    let usersFiltered: Users = [];
    action.payload.users.map(userFiltered => {
      if (
        userFiltered.name.toLowerCase().includes(action.payload.filters.name.toLowerCase()) && action.payload.filters.name !== '' ||
        userFiltered.email.toLowerCase().includes(action.payload.filters.email.toLowerCase()) && action.payload.filters.email !== ''
      ) {
        usersFiltered.push(userFiltered);
      }
    });
    
    return {
      ...state,
      users: usersFiltered
    };
  }

  if (action.type === 'clear-filters') {
    return {
      ...state,
      customers: [],
      suppliers: [],
      products: [],
      stocks: [],
      charges: [],
      payments: [],
      services: [],
      reminders: [],
      transactions: [],
      users: []
    };
  }

  if (action.type === 'show-add') {
    return {
      ...state,
      viewAddCustomer: state.viewAddCustomer === true ? false : true
    };
  }

  if (action.type === 'show-delete') {
    return {
      ...state,
      viewDeleteCustomer: state.viewDeleteCustomer === true ? false : true,
      customerDetails: state.viewDeleteCustomer === true ? emptyCustomer : state.customerDetails
    };
  }

  if (action.type === 'set-customer-details') {
    return {
      ...state,
      customerDetails: action.payload.customer
    }
  }

  if (action.type === 'set-supplier-details') {
    return {
      ...state,
      supplierDetails: action.payload.supplier
    }
  }

  if (action.type === 'set-product-details') {
    return {
      ...state,
      productDetails: action.payload.product
    }
  }

  if (action.type === 'set-stock-details') {
    return {
      ...state,
      stockDetails: action.payload.stock
    }
  }

  if (action.type === 'set-charge-details') {
    return {
      ...state,
      chargeDetails: action.payload.charge
    }
  }

  if (action.type === 'set-payment-details') {
    return {
      ...state,
      paymentDetails: action.payload.payment
    }
  }

  if (action.type === 'set-service-details') {
    return {
      ...state,
      serviceDetails: action.payload.service
    }
  }

  if (action.type === 'set-reminder-details') {
    return {
      ...state,
      reminderDetails: action.payload.reminder
    }
  }

  if (action.type === 'set-transaction-details') {
    return {
      ...state,
      transactionDetails: action.payload.transaction
    }
  }

  if (action.type === 'set-user-details') {
    return {
      ...state,
      userDetails: action.payload.user
    }
  }

  if (action.type === 'show-edit') {
    return {
      ...state,
      viewEditCustomer: state.viewEditCustomer === true ? false : true,
      customerDetails: state.viewEditCustomer === true ? emptyCustomer : state.customerDetails
    };
  }

  if (action.type === 'show-details') {
    const result = action.payload.result;

    return {
      ...state,
      viewDetailsCustomer: result,
      customerDetails: result === true ? emptyCustomer : state.customerDetails
    };
  }

  if (action.type === 'set-user') {
    const userAuthenticated = action.payload.user;

    return {
      ...state,
      userAuthenticated
    };
  }

  if (action.type === 'filter-payments') {    
    return {
      ...state,
      paymentFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-charges') {    
    return {
      ...state,
      chargeFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-stocks') {    
    return {
      ...state,
      stocksFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-services') {    
    return {
      ...state,
      servicesFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-reminders') {    
    return {
      ...state,
      remindersFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-transactions') {    
    return {
      ...state,
      transactionsFilter: action.payload.filter
    };
  }

  if (action.type === 'filter-users') {    
    return {
      ...state,
      usersFilter: action.payload.filter
    };
  }

  if (action.type === 'clear-states') {
    return {
      ...state,
      customers: [],
      suppliers: [],
      products: [],
      stocks: [],
      charges: [],
      payments: [],
      services: [],
      reminders: [],
      transactions: [],
      users: [],

      searchCustomer: [],
      searchSupplier: [],
      searchProduct: [],
      searchStock: [],
      searchCharge: [],
      searchPayment: [],
      searchService: [],
      searchReminder: [],
      searchTransaction: [],
      searchUser: [],

      customerDetails: emptyCustomer,
      supplierDetails: emptySupplier,
      productDetails: emptyProduct,
      stockDetails: emptyStocktaking,
      chargeDetails: emptyCharge,
      serviceDetails: emptyService,
      reminderDetails: emptyReminder,
      transactionDetails: emptyTransaction,
      userDetails: emptyUser,

      paymentFilter: 'todos',
      chargeFilter: 'todos',
      stocksFilter: 'todos',
      servicesFilter: 'todos',
      remindersFilter: 'todos',
      transactionsFilter: 'todos',
      usersFilter: 'todos',

      show: false,
      filteredCustomers: false,
      viewAddCustomer: false,
      viewDeleteCustomer: false,
      viewEditCustomer: false,
      viewDetailsCustomer: false
    };
  }

};