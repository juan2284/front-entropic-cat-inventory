import api from "@/lib/axios";
import { paymentSchema, paymentsSchema } from "@/types/schemas";
import { AddPaymentFormType, Payment } from "@/types/types";
import { isAxiosError } from "axios";

export async function getPayments() {
  try {
    const { data } = await api(`/payment`);
    const response = paymentsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getPaymentById(paymentId: Payment['_id']) {
  try {
    const { data } = await api(`/payment/${paymentId}`);
    const response = paymentSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deletePayment(paymentId: Payment['_id']) {
  try {
    const { data } = await api.delete(`/payment/delete-payment/${paymentId}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function addNewPayment(formData: AddPaymentFormType) {
  try {    
    const { data } = await api.post('/payment/add-payment', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function amortizePayment(formData: {payment: AddPaymentFormType, id: Payment['_id']}) {
  try {
    const { data } = await api.patch(`/payment/amortize-payment/${formData.id}`, formData.payment);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}