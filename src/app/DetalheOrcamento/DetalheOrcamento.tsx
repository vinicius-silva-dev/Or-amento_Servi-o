import { StackRoutesProps } from "@/routes/StackRoutes";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput } from "react-native";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { styles } from "./styles";
import { Status } from "@/components/Status";
import { ServicosInculos } from "@/components/ServicoIncluso";
import { Button } from "@/components/Button";
import { ButtonIcon } from "@/components/ButtonIcon";

export function DetalheOrcamento({route, navigation }: StackRoutesProps<"detalheorcamento">) {
  const [fontsLoaded] = useFonts({
      Lato_400Regular,
      Lato_700Bold,
  });
  
  if (!fontsLoaded) {
    return <Text>Deu ruim</Text>;
  }
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
          <Text style={styles.title}>Orçamento{route.params.id}</Text>
        </View>
        <Status status="Enviado"/>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={[styles.card, {backgroundColor: "#FAFAFA"}]}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="storefront" size={30} color={"#6A46EB"} />
            <Text style={styles.titleHeader}>Desenvolvimento de aplicativo de loja online</Text>
          </View>
          <View style={{padding: 20}}>
            <View style={{marginBottom: 12}}>
              <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Cliente</Text>
              <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{`Soluções Tecnológicas Beta`}</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View >
                <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Criado em</Text>
                <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{`22/08/2025`}</Text>
              </View>
              <View style={{justifyContent: "flex-start", width: "50%"}}>
                <Text style={{fontSize: 12, color: "#676767", paddingBottom: 5}}>Atualizado em</Text>
                <Text style={{fontSize: 16, fontFamily: "Lato_700Bold"}}>{`22/08/2025`}</Text>
              </View>
            </View>

          </View>
        </View>

        <View style={[styles.card, {backgroundColor: "#FAFAFA", marginTop: 20}]}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="article" size={20} color={"#6A46EB"} />
            <Text style={{fontFamily: "Lato_400Bold", fontSize: 14}}>Serviços inclusos</Text>
          </View>
          <ServicosInculos/>
          <ServicosInculos/>
          <ServicosInculos/>
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
                {`R$ 3.847,50`}
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
                      {`5% off`}
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
                  <Text>-R$</Text>
                  <Text>{` -200,00`}</Text>
                </Text>

              </View>

              <View style={[styles.valorTotal]}>
                <Text style={{fontSize: 16, fontWeight: 700}}>Investimento total</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text>R$</Text>
                  <Text style={{fontSize: 20, fontWeight: 700}}>{` 3.847,50`}</Text>
                </View>
              </View>
              
            </View>
          </View>
        </View>
          <View style={styles.bottons}>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <View style={{flexDirection: "row", gap: 10}}>
                <ButtonIcon name="delete-outline" width={45} height={45} size={20} color="#DB4D4D"/>
                <ButtonIcon name="content-copy" width={45} height={45} size={20} color="#6A46EB"/>
                <ButtonIcon name="border-color" width={45} height={45} size={20} color="#6A46EB"/>
              </View>
              <Button title="Compartilhar" name="send" color="#6A46EB" colorIcon="#FAFAFA" width={170}/>
            </View>
          </View>
      </ScrollView>

    </View>
  )
}