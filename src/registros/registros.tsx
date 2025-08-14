import { useCallback, useEffect, useState } from "react";
import { currentDate } from "./components/date";
import Barcode from "./components/Barcode";
import setDatas from "./components/setDatas";
import { useAuthStore } from "../utils/state";


export default function Home() {

  const [code, setCode] = useState("")
  const [count, setCount] = useState(0)
  const [date, setDate] = useState("")
  const [valuePay, setValuePay] = useState("")
  const [factura, setFactura] = useState("")
  const [convenio, setConvenio] = useState("")
  const [styleCode, setStyleCode] = useState(false)
  const [span, setSpan] = useState(false)
  const [button, setButton] = useState(false)
  const [successRegis, setSuccessRegis] = useState(false)
  const [faildRegis, setFaildRegis] = useState(false)
  const [faildRegisForExist, setFaildRegisForExist] = useState(false)
  const [scanCode, setScanCode] = useState(false)
  const [numRecaudo, setNumRecaudo] = useState("")
  const [loading, setLoading] = useState(false)
  const { ensureToken } = useAuthStore()
  const [loadingToken, setLoadingToken] = useState(false);
  const [errorAuth, setErrorAuth] = useState<boolean>(false);
 
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      window.removeEventListener("keydown", handleKeyDown);
      setStyleCode(false);
      setScanCode(false);
      if (code !== "") {
        setDate(code.substring(50,  58));
        const current = currentDate();
        if (parseInt(code.substring(50,  58)) < parseInt(current)) {
          setSpan(true);
        } else {
          setValuePay(code.substring(38,  48));
          setFactura(code.substring(20,  34));
          setConvenio(code.substring(3,  16));
          setButton(true);
        }
      }
      return;
    }
    if (event.key !== "Alt" && event.key !== "(" && event.key !== ")") {
      if (count === 34) {
        console.log(event.key)
      }
      if ((count ===  34 || count ===  51) && event.key === "0") {
        setCount((prevCount) => prevCount +  1);
        return;
      }
      if ((count ===  35 || count ===  52) && event.key === "2") {
        setCount((prevCount) => prevCount +  1);
        return;
      }
      if ((count ===  36 || count ===  53) && event.key === "9") {
        setCount((prevCount) => prevCount +  1);
        return;
      } else {
        setCode((prevCode) => prevCode + event.key);
        setCount((prevCount) => prevCount +  1);
      }
    }
  }, [code, count]);

  useEffect(() => {
    if (styleCode) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      setScanCode(false)
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [styleCode, count, handleKeyDown]);
 
  function cleanDates() {
    setCode("")
    setConvenio("")
    setCount(0)
    setValuePay("")
    setDate("")
    setFactura("")
    setSpan(false)
    setButton(false)
  }

  async function ListenCode() {
    setSuccessRegis(false);
    setFaildRegis(false);
    cleanDates();
    setLoadingToken(true);
    try {
      const token = await ensureToken(); // requesta si no hay token o está por expirar
      console.log('Token obtenido en ListenCode:', token);
      setScanCode(true);
      setStyleCode((prev) => !prev);

      // ya está guardado en el store por ensureToken()/fetchNewToken
      // aquí puedes continuar con la lógica que depende del token
    } catch (err: any) {
      console.error('Error obteniendo token:', err);
      setErrorAuth(true);
      // opcional: revertir scanCode o mostrar UI
    } finally {
      setLoadingToken(false);
      setErrorAuth(false);
    }
  }

  async function sendRegister() {
    setLoading(true)
    cleanDates();
    setButton(false);
    const result = await setDatas({ convenio, valuePay, factura }) as any;
    console.log(result)
    if (result.success) {
      setLoading(false)
      setNumRecaudo(result.data);
      setSuccessRegis(true);
    } else {
      setLoading(false)
      if (result.exist) {
        setFaildRegisForExist(true);
      } else {
        setFaildRegis(true);
      }
    }
  }
  

  return (
      <div className="flex flex-col justify-center items-center bg-white py-5 px-10 rounded-2xl">
        <div
          onClick={ListenCode}
          className={`flex flex-col h-[250px] cursor-pointer justify-center mb-5 items-center border-2 rounded-lg border-gray-500 border-solid hover:scale-105 transition-all duration-300 ${!styleCode ? '' : 'bg-blue-400/50'}`}
          >
          <Barcode />
          <h1 className="text-center pb-5">Escanear codigo</h1>
        </div>
          {errorAuth&& <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Error de autenticacion</span>}
          {loading&&<p className="text-2xl font-semibold">Enviando...</p>}
          {loadingToken&&<p className="text-2xl font-semibold">Comprobando ..</p>}
          {span && <h4 className={`text-5xl text-red-600 mb-5`}>La fecha de pago expiro</h4>}
          {successRegis && <span className="text-2xl border-b-2 border-[#007eb8] text-[#007eb8] font-semibold">Registro de Recaudo Exitoso - # {numRecaudo.toString().padStart(5, "0")}</span>}
          {faildRegis && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Registro de Recaudo Fallido</span>}
          {faildRegisForExist && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Ya existe un registro con el numero de recibo</span>}
          {scanCode && <span className="text-2xl font-mono font-semibold">Por favor escanee el codigo</span>}
        <div className="flex flex-col items-center justify-center">
          <h3><strong>Codigo:</strong>
            {code}
            {/* {`${code.substring(0, 3)}-${code.substring(3, 16)}-${code.substring(16, 20)}-${code.substring(20, 34)}-${code.substring(34, 38)}-${code.substring(38, 48)}--${code.substring(48, 51)}-${code.substring(51, 58)}`} */}
          </h3>
          <h3><strong>Fecha:</strong> {date}</h3>
          <h3><strong>Monto:</strong> {valuePay}</h3>
          <h3><strong>N. Factura:</strong> {factura}</h3>
          <h3><strong>Convenio:</strong> {convenio}</h3>
        </div>

        <button
          className={`cursor-pointer text-2xl mt-4 px-4 py-2 rounded-md bg-[#007eb8] text-white border-2 hover:bg-[#2d2e83] transition duration-300 hover:scale-105 ${button ? '' : 'hidden'}`}
          onClick={() => sendRegister()}
          >
          Enviar
        </button>
        </div>
  );
}
