import { TextInput, TextInputProps, View } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import { styles } from "./styles";

type Props = TextInputProps & {
  name?: undefined | keyof typeof MaterialIcons.glyphMap
}

export function Input({name,...rest}: Props) {
  return (
    <View style={styles.container}>
      {
        name && <MaterialIcons name={name} size={28} style={styles.icon} color="#4A4A4A" />
      }
      <TextInput
        {...rest}
        style={styles.input}
        placeholderTextColor="#74798B"
      />
    </View>
  )
}