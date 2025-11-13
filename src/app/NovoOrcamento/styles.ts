import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
    color: "#676767"
  },
  card: {
    width: 360,
    // padding: 14,
    marginLeft: 30,
    marginBottom: 30,
    // backgroundColor: "#FAFAFA",
    borderWidth: 1.5,
    borderColor: "#F0F0F0",
    borderRadius: 10
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    fontFamily: "Lato_400Bold",
    fontSize: 18,
    color: "#333",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E6E5E5",
    paddingHorizontal: 20,
  },
  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  containerDesconto: {
    flexDirection: "row",
    // justifyContent: 
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
    padding: 10
  },
  submit: {
    flex: 1,
    // marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#F0F0F0",
    padding: 40,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12
  }
})