import { Header } from "@/components/Header";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import CheckBox from '@react-native-community/checkbox';
import { Text, TextInput, View, ScrollView } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Status } from "@/components/Status";
import { ServicosInculos } from "@/components/ServicoIncluso";
import { Button } from "@/components/Button";

const status = ["Rascunho", "Aprovado", "Enviado", "Recusado"]

export function Orcamento({ navigation }: StackRoutesProps<"orcamento">) {
  const [isChecked, setIsChecked] = useState(false);

  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Deu ruim</Text>;
  }

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
            <TextInput style={styles.input} placeholder="Título" />
            <TextInput style={styles.input} placeholder="Cliente" />
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
            {status.map(item => (
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
          <ServicosInculos isName/>
          <ServicosInculos isName/>
          <View style={{ marginLeft: 30, marginBottom: 20 }}>
            <Button
              title="Adicionar Serviço"
              name="add"
              width={300}
              color="#FAFAFA"
              colorIcon="#6A46EB"
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
    </View>
  );
}
