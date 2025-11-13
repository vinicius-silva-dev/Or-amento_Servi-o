import { DetalheOrcamento } from "@/app/DetalheOrcamento/DetalheOrcamento"
import { Home } from "@/app/Home"
import { Orcamento } from "@/app/NovoOrcamento/NovoOrcamento"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

export type StackRoutesList = {
  home: undefined
  orcamento: undefined
  detalheorcamento: {id: string}
}

export type StackRoutesProps<T extends keyof StackRoutesList> = NativeStackScreenProps<StackRoutesList, T>

const Stack = createNativeStackNavigator<StackRoutesList>()
 
export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home" 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="home" component={Home}/>
      <Stack.Screen name="orcamento" component={Orcamento}/>
      <Stack.Screen name="detalheorcamento" component={DetalheOrcamento}/>
    </Stack.Navigator>
  )
}