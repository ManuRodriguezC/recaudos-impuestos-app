import HeaderFile from "./headerFile";
import HeaderLote from "./HeaderLote";
import RegisterDetail from "./registerDetail";
import { datePy } from "./datePython";
import type { RegistersDates } from "../../api/registersRecaudos";
import { createRegister, getAllRegister } from "../../api/registersRecaudos";

interface DateParams {
    convenioNum: string;
    valueRecaudo: string;
    facturaNum: string;
    fecha?: string
}

export default async function setDatas({ convenioNum, valueRecaudo, facturaNum, fecha }: DateParams): Promise<Object> {

  const fechaCur = fecha ? fecha : datePy()

    const registerDatas: RegistersDates = {
      "encabezadoArchivo": HeaderFile(),
      "encabezadoLote": HeaderLote(convenioNum),
      "registroDetalle": RegisterDetail(facturaNum, valueRecaudo),
      "fecha": fechaCur
  }

    try {
      await createRegister(registerDatas);
      const res = await getAllRegister()
      const filterres = res.data.reverse()
      return {success: true, data: filterres[0]["id"]};
    } catch (error: any) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        const err = error.response.data?.registroDetalle?.[0];
        if (err === "Ya existe registers recaudos con este registroDetalle.") {
          return { success: false, data: 'Ya existe un registro con ese numero de recibo', exist: true };
        }
        console.log(error.response.data);
        return { success: false, data: 'No se creó el registro', exist: false };
      } else if (error.request) {
        // La petición se hizo pero no se recibió respuesta (ej: servicio caído)
        console.error("Error: No se recibió respuesta del servidor");
        return { success: false, data: 'El servidor no respondió. Intente más tarde.', exist: false };
      } else {
        // Error al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
        return { success: false, data: 'Error al configurar la solicitud', exist: false };
      }
    }
  }
