import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Routes } from '@/routes';

import 'react-native-reanimated';


export default function App() {

  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes/>
    </GestureHandlerRootView>
  ) 
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
 
//   },
// })
