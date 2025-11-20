import AsyncStorage from "@react-native-async-storage/async-storage";


const ITEMS_STORAGE_KEY = "@orcamento:servico"
export type Servico = {
  id: string
  titulo: string
  descricao: string
  valor: number
}

async function get(): Promise<Servico[]> {
  try {
    const servicos = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

    return servicos ? JSON.parse(servicos) : []
  } catch (error) {
    throw new Error("ITEMS_GET: " + error)
  }
}

async function getById(id: string): Promise<Servico | undefined> {
  const servicos = await get()
  const servico = servicos.find(item => item.id === id)
  return servico

}

async function save(newServico: Servico[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(newServico))
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error)
  }
}

async function add(newServico: Servico): Promise<Servico[]> {
  try {
    const servicos = await get()
    const updateServico = [...servicos, newServico]

    await save(updateServico)

    return updateServico
  } catch (error) {
    throw new Error("ITEMS_ADD: " + error)
  }
  
}

async function edit(newServico: Servico): Promise<void> {
  try {
    const servico = await get()

    const removeServiceOld = servico.filter(item => item.id !== newServico.id)

    await save([...removeServiceOld, newServico])
  } catch (error) {
    throw new Error("ITEMS_EDIT: " + error)
  }
}

async function remove(id: string): Promise<void> {
  try {
    const servicos = await get()
    const servicoRemovido = servicos.filter(item => item.id !== id)
    await save(servicoRemovido)
    
  } catch (error) {
    throw new Error("ITEMS_CLEAR" + error)
  }
}

async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error("ITEMS_CLEAR" + error)
  }
}

export const itemsStorage = {
  get,
  getById,
  add,
  edit,
  save,
  clear,
  remove
}