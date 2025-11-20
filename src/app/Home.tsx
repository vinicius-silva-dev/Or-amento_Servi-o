import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

import { BottomModal } from "@/components/Modal";
import {OrcamenProps, Orcamento} from "@/components/Orcamento"
import { Search } from "@/components/search";
import { Status } from "@/components/Status";

import { StackRoutesProps } from "@/routes/StackRoutes";

import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";

import {useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

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

const status = ["Rascunho", "Aprovado", "Enviado", "Recusado"]
const ordenacao = ["Mais recente", "Mais antigo", "Maior valor", "Menor valor"]

export function Home({navigation}: StackRoutesProps<"home">) {
  const [orcamento, setOrcamento] = useState<OrcamenProps[]>()
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if(!fontsLoaded) {
    return <Text>Deu ruim</Text>
  }
  const items = 1
  function showModal() {
    setisOpen(true)
  }
  
  return (
    <View style={{flex: 1,  paddingTop: 54, backgroundColor: "#FFFFFF"}}>
      <Header>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Orçamento</Text>
          <Text style={styles.subTitle}>{`Você tem ${items} items em rascunho`}</Text>
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
      <Search showModal={showModal}/>
    
      <View>
        <FlatList
          data={orcamento}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Orcamento
              id={item.id}
              title={item.title}
              client={item.client}
              status={item.status}
              valor={`${item.valor}`}
              onPress={() => navigation.navigate("detalheorcamento", {id: item.id})}
            />
          )}
          ListEmptyComponent={() => <Text style={styles.empaty}>Nenhum item aqui.</Text>}
        />
      </View>
     <BottomModal visible={isOpen} onClose={() => setisOpen(false)} height={600} >
      <ScrollView>

        <View style={styles.headerFiltro}>
          <Text style={{
            fontFamily: "Lato_700Bold",
            fontSize: 14,
            // color: "#676767"
          }}>
            Filtrar e ordenar
          </Text>
          <MaterialIcons name="close" size={32} onPress={() => setisOpen(false)} />
        </View>

        <View>
          <Text style={{fontFamily: "Lato_700Regular", fontSize: 14,paddingLeft: 12, color:"#676767"}}>Status</Text>
          {status.map(item => (
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
                value={isChecked}
                onValueChange={setIsChecked}
                tintColors={{ true: '#6A46EB', false: '#999' }}
              />
              <Status status={item} />
            </View>
          ))}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{fontFamily: "Lato_700Regular", fontSize: 14,paddingLeft: 12, color:"#676767"}}>Ordenação</Text>
          {ordenacao.map(item => (
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
                value={isChecked}
                onValueChange={setIsChecked}
                tintColors={{ true: '#6A46EB', false: '#999' }}
              />
              <Text style={{fontSize: 14, fontFamily: "Lato_700Regular", fontWeight: 700, color: "#4A4A4A"}}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.submit}>
          <Button title="Resetar Filtros" color="#FAFAFA" colorIcon="#6A46EB" width={150}/>
          <Button title="Aplicar" name="check" color="#6A46EB" colorIcon="#FAFAFA" width={120}/>
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