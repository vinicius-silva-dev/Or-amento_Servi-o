import BottomSheet from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useMemo, useRef } from "react";



export function Modal() {
  const bottomSheetRef = useRef<BottomSheet>(null);

   // Alturas possíveis (snap points)
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View>
          <Text>Filtros e ordenarção</Text>
        </View>
      </BottomSheet>
    </View>
  )
}