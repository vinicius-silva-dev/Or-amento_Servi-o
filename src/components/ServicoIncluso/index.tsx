import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { Button } from "../Button";

export type ServicoProps = TouchableOpacityProps & {
  id: string
  titulo: string
  decricao: string
  valor: string
  quantidade: number
  isName?: boolean
  onOpenModal?: () => void
}

export function ServicosInculos({titulo, decricao, valor, quantidade, isName,onOpenModal, ...rest}: ServicoProps) {
  const valorNumber = Number(valor)
  return (
    <View style={styles.container}>

      <View style={styles.servico}>

        <View style={{marginRight: 0}}>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.subtitle}>
            {
              decricao.slice(0, 28).concat("...")
            }
          </Text>
        </View>

        <View >
          <Text >
            <Text style={styles.title}>
              {
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorNumber)
              }
            </Text>
          </Text>
          <Text style={{textAlign: "right"}}>{`Qt: ${quantidade}`}</Text>
        </View>
        <View>
          {
            isName && <MaterialIcons 
              name="border-color"
              size={20} 
              color={"#6A46EB"}
              style={{paddingLeft: 10, justifyContent: "flex-end"}}
              onPress={onOpenModal}
            />
          }
        </View>
        
      </View>
    </View>
  )
}