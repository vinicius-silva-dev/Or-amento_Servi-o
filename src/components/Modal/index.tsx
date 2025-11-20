import BottomSheet from "@gorhom/bottom-sheet";
import { View, Text, Animated, Modal, TouchableWithoutFeedback } from "react-native";
import { styles } from "./styles";
import { useEffect, useMemo, useRef } from "react";

type BottomModalProps = {
  visible: boolean,
  onClose: () => void
  children: React.ReactNode
  height: number 
}

export function BottomModal({visible, onClose, children, height}: BottomModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // sobe de 300px para o topo
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 6,
          transform: [{ translateY }],
        }}
      >
        {children}
      </Animated.View>
    </Modal>
  )
}