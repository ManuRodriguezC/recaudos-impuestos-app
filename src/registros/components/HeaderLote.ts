export default function HeaderLote(convenio: string) {
    const data = `05${convenio}0001`
    //const logdata = data.padEnd(162, "0")
    return data
}