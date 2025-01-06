import { Supplier } from "@/types/types";
import ChargesTable from "@/components/suppliers/ChargesTable";
import { useChargesBySupplier } from "@/hooks/suppliersHooks/useChargesBySupplier";

type ChargesDetailsAddProps = {
  supplier: Supplier['_id'];
};

export default function ChargesDetailsAdd({supplier}: ChargesDetailsAddProps) {
  const { chargesToView } = useChargesBySupplier(supplier!, 'pending');
  return (
    <>
      <ChargesTable charges={chargesToView} />
    </>
  );
}