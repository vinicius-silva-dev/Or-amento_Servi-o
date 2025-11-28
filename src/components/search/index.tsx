import { TextInputAndroidProps, TextInputProps, View } from "react-native";
import { Input } from "../Input";
import { ButtonIcon } from "../ButtonIcon";
import { styles } from "./styles";
import { OrcamenProps } from "../Orcamento";

type Props = TextInputProps &{
  showModal: () => void
  buscar: () => void
}


export function Search({showModal, buscar, ...rest}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.busca}>
        <Input
          placeholder="Título ou cliente"
          name="search"
          buscar={buscar}
          {...rest}
        />  
        <ButtonIcon 
          name="tune"
          width={60}
          height={60}
          size={28}
          color="#6A46EB"
          onPress={showModal}
        />
      </View>
    </View>
  )
}