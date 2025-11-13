import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import {MaterialIcons} from "@expo/vector-icons"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
  name: keyof typeof MaterialIcons.glyphMap,
  width: number
  height: number
  size: number
  color: string
}

export function ButtonIcon({name, width, height, size, color,...rest}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, {width, height}]} 
      activeOpacity={0.8}
      {...rest}
    >
      <MaterialIcons name={name} size={size} color={color}/>
    </TouchableOpacity>
  )
}