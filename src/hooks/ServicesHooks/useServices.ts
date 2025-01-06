import { getServices } from "@/api/ServicesAPI";
import { Services } from "@/types/types";
import { contactResults, months } from "@/utils/dictionaries";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useServices = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const allServicesNumber = data?.length;
  const newDate = Date.now();
  const transformDate = new Date(newDate);
  const currentMonthNumber = transformDate.getMonth();
  const currentMonthName = months[currentMonthNumber];
  const currentYear = transformDate.getFullYear();

  const servicesCurrentMonth: Services = [];
  data?.map(service => {
    const serviceDateMs = new Date(service.service_date);
    if (serviceDateMs.getMonth() === currentMonthNumber && serviceDateMs.getFullYear() === currentYear) {
      servicesCurrentMonth.push(service);
    }
  });
  const currentmonthServicesNumber = servicesCurrentMonth.length;

  const contactResultsKeys = Object.keys(contactResults);
  const contactResultsCount: {contactResult: string, quantity: number | undefined}[] = [];
  contactResultsKeys.map(contact => {
    const contactsXResult = data?.filter(service => service.contact.result === contact.toLowerCase());
    const contactCount = {
      contactResult: contact.toLowerCase(),
      quantity: contactsXResult?.length
    };
    contactResultsCount.push(contactCount);
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const services: Services = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    customer: 'cliente',
    vehicle: 'vehiculo',
    type_oil: 'tipo_aceite',
    brand_oil: 'marca_aceite',
    filter: 'filtro',
    mileage: 'kilometraje',
    service_date: 'fecha_servicio',
    contact: 'estatus_contacto'
  };

  const servicesData: {}[] = [];
  data?.map(service => {
    const reportService = {
      customer: `${service.customer.name} ${service.customer.last_name}`,
      vehicle: service.vehicle,
      type_oil: service.type_oil,
      brand_oil: service.brand_oil,
      filter: service.filter,
      mileage: service.mileage,
      service_date: service.service_date,
      contact: service.contact.result
    };
    servicesData.push(reportService);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    servicesData
  };

  return { data, isError, isLoading, allServicesNumber, servicesCurrentMonth, currentMonthName, currentmonthServicesNumber, contactResultsCount, paginationData, services };
};