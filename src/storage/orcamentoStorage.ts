import AsyncStorage from "@react-native-async-storage/async-storage";
import { Servico } from "./servicoStorage";
import { Orcamento } from "@/components/Orcamento";

const ITEMS_STORAGE_KEY = "@orcamento:items"

export type Orcamento = {
  id: string
  titulo: string
  cliente: string
  status: string
  servicos: Servico[]
  desconto: number
  valorDesconto: number
  valorTotal: number
  createdAt: string
  updatedAt: string
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
  try {
    const orcamentos = await get()
    const orcamento = orcamentos.filter(item => item.id === id)
    
    return orcamento
  
    
  } catch (error) {
    throw new Error("ITEMS_GET: " + error)
  }


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

async function edit(newOrcamento: Orcamento): Promise<void> {
  try {
    const orcamento = await get()

    const removeOrcamentoOld = orcamento.filter(item => item.id !== newOrcamento.id)

    await save([...removeOrcamentoOld, newOrcamento])
  } catch (error) {
    throw new Error("ITEMS_EDIT: " + error)
  }
}

async function remove(id: string): Promise<void> {
  try {
    const orcamentos = await get()
    const orcamentoRemovido = orcamentos.filter(item => item.id !== id)
    await save(orcamentoRemovido)
    
  } catch (error) {
    throw new Error("ITEMS_CLEAR" + error)
  }
}

export const orcamentoStorage = {
  get,
  getById,
  getByStatus,
  add,
  save,
  edit,
  remove
}