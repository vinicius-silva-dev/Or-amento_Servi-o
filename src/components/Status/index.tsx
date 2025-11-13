import { MaterialIcons } from "@expo/vector-icons"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { OrcamentoStatus } from "@/types/orcamentoStatus"


type Props = {
  status: string
}
// #30752F
export function Status({status}: Props) {

  return (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: status === "Aprovado" ? "#BFF7BE" :
            status === "Rascunho" ? "#E6E5E5" :
            status === "Enviado" ? "#CEEFFF" : "#FFD6D6"
        }
      ]}
    >
      
      <MaterialIcons 
        name="circle" size={10}
        color={
          status === "Aprovado" ? "#30752F" :
            status === "Rascunho" ? "#676767" :
            status === "Enviado" ? "#1D7096" : "#9E4949" 
        }
      />
      <Text 
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: status === "Aprovado" ? "#30752F" :
            status === "Rascunho" ? "#676767" :
            status === "Enviado" ? "#1D7096" : "#9E4949"
        }}
      >
        {status}
      </Text>
    </View>
  )
}