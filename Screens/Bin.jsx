import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import service from "../Service";
import Header from "../Components/Header";
import Container from "../Components/container";
import ModalLoading from "../Components/ModalLoading";
import Notification from "../Components/Notification";

const Bin = ({ navigation }) => {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    fetchDeletedTodos();
  }, []);

  const fetchDeletedTodos = () => {
    setLoading(true);
    const sendz = {
      url: "api/todos/deleted",
    };

    service
      .getData(sendz)
      .then((response) => {
        setLoading(false);
        switch (response.status) {
          case "success":
            setTodoData(response.data);

            break;

          case "error":
            setIcon("close-circle");
            setTitle("Error");
            setMessage("An error occured");
            setShowNotification(true);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        setTitle("Error");
        setMessage("An error occured");
        setShowNotification(true);
      });
  };
  return (
    <View>
      <Header title="Recycle Bin" showBackIcon navigation={navigation} />
      <Container todo={todoData} />
      <ModalLoading visible={loading} />
      <Notification
        visible={showNotification}
        close={() => setShowNotification(false)}
      />
      <Notification
        visible={showNotification}
        title={title}
        message={message}
        icon={icon}
        type="notification"
        close={() => {
          if (navigateToHome) {
            navigation.navigate("Home");
            setShowNotification(false);
          } else {
            setShowNotification(false);
          }
        }}
      />
    </View>
  );
};

export default Bin;

const styles = StyleSheet.create({});
