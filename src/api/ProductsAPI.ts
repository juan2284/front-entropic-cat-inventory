import api from "@/lib/axios";
import { productSchema, productsSchema, stocktakingsSchema } from "@/types/schemas";
import { isAxiosError } from "axios";
import { Product } from "@/types/types";

export async function getProducts() {
  try {
    const { data } = await api('/product');
    const response = productsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProductById(id: Product['_id']) {
  try {
    const { data } = await api(`/product/${id}`);
    const response = productSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getStockByProduct(id: Product['_id']) {
  try {
    const { data } = await api(`/stock/get-stock/${id}`);
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

export async function addNewProduct(formData: Product) {
  try {
    const { data } = await api.post('/product/add-product', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editProduct(formData: {id: Product['_id'], product: Product}) {
  try {
    const { data } = await api.put(`/product/edit-product/${formData.id}`, formData.product);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProduct(id: Product['_id']) {
  try {
    const { data } = await api.delete(`/product/delete-product/${id}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}