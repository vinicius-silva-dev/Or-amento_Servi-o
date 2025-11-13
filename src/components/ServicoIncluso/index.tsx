import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Button } from "../Button";

type Props = {
  isName?: boolean
}

export function ServicosInculos({isName}: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.servico}>

        <View>
          <Text style={styles.title}>Design de Interfaces</Text>
          <Text style={styles.subtitle}>Criação de wireframe</Text>
        </View>

        <View>
          <Text>
            {"R$ "}
            <Text style={styles.title}>3.847,50</Text>
          </Text>
          <Text style={{textAlign: "right"}}>Qt: 1</Text>
        </View>
        {
          isName && <MaterialIcons name="border-color" size={20} color={"#6A46EB"} style={{marginLeft: 10}}/>
        }
        
      </View>
      
    </View>
  )
}