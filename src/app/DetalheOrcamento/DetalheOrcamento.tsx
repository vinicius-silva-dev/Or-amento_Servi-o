import { StackRoutesProps } from "@/routes/StackRoutes";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { styles } from "./styles";
import { Status } from "@/components/Status";
import { ServicosInculos } from "@/components/ServicoIncluso";
import { Button } from "@/components/Button";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Orcamento, orcamentoStorage } from "@/storage/orcamentoStorage";

import { useEffect, useState } from "react";

export function DetalheOrcamento({route, navigation }: StackRoutesProps<"detalheorcamento">) {
  const [orcamento, setOrcamento] = useState<Orcamento>()
  

  async function getOrcamentoById(id: string) {
    try {
      const response = await orcamentoStorage.getById(id)
 
      setOrcamento(response[0])
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível exibir os detalhes do orçamento.")
    }
  }

  async function duplicarOrcamento() {
    try {
      if(!orcamento) {
        throw new Error("Deu ruim")
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
        titulo: orcamento?.titulo,
        cliente: orcamento?.cliente,
        status: orcamento?.status,
        servicos: orcamento?.servicos,
        desconto: orcamento?.desconto,
        valorDesconto: orcamento?.valorDesconto,
        valorTotal: orcamento?.valorTotal,
        createdAt: formattedDate,
        updatedAt: formattedDate
      }

      await orcamentoStorage.add(newOrcamento)


      Alert.alert("Orcamento", `Orcamento adicionado com sucesso`)
      navigation.navigate("home")
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível duplicar o orçamento.")
    }
    
  }

  async function deleteOrcamento() {
    try {
      Alert.alert("Delete", "Deseja excluir este orçamento ?", [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            await orcamentoStorage.remove(route.params.id)
            navigation.navigate("home")
          }
        }
      ])
      
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível deletar o orçamento.")
    }
  }
  useEffect(() => {
    getOrcamentoById(route.params.id)
    
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 54 
      }}
    >
       <View style={styles.header}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <MaterialIcons 
            name="chevron-left"
            size={32}
            onPress={() => navigation.navigate("home")} 
          />
          <Text style={styles.title}>Orçamento</Text>
        </View>
        <Status status={ orcamento ? orcamento?.status : ''}/>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={[styles.card, {backgroundColor: "#FAFAFA"}]}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="storefront" size={30} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>{orcamento?.titulo}</Text>
          </View>
          <View style={{padding: 20}}>
            <View style={{marginBottom: 12}}>
              <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Cliente</Text>
              <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{orcamento?.cliente}</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View >
                <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Criado em</Text>
                <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{orcamento?.createdAt}</Text>
              </View>
              <View style={{justifyContent: "flex-start", width: "50%"}}>
                <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Atualizado em</Text>
                <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{orcamento?.updatedAt}</Text>
              </View>
            </View>

          </View>
        </View>

        <View style={[styles.card, {backgroundColor: "#FAFAFA", marginTop: 20}]}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="article" size={20} color={"#6A46EB"} />
            <Text style={{fontFamily: "Lato_400Bold", fontSize: 14}}>Serviços inclusos</Text>
          </View>
          {
            orcamento ?  orcamento.servicos.map(item => (
              <ServicosInculos
                key={item.id}
                id={item.id}
                titulo={item.titulo}
                decricao={item.descricao}
                quantidade={item.quantidade}
                valor={String(item.valor)}
              />
            )) :
            <Text>Nenhum serviço aqui.</Text>
          }
        </View>

        <View style={[styles.card, {flexDirection: "row", backgroundColor: "#FAFAFA",padding: 14, marginTop: 10}]}>
          <View style={{width: "15%", justifyContent: "flex-start"}}>
            <MaterialIcons name="credit-card" size={30} color={"#6A46EB"} />
            {/* <Text style={styles.titleHeader}>Investimento</Text> */}
          </View>

          <View style={{ width: 300}}>
            <View style={styles.subtotal}>
              <Text style={{fontFamily: "Lato_400Bold", fontSize: 16, color: "#4A4A4A"}}>Subtotal</Text>
              <Text style={{
                fontFamily: "Lato_700Bold",
                fontSize: 12,
                textDecorationLine: "line-through",
                marginRight: 10,
                color: "#4A4A4A"
              }}>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(orcamento ? orcamento.servicos[0].valor : 0)
                }
              </Text>
            </View>

            <View>
              <View style={styles.containerDesconto}>
                <View style={{flexDirection:"row", alignItems: "center", gap: 8}}>
                  <Text style={{fontFamily: "Lato_400Bold", fontSize: 16, color: "#4A4A4A"}}>Desconto</Text>
                  <View style={{borderRadius: 5, alignItems: "center", backgroundColor: "#BFF7BE", width: 50, height: 20}}>
                    <Text style={{
                      fontFamily: "Lato_400Bold",
                      fontSize: 12,
                      color: "#30752F",
                      textAlign: "center"
                    }}>
                      
                      {
                        orcamento ? `${orcamento?.desconto}% off` : '0 % off'
                      }
                    </Text>
                  </View>
                </View>

                <Text style={{
                  fontFamily: "Lato_700Bold",
                  fontSize: 12,
                  flexDirection: "row",
                  color:"#30752F",
                  // marginLeft: 60
                }}>
                  -
                  {
                    new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(orcamento ? orcamento?.valorDesconto : 0)
                  }
                </Text>

              </View>

              <View style={[styles.valorTotal]}>
                <Text style={{fontSize: 16, fontWeight: 700}}>Investimento total</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  
                  <Text style={{fontSize: 20, fontWeight: 700}}>
                    {
                    new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(orcamento ? orcamento?.valorTotal : 0)
                  }
                  </Text>
                </View>
              </View>
              
            </View>
          </View>
        </View>
          <View style={styles.bottons}>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <View style={{flexDirection: "row", gap: 10}}>
                <ButtonIcon 
                  name="delete-outline"
                  width={45}
                  height={45}
                  size={20} 
                  color="#DB4D4D" 
                  onPress={deleteOrcamento}
                />
                <ButtonIcon 
                  name="content-copy" 
                  width={45} 
                  height={45} 
                  size={20} 
                  color="#6A46EB"
                  onPress={duplicarOrcamento}
                />
                <ButtonIcon 
                  name="border-color" 
                  width={45} 
                  height={45} 
                  size={20} 
                  color="#6A46EB"
                  onPress={() => navigation.navigate("orcamento", {id: route.params.id})}
                />
              </View>
              <Button 
                title="Compartilhar" 
                name="send" 
                color="#6A46EB" 
                colorIcon="#FAFAFA" 
                width={170}
              />
            </View>
          </View>
      </ScrollView>

    </View>
  )
}