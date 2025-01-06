import api from "@/lib/axios";
import { stocktakingSchema, stocktakingsSchema } from "@/types/schemas";
import { ActivateStockType, StockFormType, Stocktaking } from "@/types/types";
import { isAxiosError } from "axios";

export async function getStocks() {
  try {
    const { data } = await api(`/stock`);
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

export async function getStockById(id: Stocktaking['_id']) {
  try {
    const { data } = await api(`/stock/${id}`);
    const response = stocktakingSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function editStock(formData: {id: Stocktaking['_id'], stock: StockFormType}) {
  try {
    const { data } = await api.patch(`/stock/edit-stock/${formData.id}`, formData.stock);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function activateStock(formData: {id: Stocktaking['_id'], stock: ActivateStockType}) {
  try {
    const { data } = await api.patch(`/stock/edit-stock/${formData.id}`, formData.stock);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}