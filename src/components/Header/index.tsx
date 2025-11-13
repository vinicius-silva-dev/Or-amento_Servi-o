import { View } from "react-native";
import { styles } from "./styles";

export function Header({children}: {children: React.ReactNode}) {
  return (
    <View
      style={styles.container}
    >
      {children}
    </View>
  )
}