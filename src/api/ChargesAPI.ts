import api from "@/lib/axios";
import { chargeSchema, chargesSchema, stocktakingsSchema } from "@/types/schemas";
import { AddChargeFormType, Charge } from "@/types/types";
import { isAxiosError } from "axios";

export async function getCharges() {
  try {
    const { data } = await api(`/charge`);
    const response = chargesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getChargeById(chargeId: Charge['_id']) {
  try {
    const { data } = await api(`/charge/${chargeId}`);
    const response = chargeSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getStockByCharge(chargeId: Charge['_id']) {
  try {
    const { data } = await api(`/stock/get-by-charge/${chargeId}`);
    const response = stocktakingsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function addNewCharge(formData: AddChargeFormType) {
  try {
    const { data } = await api.post('/charge/add-charge', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editCharge(formData: {charge: AddChargeFormType, id: Charge['_id']}) {
  try {
    const { data } = await api.patch(`/charge/edit-charge/${formData.id}`, formData.charge);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function amortizeCharge(formData: {charge: AddChargeFormType, id: Charge['_id']}) {
  try {
    const { data } = await api.patch(`/charge/amortize-charge/${formData.id}`, formData.charge);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteCharge(chargeId: Charge['_id']) {
  try {
    const { data } = await api.delete(`/charge/delete-charge/${chargeId}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}