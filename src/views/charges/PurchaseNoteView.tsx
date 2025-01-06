import Loader from "@/components/globals/Loader";
import { useChargeById } from "@/hooks/chargesHooks/useChargeById";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
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

export default function PurchaseNoteView() {
  const params = useParams();
  const { data, isLoading, isError } = useChargeById(params.chargeId!);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
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
                <Text style={{ fontSize: '0.8rem', textAlign: 'center', fontFamily: 'Oswald' }}>Nota de Compra</Text>
                <Text style={{ fontSize: '0.5rem', textAlign: 'center', fontFamily: 'Roboto' }}>{formatDate(data.settlement_date)}</Text>
              </View>

              {/* Customer Data */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontFamily: 'Roboto' }}>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Nota:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', color: '#dc2626', fontFamily: 'Oswald' }}>
                    #{data._id.slice(-5)}
                  </Text>
                </View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Nombres:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.supplier.name} {data.supplier.last_name}
                  </Text>
                </View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Cédula:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.supplier.identity_number}
                  </Text>
                </View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '2px' }}>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    Teléfono:
                  </Text>
                  <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                    {data.supplier.telephone}
                  </Text>
                </View>
              </View>

              {/* Headers Table */}
              <View style={{ width: '100%', padding: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Roboto', borderTop: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db', backgroundColor: '#e5e7eb' }}>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  PRODUCTO
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  CANTIDAD
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  TOTAL Bs.
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  FECHA
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ESTADO
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  ABONADO
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  DEUDA
                </Text>
              </View>

              {/* Table */}
              <View style={{ width: '100%', padding: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Roboto', borderBottom: '1px solid #d1d5db' }}>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {data.product.id.name}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {data.product.quantity}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {formatCurrencyLocal(data.total_amount)}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {formatDate(data.settlement_date)}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {paidStatusTranslations[data.status]}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {formatCurrencyLocal(data.total_amount - data.pending_amount)}
                </Text>
                <Text style={{ width: '100%', fontSize: '0.4rem', textAlign: 'center' }}>
                  {formatCurrencyLocal(data.pending_amount)}
                </Text>
              </View>

              {/* Subtotals - Totals */}
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: '80%' }}></View>
                <View style={{ width: '20%', padding: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'Roboto', marginTop: '10px', borderBottom: '1px solid #d1d5db' }}>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2px' }}>
                    <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                      PENDIENTE Bs.:
                    </Text>
                    <Text style={{ fontSize: '0.5rem', fontFamily: 'Oswald' }}>
                      {formatCurrencyLocal(data.pending_amount)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '80%' }}></View>
                <Text style={{ fontSize: '0.6rem', fontFamily: 'Oswald', textTransform: 'uppercase', color: `${data.status === 'paid' ? '#16a34a' : '#dc2626'}` }}>
                  {paidStatusTranslations[data.status]}
                </Text>
              </View>

            </View>
          </Page>
        </Document>
      </PDFViewer>
    </main>
  );
}