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

const statusOptions = ["Rascunho", "Aprovado", "Enviado", "Recusado"]


export function Orcamento({ navigation }: StackRoutesProps<"orcamento">) {
   

  const [qtdServices, setQtdServices] = useState(1)
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [titulo, setTitulo] = useState("")
  const [cliente, setCliente] = useState("")
  const [status, setStatus] = useState("")
  const [valor, setValor] = useState<Number>(0)

  const [servicos, setServicos] = useState<Servico[]>()
  const [idServico, setIdServico] = useState("")
  const [tituloServico, setTituloServico] = useState("")
  const [descricaoServico, setDescricaoServico] = useState("")
  const [valorServico, setValorServico] = useState("")

  async function handleServico() {
    if(!tituloServico.trim() && !descricaoServico.trim()) {
      return Alert.alert("Adicionar", "Informe o titulo a descrição do serviço.")
    }

    const newServico = {
      id: randomId(),
      titulo: tituloServico,
      descricao: descricaoServico,
      valor: Number(valorServico)
    }

    await itemsStorage.add(newServico)
    await getServicos()

    Alert.alert("Adicionado", `Serviço adicionado com sucesso`)
    setTituloServico("")
    setDescricaoServico("")
    setValorServico("")
  }

  async function getServicos() {
    try {
      const response = await itemsStorage.get()
      setServicos(response.reverse())
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }
  async function getServicoById(id: string) {
    try {
      setIsEdit(true)
      setIdServico(id)
      const response = await itemsStorage.getById(id)

      if(!response) {
        Alert.alert("Erro", "Serviço não encontrado")
      }

      setTituloServico(response ? response?.titulo: "")
      setDescricaoServico(response ? response?.descricao: "")
      setValorServico(response ? String(response.valor) : "")
      setisOpen(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
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
      setisOpen(false)

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover os itens.")
    }
  }

  async function editService() {
    try {
      const newServico = {
      id: idServico,
      titulo: tituloServico,
      descricao: descricaoServico,
      valor: Number(valorServico)
    }

      await itemsStorage.edit(newServico)
      await getServicos()
      Alert.alert("Editado", `Serviço editado com sucesso.`)
      setisOpen(false)
      
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível editar esse serviço.")
    }
  }

  useEffect(() => {
    getServicos()
  },[])
 
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
        <MaterialIcons name="chevron-left" size={32} onPress={() => navigation.navigate("home")} />
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
            {statusOptions.map(item => (
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
                  value={isChecked}
                  onValueChange={setIsChecked}
                  onChange={() => setStatus(item)}
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
            servicos ?
            servicos?.map(item => (
              <ServicosInculos 
                key={item.id}
                id={randomId()}
                isName
                titulo={item.titulo}
                decricao={item.descricao}
                valor={String(item.valor)}
                quantidade={1}
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
              onPress={() => setisOpen(true)}
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
              <Text style={{fontSize: 12, textAlign: "right", color: "#4A4A4A"}}>{`8 itens  `}</Text>
              <Text>{`R$ 3.847,50`}</Text>
            </Text>
          </View>

          <View>
            <View style={styles.containerDesconto}>
              <Text>Desconto</Text>
              <View style={styles.desconto}>
                <TextInput
                  style={styles.inputDesconto}
                  value="4"
                />

                <MaterialIcons
                  name="percent"
                  size={18}
                  
                  color="#4A4A4A"
                />

              </View>
              <Text style={{flexDirection: "row", color:"red", marginLeft: 120}}>
                <Text>R$</Text>
                <Text>{` -200,00`}</Text>
              </Text>
            </View>

            <View style={styles.valorTotal}>
              <Text style={{fontSize: 14, fontWeight: 700}}>Valor Total</Text>
              <View>
                <Text style={{fontSize: 12, textAlign: "right", color: "#4A4A4A", textDecorationLine: "line-through"}}>{`R$ 4.050,00`}</Text>
                <Text >
                  <Text>R$</Text>
                  <Text style={{fontSize: 18, fontWeight: 700}}>{` 3.847,50`}</Text>
                </Text>
              </View>
            </View>
          </View>
          
        </View>
          
        <View style={styles.submit}>
          <Button title="Cancelar" color="#FAFAFA" colorIcon="#6A46EB" width={120}/>
          <Button title="Salvar" name="check" color="#6A46EB" colorIcon="#FAFAFA" width={120}/>
        </View>
      </ScrollView>

      <BottomModal visible={isOpen} onClose={() => setisOpen(false)} height={480}>
        <View style={styles.headerFiltro}>
          <Text style={{
            fontFamily: "Lato_700Bold",
            fontSize: 14,
            // color: "#676767"
          }}>
            Serviço
          </Text>
          
          <MaterialIcons name="close" size={32} onPress={() => setisOpen(false)} />
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
                onPress={() => setQtdServices((prev) => prev > 0 ? prev - 1 : 0)}
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
                onPress={() => setQtdServices((prev) => prev + 1)}
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
                  onPress={ handleServico}
                />
              )
            }
            {/* <Button 
              title="Salvar"
              name="check"
              color="#6A46EB"
              colorIcon="#FAFAFA"
              width={120}
              onPress={ handleServico}
            /> */}
          </View>
        </View>
      </BottomModal>
    </View>
  );
}
