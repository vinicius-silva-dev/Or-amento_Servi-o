import { TouchableOpacityProps, View, Text, TouchableOpacity } from "react-native";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Status } from "../Status";
import { styles } from "./styles";
import { OrcamentoStatus } from "@/types/orcamentoStatus";


export type OrcamenProps = TouchableOpacityProps & {
  id: string
  title: string
  client: string
  status: string
  valor: string
}

export function Orcamento({title, client, status, valor, ...rest}: OrcamenProps) {
   const [fontsLoaded] = useFonts({
      Lato_400Regular,
      Lato_700Bold,
    });
  
    if(!fontsLoaded) {
      return <Text>Deu ruim</Text>
    }
  return (
    <TouchableOpacity style= {styles.container} {...rest} >
      <View style={styles.card}>
        <View style={styles.tilteStatus}>
          <Text style={{
            width: 200,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Lato_700Bold",
          }}>{title}</Text>
          <Status status={status}/>
        </View>
        <View style={styles.clientValor}>
          <Text style={{fontSize: 14, fontWeight: 400, color: "#4A4A4A",fontFamily: "Lato_400Bold",}}>{client}</Text>
          <Text style={{
            fontSize: 12,
            fontWeight: 400,
            color: "#4A4A4A",
            fontFamily: "Lato_400Bold"
            }}
          >
            {"R$"} <Text style={{fontSize: 16, fontWeight: 700,fontFamily: "Lato_700Bold", color: "#0F0F0F"}}>{valor}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}