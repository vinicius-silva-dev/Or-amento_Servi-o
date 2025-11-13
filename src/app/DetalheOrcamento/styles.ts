import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
    marginBottom: 34,
  },
  title: {
    fontFamily: "Lato_400Bold",
    fontSize: 14,
    fontWeight: 700
  },
  titleHeader: {
    fontFamily: "Lato_700Bold",
    fontSize: 20,
    width: "80%"
    // color: "#676767"
  },

  card: {
    flex: 1,
    // width: 350,
    
    marginRight: 20,
    marginLeft: 20,
    // backgroundColor: "#FAFAFA",
    borderWidth: 1.5,
    borderColor: "#F0F0F0",
    borderRadius: 10
  },
  cardHeader: {
    // width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subtotal: {
    flexDirection: "row",
    
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  containerDesconto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 10
  },

  desconto: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    height: 30,
    width: "20%",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E6E5E5",
    paddingHorizontal: 10,
  },
  inputDesconto: {
    flex: 1,
    fontFamily: "Lato_400Bold",
    fontSize: 16,
    color: "#333",
    textAlignVertical: "center",
    // borderWidth: 2,
    paddingVertical: 0,
  },
  valorTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 10,
  },
  bottons: {
    // flex: 1,
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    // borderWidth: 1
    
  }
})