import HeaderFile from "./headerFile";
import HeaderLote from "./HeaderLote";
import RegisterDetail from "./registerDetail";
import { datePy } from "./datePython";
import type { RegistersDates } from "../../api/registersRecaudos";
import { createRegister, getAllRegister } from "../../api/registersRecaudos";

interface DateParams {
    convenio: string;
    valuePay: string;
    factura: string;
    fecha?: string
}

export default async function setDatas({ convenio, valuePay, factura, fecha }: DateParams): Promise<Object> {

  const fechaCur = fecha ? fecha : datePy()

    const registerDatas: RegistersDates = {
      "encabezadoArchivo": HeaderFile(),
      "encabezadoLote": HeaderLote(convenio),
      "registroDetalle": RegisterDetail(factura, valuePay),
      "fecha": fechaCur
  }

    try {
      await createRegister(registerDatas);
      const res = await getAllRegister()
      const filterres = res.data.reverse()
      return {success: true, data: filterres[0]["id"]};
    } catch (error: any) {
      const err = error.response.data.registroDetalle[0]
      if (err == "Ya existe registers recaudos con este registroDetalle.") {
        return {success: false, data: 'Ya existe un registro con ese numero de recibo', exist: true}
      }
      console.log(error.response.data.registroDetalle);
      return {success: false, data: 'No se creo el registro', exist: false};
    }
  }
