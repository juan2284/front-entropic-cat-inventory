import api from "@/lib/axios";
import { Charge, Payment, Transaction, TransactionEditForm } from "@/types/types";
import { isAxiosError } from "axios";

export async function getAllTransactions() {
  try {
    const { data } = await api(`/transaction`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTransactionsByCharge(chargeId: Charge['_id']) {
  try {
    const { data } = await api(`/transaction/get-by-charge/${chargeId}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTransactionsByPayment(paymentId: Payment['_id']) {
  try {
    const { data } = await api(`/transaction/get-by-payment/${paymentId}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editTransaction(formData: {id: Transaction['_id'], transaction: TransactionEditForm}) {
  try {
    const { data } = await api.patch(`/transaction/edit-transaction/${formData.id}`, formData.transaction);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}