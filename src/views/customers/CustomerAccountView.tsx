import Loader from "@/components/globals/Loader";
import { useCustomerById } from "@/hooks/customersHooks/useCustomerById";
import { usePaymentsByCustomer } from "@/hooks/customersHooks/usePaymentsByCustomer";
import { Payments } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  section: {
    margin: 20,
    padding: 2,
    flexGrow: 1
  }
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/Roboto.ttf',
    },
    
  ],
});
Font.register({
  family: 'Oswald',
  fonts: [
    {
      src: '/Oswald.ttf',
    },
    
  ],
});

export default function CustomerAccountView() {
  const params = useParams();
  const { data, isLoading, isError } = useCustomerById(params.customerId!);
  const { data: paymentsData, isError: paymentError, isLoading: paymentLoading, totalAmountPending } = usePaymentsByCustomer(params.customerId!);
  const payments: Payments | undefined = paymentsData?.filter(payment => payment.status === 'pending');
  const date = new Date();

  if (isError || paymentError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading || paymentLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <main className="w-full">
      <PDFViewer className="w-full h-screen p-4">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              {/* Header */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', gap: '10px', fontFamily: 'Roboto' }}>
                <View style={{ width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={'/icon.png'} style={{ width: '100%' }} />
                </View>
                <View style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ width: '100%', fontSize: '0.4rem' }}>
                    Dirección: 221B Baker Street, London. UK
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem' }}>
                    ID: J-123456789-7
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem' }}>
                    Teléfonos: 222-2222222 / 444-4444444
                  </Text>
                </View>
              </View>

              {/* Sub-Header */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '10px', fontFamily: 'Roboto' }}>
                <Text style={{ fontSize: '0.8rem', textAlign: 'center', fontFamily: 'Oswald' }}>Corte de Cobros Pendientes</Text>
                <Text style={{ fontSize: '0.5rem', textAlign: 'center', fontFamily: 'Roboto' }}>{formatDate(date.toISOString())}</Text>
              </View>

              {/* Customer Data */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontFamily: 'Roboto' }}>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Nombres:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.name} {data.last_name} 
                  </Text>
                </View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Cédula:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.identity_number}
                  </Text>
                </View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Teléfono:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.telephone}
                  </Text>
                </View>
              </View>

              {/* Headers Table */}
              <View style={{ width: '100%', padding: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Roboto', borderTop: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db', backgroundColor: '#e5e7eb' }}>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  FACTURA
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  MONTO TOTAL
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ABONO Bs.
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ABONO $.
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ABONO TDD/TDC
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  FECHA
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ESTADO
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  DEUDA
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  PRODUCTOS
                </Text>
              </View>

              {/* Table */}
              {payments?.map(payment => (
                <View style={{ width: '100%', padding: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Roboto', borderBottom: '1px solid #d1d5db' }} key={payment._id}>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    #{payment._id.slice(-5)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatCurrencyLocal(payment.total_amount)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatCurrencyLocal(payment.amount_one)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatCurrency(payment.amount_two)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatCurrencyLocal(payment.amount_three)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatDate(payment.settlement_date)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {paidStatusTranslations[payment.status]}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {formatCurrencyLocal(payment.pending_amount)}
                  </Text>
                  <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                    {payment.products.length}
                  </Text>
                </View>
              ))}


              {/* Subtotals - Totals */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: '80%' }}></View>
                <View style={{ width: '20%', padding: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'Roboto', marginTop: '10px', borderBottom: '1px solid #d1d5db' }}>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2px' }}>
                    <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                      TOTAL DEUDA Bs.:
                    </Text>
                    <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                      {formatCurrencyLocal(totalAmountPending)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </main>
  );
}