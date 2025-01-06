import { Service } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";

type ContactMessageProps = {
  service: Service;
};

export default function ContactMessage({service}: ContactMessageProps) {
  const horaActual = new Date().getHours();
  return (
    <>
      <div className="w-full font-roboto text-xs border-2 border-green-600 p-2">
        <p>
          {horaActual < 12 ? 'Buenos días' : 'Buenas tardes'} {' '}
          {service.customer.name === '---' ? null : (
            <>
              Sr@ <span className="capitalize">{service.customer.name.toLowerCase()}</span>.
            </>
          )}
          <br />
          <br />
          Hemos registrado que su vehículo {' '}
          {service.vehicle === '---' ? null : (
            <>
              <span className="font-bold">{service.vehicle}</span>
            </>
          )} {' '}
          tuvo un cambio de aceite el día <span className="font-bold">{formatDate(service.service_date)}</span>, {' '}
          {service.brand_oil === '---' ? null : (
            <>
              de la marca <span className="font-bold">{service.brand_oil}</span>
            </>
          )} {' '}
          {service.type_oil === '---' ? null : (
            <>
              de tipo <span className="font-bold">{service.type_oil}</span>
            </>
          )}.
          <br />
          <br />
          Este cambio se hizo hace mas de dos meses, por lo que le invitamos a asistir a nuestro local para hacer el mantenimiento correspondiente.
          <br />
          <br />
          Además por este mes estaremos ofreciendo diferentes servicios, combos y ofertas, y con la compra de nuestros aceites tendrá la mano de obra totalmente gratis.
          <br />
          <br />
          Viaja tranquil@ y segur@ con tu vehículo en óptimas condiciones.
          <br />
          <br />
          Le deseamos un feliz día.
          <br />
          <span className="font-bold">Distribuidora Hernán 2050</span>
        </p>
      </div>
    </>
  );
}