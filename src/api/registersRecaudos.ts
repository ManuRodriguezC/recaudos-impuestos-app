import axios from "axios";

export interface RegistersDates {
    encabezadoArchivo: string
    encabezadoLote: string
    registroDetalle: string
    fecha: string
    id?: number
}

const registerRecaudo = axios.create({
    baseURL: 'http://localhost:8000/registers/api/v1/registers/'
})

export const createRegister = (dates: RegistersDates) => registerRecaudo.post('/', dates)

export const getAllRegister = () => registerRecaudo.get('/')

export const deleteRegister = (id: number) => registerRecaudo.delete(`/${id}`)