import { useState } from "react"
import setDatas from "./setDatas"
import { notifyReferences, setValuePay } from "../../utils/JsonMessages"
import { fetchNotifyReferenceApi } from "../../api/peticionesTunja"
import { useTokenStore } from "../../utils/state"

type DialogProps = {
  valueRecaudo: string
  convenioNum: string
  facturaNum: string
  date: string
  open: boolean
  controlDialog: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogDatasPay({valueRecaudo, convenioNum, facturaNum, date, open, controlDialog, setOpen}: DialogProps) {

  const [loading, setLoading] = useState(false)
  const [numRecaudo, setNumRecaudo] = useState("")
  const [successRegis, setSuccessRegis] = useState(false)
  const [faildRegisForExist, setFaildRegisForExist] = useState(false)
  const [faildRegis, setFaildRegis] = useState(false)
  const [errorRegister, setErrorRegister] = useState("")
  const [successNotify, setSuccessNotify] = useState("")
  const [controlSend, setControlSend] = useState(false)
  const { tokenAuth } = useTokenStore()
  const [values, setValues] = useState({
      efectivo: "",
      cheque: "",
      medio: "",
      numCheque: "",
    });

  async function sendRegister() {
    const { efectivo, cheque, medio, numCheque } = values;
    const setEfectivo = efectivo === "" ? 0 : parseInt(efectivo.replace(/\./g, ""));
    const setCheque = cheque === "" ? 0 : parseInt(cheque.replace(/\./g, ""));
    const setMedio = medio === "" ? 0 : parseInt(medio.replace(/\./g, ""));

    if ((setEfectivo + setCheque + setMedio) !== parseInt(valueRecaudo)) {
      setErrorRegister("La suma de los valores ingresados no coincide con el valor del recaudo.");
      setValues({
        efectivo: "",
        cheque: "",
        medio: "",
        numCheque: "",
      });
      return;
    } else if (setCheque != 0 && numCheque.trim() === "" || setCheque == 0 && numCheque.trim() !== "") {
      setErrorRegister("En caso de ingresar valor de cheque o numero de cheque, ambos campos deben estar diligenciados.");
      return;
    } else {
      setErrorRegister("");
    }
    setLoading(true)
    const messageNotify = notifyReferences(date, convenioNum, valueRecaudo, facturaNum, numCheque, values.efectivo, values.cheque, values.medio)
    await registerCoovitel();
    await nofityRegisterMunTunja(messageNotify);
    setLoading(false)
  }

  async function registerCoovitel() {
    const result = await setDatas({ convenioNum, valueRecaudo, facturaNum }) as any;
    if (result.success) {
      setLoading(false)
      setNumRecaudo(result.data);
      setSuccessRegis(true);
    } else {
      if (result.exist) {
        setFaildRegisForExist(true);
      } else {
        setFaildRegis(true);
      }
    }
  }

  async function nofityRegisterMunTunja(datas: any) {
    const data = {
      "info": datas,
      "token": tokenAuth,
    }
    const res = await fetchNotifyReferenceApi(data)
    if (res) {
      const resMessage = res.response.notifyReference.rs
      if (resMessage.statusCode === "0000") {
        setSuccessNotify("Notificación exitosa en el sistema de Tunja");
      } else {
        setErrorRegister(resMessage.statusDesc);
      }
      setControlSend(true);
    }

  }

  const formatPesos = (value: string): string => {
    // Quitar cualquier carácter que no sea número
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";

    // Agregar puntos cada 3 dígitos
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const val = name != "numCheque" ? formatPesos(value) : value;
    setValues({
      ...values,
      [name]: val,
    });
  };

  return (
    <div>
      {
        controlDialog &&
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Registrar datos de pago
        </button>
      }
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              if (controlSend) {
                window.location.reload();
              } else {
                setOpen(false);
              }
            }}
          />

          {/* Caja del diálogo */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-auto z-10">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Datos de Registro del pago</h2>
            {
              !controlSend ?
              <div>
                <div className="flex flex-row gap-10 border-2 border-blue-200 text-xl px-6 rounded-lg p-2 m-2">
                  <p>Referencia de pago: <span className="font-bold">{facturaNum}</span></p>
                  <p>Valor a pagar: <span className="font-bold">$ {setValuePay(valueRecaudo)}</span></p>
                  <p>Numero de convenio: <span className="font-bold">{convenioNum}</span></p>
                </div>
                <div className="italic text-sm">
                  <p>Recuerde que el usuario puede realizar el pago en diferentes metodos de pago.</p>
                  <p>En caso de realizar el pago con mas de un medio de pago, ingrese el valor en cada uno.</p>
                </div>
                <div className="flex flex-col gap-4 p-4 w-auto">
                  <div className="flex flex-row items-center gap-3">
                    <label htmlFor="efectivo" className="mb-1 font-medium">
                      Efectivo:
                    </label>
                    <input
                      id="efectivo"
                      name="efectivo"
                      type="text"
                      value={values.efectivo}
                      onChange={handleChange}
                      className="border rounded p-2"
                      placeholder="$"
                    />
                  </div>

                  <div className="flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-3 items-center">
                      <label htmlFor="cheque" className="mb-1 font-medium">
                        Cheque:
                      </label>
                      <input
                        id="cheque"
                        name="cheque"
                        type="text"
                        value={values.cheque}
                        onChange={handleChange}
                        className="border rounded p-2"
                        placeholder="$"
                      />
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <label htmlFor="numCheque" className="mb-1 font-medium">
                        Numero de Cheque:
                      </label>
                      <input
                        id="numCheque"
                        name="numCheque"
                        type="text"
                        value={values.numCheque}
                        onChange={handleChange}
                        className="border rounded p-2"
                        placeholder="#"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <label htmlFor="medio" className="mb-1 font-medium">
                      Otro medio de pago
                    </label>
                    <input
                      id="medio"
                      name="medio"
                      type="text"
                      value={values.medio}
                      onChange={handleChange}
                      className="border rounded p-2"
                      placeholder="$"
                    />
                  </div>
                </div>
              </div>
              :
              <div className="flex-col justify-center items-center">
                <p className="mb-2"><strong>Referencia de pago:</strong> {facturaNum}</p>
                <p className="mb-2"><strong>Valor a pagar:</strong> $ {setValuePay(valueRecaudo)}</p>
                <p className="mb-2"><strong>Numero de convenio:</strong> {convenioNum}</p>
                <div className="flex flex-col gap-2 border-2 border-blue-200 text-xl px-6 rounded-lg p-2 m-10">
                  <p><strong>Efectivo:</strong> $ {values.efectivo === "" ? "0.00" : values.efectivo}</p>
                  <p><strong>Cheque:</strong> $ {values.cheque === "" ? "0.00" : values.cheque}</p>
                  <p><strong>Numero de Cheque:</strong> {values.numCheque === "" ? "N/A" : values.numCheque}</p>
                  <p><strong>Otro medio de pago:</strong> $ {values.medio === "" ? "0.00" : values.medio}</p>
                </div>
                {successNotify != "" && <p className="w-fit text-xl border-b-2 border-blue-600 text-blue-600 font-semibold">{successNotify}</p>}
                {faildRegis && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Registro de Recaudo Fallido en la base de datos Coovitel</span>}
                {successRegis && <span className="text-2xl border-b-2 border-[#007eb8] text-[#007eb8] font-semibold">Registro de Recaudo Exitoso - # {numRecaudo.toString().padStart(5, "0")}</span>}
              </div>
            }
            {
              !controlSend &&
              <p className="text-gray-800 mb-4 italic font-semibold">
                Los suma de valores ingresados, deben corresponder al valor del recaudo.
              </p>
            }
            <div className="flex flex-col items-center justify-center mb-4">
              {loading&&<p className="text-2xl font-semibold">Enviando...</p>}
              {successRegis && <span className="text-2xl border-b-2 border-[#007eb8] text-[#007eb8] font-semibold">Registro de Recaudo Exitoso - # {numRecaudo.toString().padStart(5, "0")}</span>}
              {faildRegisForExist && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Ya existe un registro con el numero de recibo en la base de datos Coovitel</span>}
              {faildRegis && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Registro de Recaudo Fallido en la base de datos Coovitel</span>}
              {errorRegister != "" && <span className="text-xl border-b-2 border-red-600 text-red-600 font-semibold">{errorRegister}</span>}
              {successNotify != "" && <span className="text-xl border-b-2 border-blue-600 text-blue-600 font-semibold">{errorRegister}</span>}
            </div>

            
            {
              !controlSend ?
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-red-600 bg-red-300 hover:bg-red-800 transition text-white duration-300 hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  className={`cursor-pointer px-4 py-2 rounded-md bg-[#007eb8] text-white border-2 hover:bg-[#2d2e83] transition duration-300 hover:scale-105`}
                  onClick={() => sendRegister()}
                  >
                  {loading ? "Cargando..." : "Registrar Recaudo"}
                </button>
            </div>
            :
            <div className="flex justify-end gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-lg border border-red-600 bg-red-800 text-white duration-300 hover:scale-105"
                >
                  Finalizar
                </button>
            </div>
            }
          </div>
        </div>
      )}
    </div>
  )
}
