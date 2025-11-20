import AsyncStorage from "@react-native-async-storage/async-storage";
import { Servico } from "./servicoStorage";
import { Orcamento } from "@/components/Orcamento";

const ITEMS_STORAGE_KEY = "@orcamento:items"

export type Orcamento = {
  id: string
  titulo: string
  cliente: string
  status: string
  servicosId: string[]
  valorTotal: number
}

async function get(): Promise<Orcamento[]> {
  try {
    const orcamentos = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

    return orcamentos ? JSON.parse(orcamentos) : []
  } catch (error) {
    throw new Error("ITEMS_GET: " + error)
  }
}

async function getById(id: string): Promise<Orcamento[]> {
  const orcamentos = await get()

  return orcamentos.filter(item => item.id === id)

}

async function getByStatus(status: string): Promise<Orcamento[]> {
  const orcamentos = await get()

  return orcamentos.filter(item => item.status === status)

}

async function save(newOrcamento: Orcamento[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(newOrcamento))
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error)
  }
}

async function add(newOrcamento: Orcamento): Promise<Orcamento[]> {
  try {
    const orcamentos = await get()
    const updateOrcamento = [...orcamentos, newOrcamento]

    await save(updateOrcamento)

    return updateOrcamento
  } catch (error) {
    throw new Error("ITEMS_ADD: " + error)
  }
  
}

export const itemsStorage = {
  get,
  getById,
  getByStatus,
  add,
  save
}