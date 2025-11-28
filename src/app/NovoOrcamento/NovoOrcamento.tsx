import { StackRoutesProps } from "@/routes/StackRoutes";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import CheckBox from '@react-native-community/checkbox';

import { Text, TextInput, View, ScrollView, Pressable, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";

import { Status } from "@/components/Status";
import { ServicoProps, ServicosInculos } from "@/components/ServicoIncluso";
import { Button } from "@/components/Button";
import { BottomModal } from "@/components/Modal";
import { ButtonIcon } from "@/components/ButtonIcon";

import {itemsStorage, Servico } from "@/storage/servicoStorage";
import {orcamentoStorage } from "@/storage/orcamentoStorage";

const statusOptions = ["Rascunho", "Aprovado", "Enviado", "Recusado"]


export function Orcamento({route, navigation }: StackRoutesProps<"orcamento">) {
   
  const [isOpenServico, setIsOpenServico] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  
  const [titulo, setTitulo] = useState("")
  const [cliente, setCliente] = useState("")
  const [status, setStatus] = useState("")
  const [subValor, setSubValor] = useState(0)
  const [desconto, setDesconto] = useState(0)
  const [valorDesconto, setvalorDesconto] = useState(0)
  const [valor, setValor] = useState(0)
  
  const [servicos, setServicos] = useState<Servico[]>([])
  const [idServico, setIdServico] = useState("")
  const [tituloServico, setTituloServico] = useState("")
  const [descricaoServico, setDescricaoServico] = useState("")
  const [valorServico, setValorServico] = useState("")
  const [qtdServices, setQtdServices] = useState(1)

  async function createOrcamento() {
    if(!titulo.trim() && !cliente.trim()) {
      return Alert.alert("Adicionar", "Informe o titulo a descrição do serviço.")
    }

    const today = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedDate = formatter.format(today);
    const newOrcamento = {
      id: randomId(),
      titulo,
      cliente,
      status: status,
      servicos: servicos,
      desconto,
      valorDesconto,
      valorTotal: subValor - valorDesconto,
      createdAt: formattedDate,
      updatedAt: formattedDate
    }

    await orcamentoStorage.add(newOrcamento)
    

    Alert.alert("Orcamento", `Orcamento adicionado com sucesso`)
    navigation.navigate("home")
    setTituloServico("")
    setDescricaoServico("")
    setValorServico("")
    // clearServices()
  }

  async function createServico() {
    if(!tituloServico.trim() && !descricaoServico.trim()) {
      return Alert.alert("Adicionar", "Informe o titulo a descrição do serviço.")
    }

    const newServico: Servico = {
      id: randomId(),
      titulo: tituloServico,
      descricao: descricaoServico,
      valor: Number(valorServico),
      quantidade: qtdServices
    }

    setServicos(prev => [...prev, newServico])
    await getServicos()

    Alert.alert("Adicionado", `Serviço adicionado com sucesso`)
    setTituloServico("")
    setDescricaoServico("")
    setValorServico("")
    setIsOpenServico(false)
  }

  async function getServicos() {
    try {
      const response = await itemsStorage.get()
      if(response.length > 0) {
        
        setServicos(response.reverse())
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }
  async function getServicoById(id: string) {
    try {
      setIsEdit(true)
      setIdServico(id)
      const response = servicos.find(item => item.id === id)

      
      if(!response) {
        Alert.alert("Erro", "Serviço não encontrado")
      }

      setTituloServico(response ? response?.titulo: "")
      setDescricaoServico(response ? response?.descricao: "")
      setValorServico(response ? String(response.valor) : "")
      setQtdServices(response?.quantidade ?? 1)
      setIsOpenServico(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }
  async function getOrcamentoById(id: string) {
    try {
      const response = await orcamentoStorage.getById(id) 

      response.forEach(async (item) => {
        setTitulo(item.titulo)
        setCliente(item.cliente)
        setStatus(item.status)
        setServicos(item.servicos)


      })
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregaro o orçamento.")
    }
  }

  function handleRemove() {
    Alert.alert("Remover", "Deseja remover esse serviço ?", [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => removeService()
      }
    ])
  }

  async function removeService() {
    try {
      await itemsStorage.remove(idServico)
      await getServicos()

      Alert.alert("Delete", "Serviço removido com sucesso.")
      setIsOpenServico(false)

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover os itens.")
    }
  }
  async function clearServices() {
    try {
      await itemsStorage.clear()
      await getServicos()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover os itens.")
    }
  }

  async function editOrcamento() {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedDate = formatter.format(today);
    const newOrcamento = {
      id: route.params?.id ? route.params?.id : randomId() ,
      titulo,
      cliente,
      status: status,
      servicos: servicos,
      desconto,
      valorDesconto,
      valorTotal: subValor - valorDesconto,
      createdAt: formattedDate,
      updatedAt: formattedDate
    }
    await orcamentoStorage.edit(newOrcamento)

    Alert.alert("Editado", `Orcamento editado com sucesso.`)
    navigation.navigate("home")
  }
  async function editService() {
    try {
      const newServico: Servico = {
      id: idServico,
      titulo: tituloServico,
      descricao: descricaoServico,
      valor: Number(valorServico),
      quantidade: qtdServices
    }
      // Precisa remover o serviço antigo antes de add o novo
      const removeServiceOld = servicos.filter(item => item.id !== idServico)
      setServicos([...removeServiceOld, newServico])
  
      Alert.alert("Editado", `Serviço editado com sucesso.`)
      setIsOpenServico(false)
      
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível editar esse serviço.")
    }
  }

  function investimento() {
    if(servicos) {
      const soma = servicos?.reduce((acumulador, servico) => {
        return acumulador + (servico.valor * servico.quantidade)
      },0)
  
      setSubValor(soma)
      const calculoDesconto = desconto / 100 * subValor
      setvalorDesconto(calculoDesconto)
    }
  }

  useEffect(() => {
    investimento()
  },[servicos, desconto])

  useEffect(() => {
    route.params?.id && getOrcamentoById(route.params?.id)
  },[route.params?.id])
 
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Deu ruim</Text>;
  }
  
  const randomId = function (length = 12) {
  return Math.random().toString(36).substring(2, length + 2);
};
  return (
    <View style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 54 
      }}
    >
      <View style={styles.header}>
        <MaterialIcons name="chevron-left" size={32} onPress={() =>{
           navigation.navigate("home")
          //  clearServices()
        }} />
        <Text style={styles.title}>Orçamento</Text>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="storefront" size={20} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>Informações gerais</Text>
          </View>
          <View style={{ padding: 15, flexDirection: "column", gap: 10 }}>
            <TextInput 
              style={styles.input}
              placeholder="Título"
              onChangeText={setTitulo}
              value={titulo}
            />
            <TextInput 
              style={styles.input}
              placeholder="Cliente"
              onChangeText={setCliente}
              value={cliente}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="sell" size={20} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>Status</Text>
          </View>
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
            {statusOptions.map((item, index) => (
              <View
                key={item}
                style={{
                  padding: 10,
                  width: 170,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <CheckBox
                  value={status === item}
                  onValueChange={() => setStatus(item)}
                  tintColors={{ true: '#6A46EB', false: '#999' }}
                />
                <Status status={item} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="article" size={20} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>Serviços inclusos</Text>
          </View>
          {
            servicos.length > 0 ?
            servicos?.map(item => (
              <ServicosInculos 
                key={item.id}
                id={randomId()}
                isName
                titulo={item.titulo}
                decricao={item.descricao}
                valor={String(item.valor * item.quantidade)}
                quantidade={item.quantidade}
                onOpenModal={() => getServicoById(item.id)}
              />
            )) : 
            <Text style={[styles.empaty, {marginBottom: 10}]}>Nenhum item aqui.</Text>
          }
         
          <View style={{ marginLeft: 30, marginBottom: 20 }}>
            <Button
              title="Adicionar Serviço"
              name="add"
              width={300}
              color="#FAFAFA"
              colorIcon="#6A46EB"
              onPress={() => {
                setIsEdit(false)
                setTituloServico("")
                setDescricaoServico("")
                setValorServico("")
                setQtdServices(1)
                setIsOpenServico(true)
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="credit-card" size={20} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>Investimento</Text>
          </View>
          <View style={styles.subtotal}>
            <Text>Subtotal</Text>
            <Text >
              <Text style={{fontSize: 12, textAlign: "right", color: "#4A4A4A"}}>
                {
                  servicos ? `${servicos?.length} itens ` : `${0} itens `
                }
              </Text>
              <Text>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(subValor)
                  
                }
              </Text>
            </Text>
          </View>

          <View>
            <View style={styles.containerDesconto}>
              <Text>Desconto</Text>
              <View style={styles.desconto}>
                <TextInput
                  style={styles.inputDesconto}
                  value={String(desconto)}
                  onChangeText={(text) => {
                    const num = Number(text)
                    if (!isNaN(num)) setDesconto(num)
                  }}
                />

                <MaterialIcons
                  name="percent"
                  size={18}
                  
                  color="#4A4A4A"
                />

              </View>
              <Text style={{flexDirection: "row", color:"red", marginLeft: 120}}>
                
                <Text>
                  -
                  {
                    new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(valorDesconto)
                  }
                </Text>
              </Text>
            </View>

            <View style={styles.valorTotal}>
              <Text style={{fontSize: 14, fontWeight: 700}}>Valor Total</Text>
              <View>
                <Text 
                  style={{
                    fontSize: 12,
                    textAlign: "right",
                    color: "#4A4A4A",
                    textDecorationLine: "line-through"
                    }}
                  >
                    {
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(subValor)
                    }
                  </Text>
                <Text >
                  
                  <Text style={{fontSize: 18, fontWeight: 700}}>
                    {
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(subValor - valorDesconto )
                    }
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          
        </View>
          
        <View style={styles.submit}>
          <Button title="Cancelar" color="#FAFAFA" colorIcon="#6A46EB" width={120}/>
          <Button 
            title="Salvar"
            name="check"
            color="#6A46EB"
            colorIcon="#FAFAFA"
            width={120}
            onPress={route.params?.id ? editOrcamento : createOrcamento}
          />
        </View>
      </ScrollView>

      <BottomModal visible={isOpenServico} onClose={() => setIsOpenServico(false)} height={480}>
        <View style={styles.headerFiltro}>
          <Text style={{
            fontFamily: "Lato_700Bold",
            fontSize: 14,
            // color: "#676767"
          }}>
            Serviço
          </Text>
          
          <MaterialIcons name="close" size={32} onPress={() => setIsOpenServico(false)} />
        </View>
        <View style={{ padding: 15, flexDirection: "column", gap: 10 }}>
          <TextInput 
            style={[styles.input]}
            placeholder="Título"
            value={tituloServico}
            onChangeText={setTituloServico}
          />

          <TextInput 
            editable
            multiline
            numberOfLines={4}
            // maxLength={40}
            style={{
              height: 100,
              borderWidth: 1,
              fontSize: 18,
              backgroundColor: "#FAFAFA",
              borderRadius: 20,
              borderColor: "#E6E5E5",
              paddingHorizontal: 20,
            }}
            value={descricaoServico}
            onChangeText={setDescricaoServico}
            placeholder="Descrição" 
          />
          
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TextInput 
              style={[styles.input, {width: "65%"}]}
              placeholder="R$ 0,00"
              value={valorServico}
              onChangeText={setValorServico}
            />
            <View
              style={{
                width: "30%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#FAFAFA",
                borderWidth: 1,
                borderColor: "#E6E5E5",
                borderRadius: 50,
                overflow: "hidden"
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  // backgroundColor: "#eee"
                }}
                onPress={() =>{
                   setQtdServices((prev) => prev > 0 ? prev - 1 : 0)
                  //  const novoValor = qtdServices
                  //  setValorServico((prev) => String( prev ))
                }}
              >
                <Text style={{fontSize: 30, textAlign: "center", color: "#6A46EB"}}>
                  -
                </Text>
              </Pressable>
              <TextInput 
                style={[{
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  padding: 8
                }]}
                keyboardType="numeric"
                value={String(qtdServices)}
                onChangeText={(text) => {
                  const num = Number(text);
                   if (!isNaN(num)) setQtdServices(num);
                }}
              />
              <Pressable
                onPress={() => {
                  setQtdServices((prev) => prev + 1)
                  // setValorServico((prev) => String(+ prev * qtdServices))
                }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  // backgroundColor: "#eee"
                }}
              >

                <Text style={{ fontSize: 30, textAlign: "center", color: "#6A46EB"}}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View 
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
            padding: 20,
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <View style={{flexDirection: "row", justifyContent: "center", gap: 12, width: "100%",}}>  
            <ButtonIcon 
              name="delete-outline"
              width={55}
              height={55}
              size={30}
              color="#DB4D4D"
              onPress={handleRemove}
            />
            {
              isEdit ? (
                <Button 
                  title="Salvar"
                  name="check"
                  color="#6A46EB"
                  colorIcon="#FAFAFA"
                  width={120}
                  onPress={editService}
                />
              ) : (
                <Button 
                  title="Salvar"
                  name="check"
                  color="#6A46EB"
                  colorIcon="#FAFAFA"
                  width={120}
                  onPress={ createServico}
                />
              )
            }
            {/* <Button 
              title="Salvar"
              name="check"
              color="#6A46EB"
              colorIcon="#FAFAFA"
              width={120}
              onPress={ createServico}
            /> */}
          </View>
        </View>
      </BottomModal>
    </View>
  );
}
