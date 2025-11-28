import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

import { BottomModal } from "@/components/Modal";
import {OrcamenProps, Orcamento} from "@/components/Orcamento"
import { Search } from "@/components/search";
import { Status } from "@/components/Status";

import { StackRoutesProps } from "@/routes/StackRoutes";
import {orcamentoStorage } from "@/storage/orcamentoStorage";

import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";

import {useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, Alert } from "react-native";

const Item = [
  // {
  //   id: "service-1",
  //   title: "Desenvolvimento de aplicativo de loja online",
  //   client: "Gima Jaru",
  //   status: "Aprovado",
  //   valor: "3.000,00",
  // },
  // {
  //   id: "service-2",
  //   title: "Criação de conteúdo",
  //   client: "Loja Bella",
  //   status: "Rascunho",
  //   valor: "4.000,00",
  // },
  // {
  //   id: "service-3",
  //   title: "Serviço de SEO",
  //   client: "Gima Jaru",
  //   status: "Enviado",
  //   valor: "3.500,00",
  // },
  // {
  //   id: "service-4",
  //   title: "Gestão de redes sociais",
  //   client: "Social Exprerts",
  //   status: "Recusado",
  //   valor: "2.500,00",
  // },
]

const statusOptions = ["Rascunho", "Aprovado", "Enviado", "Recusado"]
const ordenacaoOptions = ["Mais recente", "Mais antigo", "Maior valor", "Menor valor"]

export function Home({navigation}: StackRoutesProps<"home">) {
  const [orcamento, setOrcamento] = useState<OrcamenProps[]>()
  const [status, setStatus] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [tituloOrcamento, setTituloOrcamento] = useState("");
  const [clienteOrcamento, setClienteOrcamento] = useState("");
  const [isOpen, setisOpen] = useState(false)
  
  async function getOrcamentos() {
      try {
        const response = await orcamentoStorage.get()
        if(response.length > 0) {
          setOrcamento(response.reverse())
        }
        
      } catch (error) {
        console.log(error)
        Alert.alert("Erro", "Não foi possível filtrar os itens.")
      }
  }

  async function filtro() {
    if(status) {
      const orcamentoByStatus = await orcamentoStorage.getByStatus(status)
      setOrcamento(orcamentoByStatus)
    } else if(ordenacao === "Mais antigo") {
      orcamento?.reverse()
    }

    if (ordenacao === "Maior valor" && status) {
      const orcamentoByStatus = await orcamentoStorage.getByStatus(status)
      const orcamentoMaiorValor = orcamentoByStatus?.sort((a,b) => b.valorTotal - a.valorTotal)
      setOrcamento(orcamentoMaiorValor)
    } else if (ordenacao === "Maior valor" && !status) {
      const orcamentoMaiorValor = orcamento?.sort((a,b) => b.valorTotal - a.valorTotal)
      setOrcamento(orcamentoMaiorValor)
    } else if (ordenacao === "Menor valor" && status) {
      const orcamentoByStatus = await orcamentoStorage.getByStatus(status)
      const orcamentoMaiorValor = orcamentoByStatus?.sort((a,b) => a.valorTotal - b.valorTotal)
      setOrcamento(orcamentoMaiorValor)
    } else if(ordenacao === "Menor valor" && !status) {
      const orcamentoMaiorValor = orcamento?.sort((a,b) => a.valorTotal - b.valorTotal)
      setOrcamento(orcamentoMaiorValor)
    }

    if(status === "" && ordenacao === "") {
      getOrcamentos()
    }
    setisOpen(false)
  }

  useEffect(() => {
    getOrcamentos()
  },[])
  
  function showModal() {
    setisOpen(true)
  }

  async function searchOrcamento() {
    if(!tituloOrcamento.trim() && !clienteOrcamento.trim() ) {
      getOrcamentos()
    }
    const orcamentoSearch =  orcamento?.filter(item => item.titulo.includes(tituloOrcamento)) 
    setOrcamento(orcamentoSearch)
  }

  useEffect(() => {
    searchOrcamento()
  },[tituloOrcamento])
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if(!fontsLoaded) {
    return <Text>Deu ruim</Text>
  }
  
  return (
    <View style={{flex: 1,  paddingTop: 54, backgroundColor: "#FFFFFF"}}>
      <Header>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Orçamento</Text>
          <Text style={styles.subTitle}>{`Você tem ${orcamento?.length} items em rascunho`}</Text>
        </View>
        <Button 
          name="add" 
          title="Novo"
          width={100}
          color="#6A46EB"
          colorIcon="#fff"
          onPress={() => navigation.navigate("orcamento")}
        />
      </Header>
      <Search 
        showModal={showModal} 
        buscar={searchOrcamento}
        value={tituloOrcamento}
        onChangeText={setTituloOrcamento}
      />
    
      <View>
        <FlatList
          data={orcamento}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Orcamento
              id={item.id}
              titulo={item.titulo}
              cliente={item.cliente}
              status={item.status}
              valorDesconto={item.valorDesconto}
              valorTotal={item.valorTotal}
              onPress={() => navigation.navigate("detalheorcamento", {id: item.id})}
            />
          )}
          ListEmptyComponent={() => <Text style={styles.empaty}>Nenhum item aqui.</Text>}
        />
      </View>
     <BottomModal visible={isOpen} onClose={() => setisOpen(false) } height={600} >
      <ScrollView>

        <View style={styles.headerFiltro}>
          <Text style={{
            fontFamily: "Lato_700Bold",
            fontSize: 14,
            // color: "#676767"
          }}>
            Filtrar e ordenar
          </Text>
          <MaterialIcons 
            name="close"
            size={32} 
            onPress={() => {
              setisOpen(false)
              setStatus("")
              setOrdenacao("")
            }} 
          />
        </View>

        <View>
          <Text style={{fontFamily: "Lato_700Regular", fontSize: 14,paddingLeft: 12, color:"#676767"}}>Status</Text>
          {statusOptions.map(item => (
            <View
              key={item}
              style={{
                padding: 5,
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

        <View style={{marginTop: 10}}>
          <Text style={{fontFamily: "Lato_700Regular", fontSize: 14,paddingLeft: 12, color:"#676767"}}>Ordenação</Text>
          {ordenacaoOptions.map(item => (
            <View
              key={item}
              style={{
                padding: 5,
                width: 170,
                flexDirection: "row",
                alignItems: "center",
  
                gap: 8
              }}
            >
              <CheckBox
                value={ordenacao === item}
                onValueChange={() => setOrdenacao(item)}
                tintColors={{ true: '#6A46EB', false: '#999' }}
              />
              <Text style={{fontSize: 14, fontFamily: "Lato_700Regular", fontWeight: 700, color: "#4A4A4A"}}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.submit}>
          <Button 
            title="Resetar Filtros"
            color="#FAFAFA"
            colorIcon="#6A46EB"
            width={150}
            onPress={() => {
              setStatus("")
              setOrdenacao("")
              
            }}
          />
          <Button 
            title="Aplicar"
            name="check"
            color="#6A46EB" 
            colorIcon="#FAFAFA" 
            width={120}
            onPress={filtro}
          />
        </View>
      </ScrollView>
    </BottomModal>

    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {

  },
  title: {
    fontFamily: "Lato_700Bold",
    fontSize: 20,
    marginBottom: 5,
    color: "#6A46EB"
  },
  subTitle: {
    fontFamily: "Lato_400Bold",
    color: "#676767"
  },
   empaty: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center"
  },
  headerFiltro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 14,
  },
  submit: {
    flex: 1,
    marginTop: 25,
    borderTopWidth: 2,
    borderTopColor: "#F0F0F0",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  }

})