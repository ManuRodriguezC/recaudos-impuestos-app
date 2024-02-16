import { currentDate } from "./date";

export function datePy() {
    let date = currentDate()
    let setDate = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`
    return setDate
}