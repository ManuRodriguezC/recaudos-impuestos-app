export function currentDate() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const dia = fecha.getDate().toString().padStart(2, "0")
    return `${año}${mes}${dia}`;
}

export function nextDate() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const dia = (fecha.getDate() + 1).toString().padStart(2, "0")
    return `${año}${mes}${dia}`;
}