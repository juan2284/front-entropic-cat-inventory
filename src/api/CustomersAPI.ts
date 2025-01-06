import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { customerSchema, customersSchema, paymentsSchema, servicesSchema } from "@/types/schemas";
import { Customer } from "@/types/types";

export async function getCustomers() {
  try {
    const { data } = await api('/customer');
    const response = customersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function addNewCustomer(formData: Customer) {
  try {
    const { data } = await api.post('/customer/add-customer', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editCustomer(formData: {id: Customer['_id'], customer: Customer}) {
  try {
    const { data } = await api.put(`/customer/edit-customer/${formData.id}`, formData.customer);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteCustomer(id: Customer['_id']) {
  try {
    const { data } = await api.delete(`/customer/delete-customer/${id}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getCustomerById(id: Customer['_id']) {
  try {
    const { data } = await api(`/customer/${id}`);
    const response = customerSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getPaymentsByCustomer(id: Customer['_id']) {
  try {
    const { data } = await api(`/payment/get-payments/${id}`);
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

export async function getServicesByCustomer(id: Customer['_id']) {
  try {
    const { data } = await api(`/service/get-services/${id}`);
    const response = servicesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}