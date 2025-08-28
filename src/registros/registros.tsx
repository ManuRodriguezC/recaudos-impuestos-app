import { useCallback, useEffect, useState } from "react";
import { currentDate } from "./components/date";
import Barcode from "./components/Barcode";
import { useTokenStore } from "../utils/state";
import { fetchCheckReferenceApi, fetchTokenFromApi } from "../api/peticionesTunja";
import { checkMessage } from "../utils/JsonMessages";
import DialogDatasPay from "./components/modalDatas";


export default function Home() {

  const [code, setCode] = useState("")
  const [count, setCount] = useState(0)
  const [date, setDate] = useState("")
  const [valuePay, setValuePay] = useState("")
  const [factura, setFactura] = useState("")
  const [convenio, setConvenio] = useState("")
  const [styleCode, setStyleCode] = useState(false)
  const [span, setSpan] = useState(false)
  const [scanCode, setScanCode] = useState(false)
  const [loadingToken, setLoadingToken] = useState(false);
  const [errorAuth, setErrorAuth] = useState<boolean>(false);
  const [validReferenceResponse, setValidReferenceResponse] = useState<Record<string, any>>({});
  const [controlValidateReference, setControlValidateReference] = useState<boolean>(false)
  const { setToken, tokenAuth, tokenTime } = useTokenStore()
  const [open, setOpen] = useState(false)
  const [controlDialog, setControlDialog] = useState(false)
 
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
          setControlValidateReference(true);
        }
      }
      return;
    }
    if (event.key !== "Alt" && event.key !== "(" && event.key !== ")") {

      if ((count ===  34) && event.key === "0") {
        setCount((prevCount) => prevCount +  1);
        return;
      }
      if ((count ===  35) && event.key === "2") {
        setCount((prevCount) => prevCount +  1);
        return;
      }
      if ((count ===  36) && event.key === "9") {
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
    setControlDialog(false)
    setOpen(false)
    setCode("")
    setConvenio("")
    setCount(0)
    setValuePay("")
    setDate("")
    setFactura("")
    setSpan(false)
  }

  async function ListenCode() {
    setOpen(false)
    setControlValidateReference(false);
    setValidReferenceResponse({})
    setErrorAuth(false);
    cleanDates();
    if (!scanCode) {
      setLoadingToken(true);
      try {
        if (tokenTime !== "") {
          const now = new Date();
          const tokenExp = new Date(tokenTime);
          if (now < tokenExp) {
            setScanCode(true);
            setStyleCode((prev) => !prev);
            setLoadingToken(false);
            return;
          }
        }
        const {token , expiresInSeconds} = await fetchTokenFromApi()
        if (token === "") {
          setErrorAuth(true)
        } else {
          setToken(token, expiresInSeconds);
          setScanCode(true);
          setStyleCode((prev) => !prev);
        }

        // ya está guardado en el store por ensureToken()/fetchNewToken
        // aquí puedes continuar con la lógica que depende del token
      } catch (err: any) {
        console.error('Error obteniendo token:', err);
        setErrorAuth(true);
        // opcional: revertir scanCode o mostrar UI
      } finally {
        setLoadingToken(false);
      }
    } else {
      setScanCode(false);
      setStyleCode(false);
    }
  }

  async function checkReference() {
    const info = checkMessage(date, convenio, valuePay, factura);
    const data = {
      "info": info,
      "token": tokenAuth,
    }
    const response = await fetchCheckReferenceApi(data);
    if (response) {
      const resMessage = response.response.checkReference.rs
      setScanCode(false);
      setStyleCode(false);
      setControlValidateReference(false);
      if (resMessage.statusCode == '0000') {
        setValidReferenceResponse({"message": "La referencias es valida", "statusCode": resMessage.statusCode});
        setControlDialog(true);
        setOpen(true);
      } else {
        setValidReferenceResponse({"message": resMessage.statusDesc, "statusCode": resMessage.statusCode});
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
          <DialogDatasPay
            valueRecaudo={valuePay}
            convenioNum={convenio}
            facturaNum={factura}
            date={date}
            open={open}
            setOpen={setOpen}
            controlDialog={controlDialog}
          />
          <p className={`text-2xl font-semibold pb-4 ${validReferenceResponse.statusCode === '0000' ? 'text-green-600' : 'text-red-600'}`}>
            {validReferenceResponse.message}
          </p>
          {errorAuth&& <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Error de autenticacion</span>}
          {loadingToken&&<p className="text-2xl font-semibold">Comprobando ..</p>}
          {span && <h4 className={`text-5xl text-red-600 mb-5`}>La fecha de pago expiro</h4>}
          {scanCode && <span className="text-2xl font-mono font-semibold">Por favor escanee el codigo</span>}
        <div className="flex flex-col items-center justify-center">
          <h3><strong>Codigo:</strong>
            {code}
          </h3>
          <h3><strong>Fecha:</strong> {date}</h3>
          <h3><strong>Monto:</strong> {valuePay}</h3>
          <h3><strong>N. Factura:</strong> {factura}</h3>
          <h3><strong>Convenio:</strong> {convenio}</h3>
        </div>

        {
          controlValidateReference &&
          <button
            className={`cursor-pointer text-2xl mt-4 px-4 py-2 rounded-md bg-[#007eb8] text-white border-2 hover:bg-[#2d2e83] transition duration-300 hover:scale-105`}
            onClick={() => checkReference()}
            >
            Validar Recibo
          </button>
        }
        </div>
  );
}
