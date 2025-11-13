import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import {OrcamenProps, Orcamento} from "@/components/Orcamento"
import { Search } from "@/components/search";

import { StackRoutesProps } from "@/routes/StackRoutes";

import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import BottomSheet from "@gorhom/bottom-sheet";

import { useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, Button as RNButton } from "react-native";

const Item = [
  {
    id: "service-1",
    title: "Desenvolvimento de aplicativo de loja online",
    client: "Gima Jaru",
    status: "Aprovado",
    valor: "3.000,00",
  },
  {
    id: "service-2",
    title: "Criação de conteúdo",
    client: "Loja Bella",
    status: "Rascunho",
    valor: "4.000,00",
  },
  {
    id: "service-3",
    title: "Serviço de SEO",
    client: "Gima Jaru",
    status: "Enviado",
    valor: "3.500,00",
  },
  {
    id: "service-4",
    title: "Gestão de redes sociais",
    client: "Social Exprerts",
    status: "Recusado",
    valor: "2.500,00",
  },
]
export function Home({navigation}: StackRoutesProps<"home">) {
  const [orcamento, setOrcamento] = useState<OrcamenProps[]>()
  const bottomSheetRef = useRef<BottomSheet>(null);

   // Alturas possíveis (snap points)
  const snapPoints = useMemo(() => ["30%", "80%"], []);
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if(!fontsLoaded) {
    return <Text>Deu ruim</Text>
  }
  const items = 1
  function showModal() {
    console.log("Abrir modal")
    bottomSheetRef.current?.expand()
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
          data={Item}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // <- começa fechado
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "red" }}
        enablePanDownToClose
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Funcionando 🎉</Text>
        </View>
        {/* <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Lato_700Bold",
              fontSize: 16,
              color: "#6A46EB",
            }}
          >
            Filtros e ordenação
          </Text>
        </View> */}
      </BottomSheet>
   
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
  }

})