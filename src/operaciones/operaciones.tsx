import { deleteRegister, getAllRegister } from "../api/registersRecaudos";
import type { RegistersDates } from "../api/registersRecaudos";
import React, { useEffect, useState } from "react"
import AddRegister from "./addOperation";
import Add from "../icons/Add"
import downloadPDF from "./downloadPDF";

interface SumValuesState {
    [key: string]: number;
  }

export default function Operations() {
    const [selectedDate, setSelectedDate] = useState('')
    const [registers, setRegisters] = useState<RegistersDates[]>([])
    const [filters, setFilters] = useState<RegistersDates[]>([])
    const [filterHeaderFile, setFilterHeaderFile] = useState<string[]>([])
    const [filterHeaderLote, setFilterHeaderLote] = useState<string[]>([])
    const [displayDates, setDisplayDates] = useState(false)
    const [sumValues, setSumValues] = useState<SumValuesState>({})
    const [sumTotal, setSumTotal] = useState(0)
    const [foundRegisters, setFoundRegisters] = useState(false)
    const [downloadButton, setDownloadButton] = useState(false)
    const [addregister, setAddregister] = useState(false)
    const [newRegister, setNewRegister] = useState(false)
    const zero = "."

    useEffect(() => {
        async function callRegis() {
            const res = await getAllRegister()
            setRegisters(res.data)
        }
        callRegis()
    }, [])

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let date = event.target.value
        setFoundRegisters(false)
        setDisplayDates(false)
        setDownloadButton(false)
        setFilters([])
        setFilterHeaderFile([])
        setFilterHeaderLote([])
        setSelectedDate(date)
    }

    function calculateValues(lotes: string[], registers: RegistersDates[]): Record<string, number> {
        const result: Record<string, number> = {}
        lotes.forEach(lote => {
            result[lote] = 0
            registers.forEach(regis => {
                if (regis.encabezadoLote == lote) {
                    result[lote] += parseInt(regis.registroDetalle.substring(50, 64))
                }
            })
        })
        return result
    }

    function callRegister() {
        const filter = registers.filter((regis) => regis.fecha == selectedDate)
        if (filter.length > 0) {
            setNewRegister(false)
            setDisplayDates(true)
            setDownloadButton(true)
            setFoundRegisters(false)
            setAddregister(true)
            setFilters(filter)
            const headerFile = filter.map((regis) => regis.encabezadoArchivo)
            const filterfiles = [...new Set(headerFile)]
            setFilterHeaderFile(filterfiles)
            const headerLote = filter.map((regis) => regis.encabezadoLote)
            const filterLotes = [...new Set(headerLote)]
            setFilterHeaderLote(filterLotes)
            const values = calculateValues(filterLotes, filter)
            setSumValues(values)
            setSumTotal(Object.values(values).reduce((total, value) => total + value, 0))
        } else {
            setFoundRegisters(true)
            setAddregister(true)
            setNewRegister(false)
        }
    }

    async function DeleteRegis(id: any) {
        const result = confirm(`¿Estás seguro de que deseas eliminar este registro # ${id}?`);
        if (result) {
            try {
                await deleteRegister(id);
                location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    function downloadFile () {
        let dates: string[] = []
        dates.push(`${filterHeaderFile[0]}${zero.padEnd(107, zero)}`)
        filterHeaderLote.map((lote, index) => {
            let ind = index + 1;
            let count = 1;
            dates.push(`${lote}${zero.padEnd(143, zero)}`)
            filters.map((regis, index) => {
                if (regis.encabezadoLote === lote) {
                    count ++;
                    dates.push(`${regis.registroDetalle.slice(0, -7)}${count.toString().padStart(7, "0")}${zero.padEnd(68, zero)}`)
                }
            })
            dates.push(`08${(count - 1).toString().padStart(9, "0")}${sumValues[lote].toString().padStart(18, "0")}${ind.toString().padStart(4, "0")}${zero.padEnd(129, zero)}`)
        })
        dates.push(`09${filters.length.toString().padStart(9, "0")}${sumTotal.toString().padStart(18, "0")}${zero.padEnd(133, zero)}`)
        const text = dates.join('\n').replaceAll('.', ' ')

        const blob = new Blob([text], {type: 'text/plain'})
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `Recaudos ${selectedDate}`
        link.click()
        setTimeout(() => {
            URL.revokeObjectURL(url);
          },  0);
    }

    function NewRegis() {
        setNewRegister(true)
        setDownloadButton(false)
        setDisplayDates(false)
        setFoundRegisters(false)
        setAddregister(false)
    }

    return (
            <div className="flex flex-col justify-center items-center mb-5">
                <div className="flex flex-col top-20 items-center w-[440px] justify-center bg-white px-10 py-2 rounded-xl ">
                    <h3 className="font-bold text-2xl">Seleccione una fecha</h3>
                    <div className="flex flex-wrap gap-5 m-2">
                        <input className="border-2 border-zinc-400 rounded-md" type="date" onChange={handleDateChange}/>
                        <button
                            className="text-white rounded-md hover:bg-[#007eb8c1] transition duration-300 hover:scale-105 bg-[#007eb8] px-3 py-1"
                            onClick={() => {callRegister()}}
                            >Buscar
                        </button>
                    </div>
                    {selectedDate &&
                        <div>
                            <h4 className="font-bold text-xl">Fecha: {selectedDate}</h4>
                        </div>
                    }
                </div>
                {foundRegisters && <span className="text-white text-2xl border-b-2 border-white m-10">No se encontraton datos registrados para el {selectedDate}</span>}
                {displayDates && 
                    <table className="mt-10 mb-4 p-5 bg-white rounded-3xl shadow-gray-800 shadow-lg font-semibold">
                        <tr className="flex flex-col justify-center items-center p-5">
                            <td>{filterHeaderFile[0]}</td>
                            {filterHeaderLote.map((lote, index) => {
                                let ind = index + 1
                                let count =  1;
                                
                                return (
                                    <>
                                    <td>{lote}</td>
                                    {filters.map((regis, indexx) => {
                                        if (regis.encabezadoLote === lote) {
                                            count++;
                                            return <td
                                                        className="my-1">
                                                        <span className="mr-6">Radicado # {regis.id}</span>
                                                        {regis.registroDetalle.slice(0, -7)}{count.toString().padStart(7, "0")}
                                                        <button
                                                            className="ml-6 text-red-600 border-red-600 rounded transition duration-200 ease-in-out ... hover:scale-110 hover:border-b-2"
                                                            onClick={() => DeleteRegis(regis.id)}
                                                            >Eliminar
                                                        </button>
                                                    </td>;
                                        }
                                        return null;
                                    })}
                                    <td className="mb-8">{`08${(count - 1).toString().padStart(9, "0")}${sumValues[lote].toString().padStart(18, "0")}${ind.toString().padStart(4, "0")}`}</td>
                                    </>
                                );
                            })}
                            <td>09{filters.length.toString().padStart(9, "0")}{sumTotal.toString().padStart(18, "0")}</td>
                        </tr>
                    </table>
                }
                {addregister &&
                    <button
                        className="text-white hover:scale-110"
                        onClick={() => NewRegis()}>
                        <Add />
                    </button>
                }
                {downloadButton && 
                    <div className="flex flex-row gap-5">
                        <button
                            className="px-4 mt-3 py-2 bg-[#007eb8] text-white rounded-lg hover:bg-[#007eb8c1] hover:scale-105 transition-all duration-200"
                            onClick={() => {downloadFile()}}
                            >Descargar texto plano
                        </button>
                        <button
                            className="px-4 mt-3 py-2 bg-[#007eb8] text-white rounded-lg hover:bg-[#007eb8c1] hover:scale-105 transition-all duration-200"
                            onClick={() => {downloadPDF()}}
                            >Descargar PDF
                        </button>
                    </div>
                }
                {newRegister &&
                    <AddRegister date={selectedDate} />
                }
            </div>
    )
}