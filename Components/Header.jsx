import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { PRIMARY, SECONDARY, BORDER } from "./Colors";
import { Ionicons } from "@expo/vector-icons";
import ActionBtn from "./ActionBtn";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.header}>
        {props.showBackIcon && (
          <ActionBtn
            body={
              <Ionicons name="arrow-back-circle" size={40} color={BORDER} />
            }
            styles={{ marginLeft: 20 }}
            action={() => props.navigation.goBack()}
          />
        )}
        <View style={styles.right}>
          <Image
            source={require("../assets/Ellipse1.png")}
            style={styles.imageRight}
          ></Image>
        </View>

        <View style={styles.headerContainer}>
          {/* title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    backgroundColor: PRIMARY,
    height: 300,
  },

  header: {
    zIndex: 2,
  },
  titleContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 150,
  },

  right: {
    width: "20%",
    height: 100,
  },
  imageRight: {
    // width: "20%",
    left: 290,
    height: 500,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginLeft: 20,
  },
});
