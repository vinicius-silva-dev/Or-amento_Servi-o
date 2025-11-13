export type RootStackParamList = {
   home: undefined
   orcamento: undefined
   detalhe_orcamento: {id: string}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}