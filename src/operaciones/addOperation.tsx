import { useCallback, useEffect, useState } from "react";
import { currentDate } from "../registros/components/date";
import Barcode from "../registros/components/Barcode";
import setDatas from "../registros/components/setDatas";

interface datesAddRegis {
    date: string
}

export default function AddRegister({ date }: datesAddRegis) {

    const fecha = date
    const [code, setCode] = useState("")
    const [count, setCount] = useState(0)
    const [valuePay, setValuePay] = useState("")
    const [factura, setFactura] = useState("")
    const [convenio, setConvenio] = useState("")
    const [styleCode, setStyleCode] = useState(false)
    const [span, setSpan] = useState(false)
    const [button, setButton] = useState(false)
    const [successRegis, setSuccessRegis] = useState(false)
    const [faildRegis, setFaildRegis] = useState(false)
    const [scanCode, setScanCode] = useState(false)
    const [numRecaudo, setNumRecaudo] = useState("")
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter") {
        window.removeEventListener("keydown", handleKeyDown);
        setStyleCode(false);
        setScanCode(false);
        if (code !== "") {
            const current = currentDate();
            if (parseInt(code.substring(52,  60)) < parseInt(current)) {
            setSpan(true);
            } else {
            setValuePay(code.substring(38,  50));
            setFactura(code.substring(20,  32));
            setConvenio(code.substring(3,  16));
            setButton(true);
            }
        }
        return;
        }
        if (event.key !== "Alt" && event.key !== "(" && event.key !== ")") {
        if ((count ===  32 || count ===  53) && event.key === "0") {
            setCount((prevCount) => prevCount +  1);
            return;
        }
        if ((count ===  33 || count ===  54) && event.key === "2") {
            setCount((prevCount) => prevCount +  1);
            return;
        }
        if ((count ===  34 || count ===  55) && event.key === "9") {
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
        setFactura("")
        setSpan(false)
        setButton(false)
    }

    function ListenCode() {
        setScanCode(true)
        setSuccessRegis(false)
        setFaildRegis(false)
        cleanDates()
        setStyleCode((prevStyleCode) => !prevStyleCode);
    }

    async function sendRegister() {
        cleanDates();
        setButton(false);
        const result = await setDatas({ convenio, valuePay, factura, fecha }) as any;
        if (result.success) {
        setNumRecaudo(result.data)
        setSuccessRegis(true);
        } else {
        setFaildRegis(true);
        }
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }
    

  return (
      <div className="flex flex-col justify-center items-center bg-white py-5 px-10 rounded-2xl m-10">
        <div
          onClick={ListenCode}
          className={`flex flex-col h-[250px] cursor-pointer justify-center mb-5 items-center border-2 rounded-lg border-gray-500 border-solid hover:scale-105 transition-all duration-300 ${!styleCode ? '' : 'bg-blue-400/50'}`}
          >
          <Barcode />
          <h1 className="text-center pb-5">Escanear codigo</h1>
        </div>
          {span && <h4 className={`text-5xl text-red-600 mb-5`}>La fecha de pago expiro</h4>}
          {successRegis && <span className="text-2xl border-b-2 border-[#007eb8] text-[#007eb8] font-semibold">Registro de Recaudo Exitoso - # {numRecaudo.toString().padStart(5, "0")}</span>}
          {faildRegis && <span className="text-2xl border-b-2 border-red-600 text-red-600 font-semibold">Registro de Recaudo Fallido</span>}
          {scanCode && <span className="text-2xl font-mono font-semibold">Por favor escanee el codigo</span>}
        <div className="flex flex-col items-center justify-center">
          <h3><strong>Codigo:</strong> {code}</h3>
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
