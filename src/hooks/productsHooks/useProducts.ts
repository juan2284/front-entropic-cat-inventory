import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/ProductsAPI";
import { useStocktaking } from "@/hooks/stocktakingHooks/useStocktaking";
import { GlobalStockByCategoriesType, Product, ProductReport, Products, ProductsDetailsType, StatusStockType, Stocktaking } from "@/types/types";
import { useLocation } from "react-router-dom";

export const useProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data: stocks } = useStocktaking();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const stockByCategories: {category: Product['category'], q: number, globalStock: number, products: number}[] = [];
  stocks?.map((stock: Stocktaking) => {
    const categoryExist = stockByCategories.filter(category => category.category === stock.product.category);
    if (categoryExist.length === 0) {
      const object = {
        category: stock.product.category,
        q: 1,
        globalStock: stock.quantity,
        products: stock.remaining
      };
      stockByCategories.push(object);
    } else {
      categoryExist[0].q += 1;
      categoryExist[0].globalStock += stock.quantity;
      categoryExist[0].products += stock.remaining;
    }
  });

  const statusStock: StatusStockType = {
    inStock: 0,
    lowStock: 0,
    outStock: 0
  };

  const productsDetails: ProductsDetailsType[] = [];

  data?.map(product => {
    const productDetails: ProductsDetailsType = {
      id: product._id,
      code: product.code,
      product: product.name,
      category: product.category,
      globalStock: 0,
      sales: 0,
      partialStock: 0,
      globalQuantity: 0,
      stockStatus: 'out',
      priceOne: 0,
      priceTwo: 0,
      currencyTotal: 0, 
      amountTotal: 0
    };

    const stockExist = stocks?.filter((stock: Stocktaking) => stock.product._id === product._id);
    if (stockExist?.length !== 0) {
      stocks?.map((stock: Stocktaking) => {        
        if (stock.product._id === product._id) {
          const status = (stock.remaining/stock.quantity)*100;
          productDetails.globalStock = stock.stock_out === true ? productDetails.globalStock + stock.remaining : productDetails.globalStock;
          productDetails.partialStock += 1;
          stock.transactions.map(transaction => {
            productDetails.sales += transaction.quantity;
          });
          productDetails.globalQuantity += stock.quantity;
          productDetails.stockStatus = status >= 50 ? 'in' : status < 50 && status >= 1 ? 'low' : 'out';
          productDetails.priceOne = stock.price_one;
          productDetails.priceTwo = stock.price_two;
          productDetails.currencyTotal = stock.price_two * stock.remaining;
          productDetails.amountTotal = stock.price_one * stock.remaining;
        } 
      });      
    }
    productsDetails.push(productDetails);
  });

  statusStock.inStock = productsDetails.filter(details => details.stockStatus === 'in').length;
  statusStock.lowStock = productsDetails.filter(details => details.stockStatus === 'low').length;
  statusStock.outStock = productsDetails.filter(details => details.stockStatus === 'out').length;

  const productsByCategories: {category: Product['category'], q: number}[] = [];
  data?.map(product => {
    const categoryExist = productsByCategories.filter(category => category.category === product.category);
    if (categoryExist.length === 0) {
      const object = {
        category: product.category,
        q: 1,
      };
      productsByCategories.push(object);
    } else {
      categoryExist[0].q += 1;
    }
  });

  const globalStocksByCategories: GlobalStockByCategoriesType[] = [];
  productsByCategories.map(category => {
    const stockExist = stockByCategories.filter(stock => category.category === stock.category);
      if (stockExist.length !== 0) {
        const object = {
          category: category.category,
          productQ: category.q,
          stocksQ: stockExist[0].q,
          initialStock: stockExist[0].globalStock,
          stock: stockExist[0].products
        };
  
        globalStocksByCategories.push(object);        
      } else {
        const object = {
          category: category.category,
          productQ: category.q,
          initialStock: 0,
          stocksQ: 0,
          stock: 0
        };
  
        globalStocksByCategories.push(object);  
      }
  });

  let initialAllProducts = 0;
  stockByCategories.map(stock => initialAllProducts += stock.globalStock);
  let stockAllProducts = 0;
  stockByCategories.map(stock => stockAllProducts += stock.products);

  let productsCodes: {id: string, product: string}[] = [];
  data?.map(product => {
    const productExist = productsCodes.filter(uniqueProduct => uniqueProduct.product === product.code);
    if (productExist.length === 0) {
      const object = {
        id: product._id,
        product: product.code
      };
      productsCodes.push(object);
    }
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const products: Products = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    code: 'codigo',
    name: 'nombre',
    brand: 'marca',
    type: 'tipo',
    description: 'descripcion',
    category: 'categoria',
    stock: 'existencia',
    sales: 'ventas',
    stocksNumber: 'cant_inventarios'
  };

  const productsData: ProductReport = [];
  data?.map(product => {
    const detail = productsDetails.filter(productDetail => productDetail.code === product.code)[0];
    const reportProduct = {
      code: product.code,
      name: product.name,
      brand: product.brand,
      type: product.type,
      description: product.description,
      category: product.category,
      stock: String(detail.globalStock),
      sales: String(detail.sales),
      stocksNumber: String(detail.partialStock)
    };
    productsData.push(reportProduct);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    productsData
  };

  return { 
    data,
    isError,
    isLoading,
    globalStocksByCategories,
    initialAllProducts,
    stockAllProducts,
    productsDetails,
    statusStock,
    productsCodes,
    paginationData,
    products
  };
};