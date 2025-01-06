import api from "@/lib/axios";
import { servicesSchema } from "@/types/schemas";
import { Service, ServiceFormType } from "@/types/types";
import { isAxiosError } from "axios";

export async function getServices() {
  try {
    const { data } = await api('/service');
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

export async function getServiceByPayment(id: Service['_id']) {
  try {
    const { data } = await api(`/service/get-service-payment/${id}`);
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

export async function addNewService(formData: ServiceFormType) {
  try {
    const { data } = await api.post('/service/add-service', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteService(id: Service['_id']) {
  try {
    const { data } = await api.delete(`/service/delete-service/${id}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editService(formData: {id: Service['_id'], service: ServiceFormType}) {
  try {
    const { data } = await api.patch(`/service/edit-service/${formData.id}`, formData.service);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}