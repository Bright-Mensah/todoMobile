import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Fragment } from "react";
import Header from "../Components/Header";
import TextEntry from "../Components/TextEntry";
import ActionBtn from "../Components/ActionBtn";
import ModalLoading from "../Components/ModalLoading";
import Notification from "../Components/Notification";
import service from "../Service";

const AddTask = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [showNotification, setShowNotification] = React.useState(false);
  const [taskDetails, setTaskDetails] = React.useState({
    title: "",
    details: "",
  });

  const handleAddTask = () => {
    if (taskDetails.title == "") {
      setMessage("Title is required");
      setShowNotification(true);
      return;
    }

    if (taskDetails.details == "") {
      setMessage("Details is required");
      setShowNotification(true);
      return;
    }

    setLoading(true);

    const sendz = {
      title: taskDetails.title,
      details: taskDetails.details,
      url: "api/todos",
      status: "not started",
      methodType: "POST",
    };

    service
      .postData(sendz)
      .then((response) => {
        setLoading(false);
        console.log(response);
        switch (response.status) {
          case "success":
            setTaskDetails({
              title: "",
              details: "",
            });
            setTimeout(() => {
              setMessage(response.message);
              setShowNotification(true);
            }, 500);
            break;

          case "error":
            setMessage(response.message);
            setShowNotification(true);
            break;

          default:
            setTimeout(() => {
              setMessage(response.error);
              setShowNotification(true);
            }, 500);
            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured.please try again");
        setShowNotification(true);
      });
  };
  return (
    <Fragment>
      <Header title="Add Task" showBackIcon navigation={navigation} />
      <View style={{ marginHorizontal: 20 }}>
        <TextEntry
          label={"Title"}
          required
          value={taskDetails.title}
          onChange={(text) =>
            setTaskDetails((prev) => ({ ...prev, title: text }))
          }
        />
        <TextEntry
          label={"Details"}
          required
          multiline
          numberOfLines={4}
          value={taskDetails.details}
          onChange={(text) =>
            setTaskDetails((prev) => ({ ...prev, details: text }))
          }
        />

        <ActionBtn title="Save" styles={styles.btn} action={handleAddTask} />
      </View>

      <ModalLoading visible={loading} />
      <Notification
        visible={showNotification}
        message={message}
        close={() => setShowNotification(false)}
      />
    </Fragment>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    backgroundColor: "#4A3780",

    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
});
