export default function RegisterDetail(factura: string, valor: string) {
    const newfactura = factura.padStart(48, "0")
    const newValue = valor.padStart(10, "0")
    const newdate = `06${newfactura}${newValue}00020100000000000000000370000002`
    console.log(newdate)
    return newdate
}