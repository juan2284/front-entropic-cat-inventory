import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CustomerReducer, initialState } from "@/reducers/customerReducer";
import { useUser } from "@/hooks/authHooks/useUser";
import CustomersReports from "@/components/reports/customers/CustomersReports";
import AppLayout from "@/layouts/AppLayout";
import RegisterView from "@/views/auth/RegisterView";
import AddChargeView from "@/views/charges/AddChargeView";
import ChargeDetailsView from "@/views/charges/ChargeDetailsView";
import ChargesView from "@/views/charges/ChargesView";
import CustomersDetailsView from "@/views/customers/CustomersDetailsView";
import CustomersView from "@/views/customers/CustomersView";
import AddPaymentView from "@/views/payments/AddPaymentView";
import PaymentDetailsView from "@/views/payments/PaymentDetailsView";
import PaymentsView from "@/views/payments/PaymentsView";
import ProductDetailsView from "@/views/products/ProductDetailsView";
import ProductsView from "@/views/products/ProductsView";
import ProfileView from "@/views/profile/ProfileView";
import ReminderDetailsView from "@/views/reminders/ReminderDetailsView";
import RemindersPendingView from "@/views/reminders/RemindersPendingView";
import RemindersView from "@/views/reminders/RemindersView";
import ReportsView from "@/views/reports/ReportsView";
import AddServiceView from "@/views/services/AddServiceView";
import ServicesView from "@/views/services/ServicesView";
import StockDetailsView from "@/views/stocktaking/StockDetailsView";
import StockView from "@/views/stocktaking/StockView";
import SupplierDetailsView from "@/views/suppliers/SupplierDetailsView";
import SuppliersView from "@/views/suppliers/SuppliersView";
import TransactionsView from "@/views/transactions/TransactionsView";
import Welcome from "@/views/Welcome";
import NotFoundView from "@/components/globals/NotFoundView";
import AuthLayout from "@/layouts/AuthLayout";
import ConfirmAccountView from "@/views/auth/ConfirmAccountView";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView";
import LoginView from "@/views/auth/LoginView";
import NewPasswordView from "@/views/auth/NewPasswordView";
import RequestNewCodeView from "@/views/auth/RequestNewCodeView";
import Loader from "@/components/globals/Loader";
import PaymentsReports from "@/components/reports/payments/PaymentsReports";
import ServicesReports from "@/components/reports/services/ServicesReports";
import RemindersReports from "@/components/reports/reminders/RemindersReports";
import ProductsReports from "@/components/reports/products/ProductsReports";
import StocksReports from "@/components/reports/stocktaking/StocksReports";
import SalesProductReports from "@/components/reports/stocktaking/SalesProductReports";
import SuppliersReports from "@/components/reports/suppliers/SuppliersReports";
import ChargesReports from "@/components/reports/charges/ChargesReports";
import TransactionsReports from "@/components/reports/transactions/TransactionsReports";
import InvoiceView from "@/views/payments/InvoiceView";
import CustomerAccountView from "@/views/customers/CustomerAccountView";
import SupplierAccountView from "@/views/suppliers/SupplierAccountView";
import PurchaseNoteView from "@/views/charges/PurchaseNoteView";

export default function Router() {
  const [state, dispatch] = useReducer(CustomerReducer, initialState);
  const { data, isLoading } = useUser();
  const authenticated = localStorage.getItem('AUTH_TOKEN');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authenticated ? true : false);
    setIsAdmin(data?.role === 'admin' ? true : false);
  }, [data, authenticated]);

  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route element={<AuthLayout />}>
            <Route path='/auth/login' element={<LoginView />} />
            <Route path='/auth/confirmar-usuario' element={<ConfirmAccountView />} />
            <Route path='/auth/solicitar-codigo' element={<RequestNewCodeView />} />
            <Route path='/auth/recuperar-password' element={<ForgotPasswordView />} />
            <Route path='/auth/nuevo-password' element={<NewPasswordView />} />
          </Route>
        ) : (
          <Route path='*' element={<Navigate to='/' replace />} />
        )}

        {isAuthenticated ? (
          <Route element={<AppLayout dispatch={dispatch} />}>
            <Route path='/' element={<Welcome />} index />

            <Route path='/clientes' element={<CustomersView state={state!} dispatch={dispatch} />} />
            <Route path='/clientes/:customerId' element={<CustomersDetailsView state={state!} dispatch={dispatch} />} />
            <Route path='/cliente-pdf/:customerId' element={<CustomerAccountView />} />
            
            <Route path='/cobros' element={<PaymentsView state={state!} dispatch={dispatch} />} />
            <Route path='/factura-pdf/:paymentId' element={<InvoiceView />} />
            <Route path='/agregar-cobro' element={<AddPaymentView dispatch={dispatch} />} />
            <Route path='/cobros/:paymentId' element={<PaymentDetailsView state={state!} dispatch={dispatch} />} />

            <Route path='/servicios' element={<ServicesView state={state!} dispatch={dispatch} />} />
            <Route path='/agregar-servicio' element={<AddServiceView dispatch={dispatch} />} />

            <Route path='/recordatorios' element={<RemindersView state={state!} dispatch={dispatch} />} />
            <Route path='/recordatorios/:reminderId' element={<ReminderDetailsView state={state!} dispatch={dispatch} />} />
            <Route path='/recordatorios-pendientes' element={<RemindersPendingView state={state!} dispatch={dispatch} />} />

            <Route path='/perfil' element={<ProfileView />} />  

            {isAdmin ? (
              <>
                <Route path='/productos' element={<ProductsView state={state!} dispatch={dispatch} />} />
                <Route path='/productos/:productId' element={<ProductDetailsView state={state!} dispatch={dispatch} />} />
    
                <Route path='/inventario' element={<StockView state={state!} dispatch={dispatch} />} />
                <Route path='/inventario/:stockId' element={<StockDetailsView state={state!} dispatch={dispatch} />} />
    
                <Route path='/proveedores' element={<SuppliersView state={state!} dispatch={dispatch} />} />
                <Route path='/proveedores/:supplierId' element={<SupplierDetailsView state={state!} dispatch={dispatch} />} />
                <Route path='/proveedor-pdf/:supplierId' element={<SupplierAccountView />} />
    
                <Route path='/pagos' element={<ChargesView state={state!} dispatch={dispatch} />} />
                <Route path='/agregar-pago' element={<AddChargeView dispatch={dispatch} />} />
                <Route path='/pagos/:chargeId' element={<ChargeDetailsView state={state!} dispatch={dispatch} />} />
                <Route path='/compra-pdf/:chargeId' element={<PurchaseNoteView />} />
    
                <Route path='/transacciones' element={<TransactionsView state={state!} dispatch={dispatch} />} />
    
                <Route path='/reportes' element={<ReportsView />} />
                <Route path='/reportes-customers' element={<CustomersReports />} />
                <Route path='/reportes-payments' element={<PaymentsReports />} />
                <Route path='/reportes-services' element={<ServicesReports />} />
                <Route path='/reportes-reminders' element={<RemindersReports />} />
                <Route path='/reportes-products' element={<ProductsReports />} />
                <Route path='/reportes-stocks' element={<StocksReports />} />
                <Route path='/reportes-sales' element={<SalesProductReports />} />
                <Route path='/reportes-suppliers' element={<SuppliersReports />} />
                <Route path='/reportes-charges' element={<ChargesReports />} />
                <Route path='/reportes-transactions' element={<TransactionsReports />} />
    
                <Route path='/usuarios' element={<RegisterView state={state!} dispatch={dispatch} />} />            
              </>
            ) : (
              <Route path='*' element={<Navigate to='/' replace />} />
            )}
          </Route>
        ) : (
          <Route path='*' element={<Navigate to='/auth/login' replace />} />
        )}

        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}