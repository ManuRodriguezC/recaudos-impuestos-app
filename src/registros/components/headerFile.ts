import { currentDate, nextDate } from "./date";

export default function HeaderFile() {
    const data = `018918008461${currentDate()}06600000037000003823${nextDate()}0600A01`
    //const longData = data.padEnd(162, "0")
    return data
}