import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import {MaterialIcons} from "@expo/vector-icons"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
  title: string
  name?: keyof typeof MaterialIcons.glyphMap,
  width: number,
  color: string,
  colorIcon?: string
}

export function Button({name, title, width, color, colorIcon, ...rest}: Props) {
  return (
    <TouchableOpacity
      style={[
        {width, backgroundColor: color},
        styles.container
      ]} 
      activeOpacity={0.8}
      {...rest}
    >
      {
        name && <MaterialIcons name={name} size={28} color={colorIcon}/>
      }
      <Text style={[{color: colorIcon},styles.title]}>{title}</Text>
    </TouchableOpacity>
  )
}