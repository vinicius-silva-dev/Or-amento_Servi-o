import { TouchableOpacityProps, View, Text, TouchableOpacity } from "react-native";
import { useFonts, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Status } from "../Status";
import { styles } from "./styles";
import { OrcamentoStatus } from "@/types/orcamentoStatus";


export type OrcamenProps = TouchableOpacityProps & {
  id: string
  titulo: string
  cliente: string
  status: string
  valorDesconto: number
  valorTotal: number
}

export function Orcamento({titulo, cliente, status, valorTotal, ...rest}: OrcamenProps) {
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
          }}>{titulo}</Text>
          <Status status={status}/>
        </View>
        <View style={styles.clientValor}>
          <Text style={{fontSize: 14, fontWeight: 400, color: "#4A4A4A",fontFamily: "Lato_400Bold",}}>{cliente}</Text>
          <Text style={{
            fontSize: 12,
            fontWeight: 400,
            color: "#4A4A4A",
            fontFamily: "Lato_400Bold"
            }}
          >
            <Text style={{fontSize: 16, fontWeight: 700,fontFamily: "Lato_700Bold", color: "#0F0F0F"}}>
              {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorTotal)
              }
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}