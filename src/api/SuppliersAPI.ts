import { isAxiosError } from "axios";
import { chargesSchema, supplierSchema, suppliersSchema } from "@/types/schemas";
import api from "@/lib/axios";
import { Supplier } from "@/types/types";


export async function getSuppliers() {
  try {
    const { data } = await api('/supplier');
    const response = suppliersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function addNewSupplier(formData: Supplier) {
  try {
    const { data } = await api.post('/supplier/add-supplier', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editSupplier(formData: {id: Supplier['_id'], supplier: Supplier}) {
  try {
    const { data } = await api.put(`/supplier/edit-supplier/${formData.id}`, formData.supplier);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteSupplier(id: Supplier['_id']) {
  try {
    const { data } = await api.delete(`/supplier/delete-supplier/${id}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getSupplierById(id: Supplier['_id']) {
  try {
    const { data } = await api(`/supplier/${id}`);
    const response = supplierSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getChargesBySupplier(id: Supplier['_id']) {
  try {
    const { data } = await api(`/charge/get-charges/${id}`);
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