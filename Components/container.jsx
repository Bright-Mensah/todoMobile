import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import helper from "../helpers";
import { SECONDARY } from "./Colors";
import BottomSheet from "./BottomSheet";
import ActionBtn from "./ActionBtn";
import TextEntry from "./TextEntry";
import Notification from "./Notification";
import service from "../Service";
import ModalLoading from "./ModalLoading";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigationState } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const Container = ({ todo, refresh }) => {
  const [viewTask, setViewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [navigateToHome, setNavigateToHome] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const navigation = useNavigation();

  // Get the current route name
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];

    return route.name;
  });

  useEffect(() => {}, [currentRouteName]); // Empty effect to re-render on route change

  const data = [
    { label: "Completed", value: "completed" },
    { label: "Not Started", value: "not started" },
    { label: "In Progress", value: "in progress" },
  ];

  const [taskData, setTaskData] = React.useState({
    title: "",
    details: "",
  });

  const handleViewTask = (task) => {
    setTaskData(task);
    setViewTask(true);
  };

  const handleEditTask = (task) => {
    setTaskData(task);
    setEditTask(true);
  };

  const handleDeleteTask = (task) => {
    if (showPrompt) return; // Prevent multiple prompts

    setMessage("Are you sure you want to delete task?");
    setShowPrompt(true);

    const confirmDelete = () => {
      setShowPrompt(false);
      setLoading(true);

      const sendz = {
        url: `api/todos/${task.id}`,
        methodType: "DELETE",
      };

      service
        .postData(sendz)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          switch (response.status) {
            case "success":
              setTimeout(() => {
                setIcon("checkmark-circle");
                setTitle("Success");
                setMessage(response.message);
                setShowNotification(true);
              }, 800);
              refresh(true); // Refresh parent component
              break;

            case "error":
              setIcon("close-circle");
              setTitle("Error");
              setMessage(response.message);
              setShowNotification(true);
              break;

            default:
              break;
          }
        })
        .catch(() => {
          setIcon("close-circle");
          setTitle("Error");
          setMessage("An error occurred");
          setShowNotification(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    setConfirmAction(() => confirmDelete); // Set confirmation action
  };

  const updateTask = () => {
    setMessage("Are you sure you want to update task?");
    setShowPrompt(true);

    const confirmUpdate = () => {
      setShowPrompt(false);
      setLoading(true);

      const sendz = {
        title: taskData.title,
        details: taskData.details,
        status: taskData.status,
        url: `api/todos/${taskData.id}`,
        methodType: "PUT",
      };

      service
        .postData(sendz)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          switch (response.status) {
            case "success":
              setEditTask(false);
              setTimeout(() => {
                setIcon("checkmark-circle");
                setTitle("Success");
                setMessage(response.message);
                setShowNotification(true);
              }, 800);
              refresh(true);

              break;

            case "error":
              setIcon("close-circle");
              setTitle("Error");
              setMessage(response.message);
              setShowNotification(true);
              break;

            default:
              break;
          }
        })
        .catch(() => {
          setIcon("close-circle");
          setTitle("Error");
          setMessage("An error occured");
          setShowNotification(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    setConfirmAction(() => confirmUpdate);
  };

  const handleRestoreTask = (task) => {
    setMessage("Are you sure you want to restore task?");
    setShowPrompt(true);

    const confirmRestore = () => {
      setShowPrompt(false);
      setLoading(true);

      const sendz = {
        url: `api/todos/restore/${task.id}`,
      };

      service
        .getData(sendz)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);

          switch (response.status) {
            case "success":
              setIcon("checkmark-circle");
              setTitle("Success");
              setMessage(response.message);
              setShowNotification(true);
              setNavigateToHome(true);

              break;

            case "error":
              setIcon("close-circle");

              setTitle("Error");
              setMessage(response.message);
              setShowNotification(true);
              break;

            default:
              break;
          }
        })
        .catch(() => {
          setIcon("close-circle");
          setTitle("Error");
          setMessage("An error occured");
          setShowNotification(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    setConfirmAction(() => confirmRestore);
  };

  const handleDeletePermanently = (task) => {
    setMessage("Are you sure you want to delete task permanently?");
    setShowPrompt(true);

    const confirmDelete = () => {
      setShowPrompt(false);
      setLoading(true);

      const sendz = {
        url: `api/todos/delete-perm/${task.id}`,
        methodType: "DELETE",
      };

      service
        .postData(sendz)
        .then((response) => {
          console.log("rr ", response);
          setTimeout(() => {
            setLoading(false);
          }, 500);

          switch (response.status) {
            case "success":
              setIcon("checkmark-circle");
              setTitle("Success");
              setMessage(response.message);
              setShowNotification(true);
              setNavigateToHome(true);
              break;

            case "error":
              setIcon("close-circle");
              setTitle("Error");
              setMessage(response.message);
              setShowNotification(true);
              break;

            default:
              break;
          }
        })
        .catch(() => {
          setIcon("close-circle");
          setTitle("Error");
          setMessage("An error occured");
          setShowNotification(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    setConfirmAction(() => confirmDelete);
  };

  // Render each task item in the FlatList

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoContent}>
        <View style={styles.todoTextContainer}>
          <Text style={styles.todoText}>{item.title}</Text>
          <Text style={styles.todoDetails}>
            {helper.truncateText(item.details, 30)}
          </Text>
        </View>
        <View style={styles.todoActions}>
          {currentRouteName !== "Bin" && (
            <ActionBtn
              action={() => handleViewTask(item)} // View task
              body={
                <>
                  <Ionicons name="eye" size={20} />
                </>
              }
              style={styles.actionButton}
            />
          )}

          {currentRouteName != "Bin" && (
            <ActionBtn
              action={() => handleEditTask(item)} // Edit task
              body={
                <>
                  <Ionicons name="pencil" size={20} />
                </>
              }
              style={styles.actionButton}
            />
          )}

          {currentRouteName === "Bin" && (
            <ActionBtn
              action={() => handleRestoreTask(item)} // Restore task
              body={
                <>
                  <Ionicons name="refresh" size={20} />
                </>
              }
            />
          )}

          {/* show trash icon when route is not Bin */}
          {currentRouteName !== "Bin" && (
            <ActionBtn
              action={() => handleDeleteTask(item)} // Delete task
              body={
                <>
                  <Ionicons name="trash" size={20} />
                </>
              }
              style={styles.actionButton}
            />
          )}

          {currentRouteName === "Bin" && (
            <ActionBtn
              action={() => handleDeletePermanently(item)} // Delete task permanently
              body={
                <>
                  <Ionicons name="trash" size={20} />
                </>
              }
              style={styles.actionButton}
            />
          )}
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );

  if (todo.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        {currentRouteName !== "Bin" ? (
          <Text style={styles.emptyText}>Task is empty</Text>
        ) : (
          <Text style={styles.emptyText}>Bin is empty</Text>
        )}
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={todo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <BottomSheet
        show={viewTask}
        close={() => setViewTask(false)}
        body={
          <>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                height: 450,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
              >
                {taskData.title}
              </Text>

              <Text style={{ fontSize: 16 }}>{taskData.details}</Text>
            </View>
          </>
        }
      />

      <BottomSheet
        header={"Edit Task"}
        show={editTask}
        close={() => setEditTask(false)}
        body={
          <>
            <View
              style={{
                height: 550,
              }}
            >
              <TextEntry
                label={"Title"}
                required
                value={taskData.title}
                onChange={(text) =>
                  setTaskData((prev) => ({ ...prev, title: text }))
                }
              />

              <TextEntry
                label={"Details"}
                required
                multiline
                value={taskData.details}
                onChange={(text) =>
                  setTaskData((prev) => ({ ...prev, details: text }))
                }
              />

              <View style={styles.dropdown}>
                <Text style={styles.label}>Status</Text>
                <Dropdown
                  data={data}
                  value={taskData.status}
                  onChange={(item) => {
                    setTaskData((prev) => ({ ...prev, status: item.value }));
                  }}
                  labelField="label"
                  valueField="value"
                  placeholder="Status"
                />
              </View>

              <ActionBtn title="Save" styles={styles.btn} action={updateTask} />
            </View>
          </>
        }
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

      <Notification
        visible={showPrompt}
        title="Confirm Action"
        message={message}
        icon="warning"
        type="prompt"
        primaryAction={{ label: "Yes", onPress: confirmAction }}
        secondaryAction={{ label: "No", onPress: () => setShowPrompt(false) }}
      />

      <ModalLoading visible={loading} />
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  todoItem: {
    // marginBottom: 10,
  },
  todoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoDetails: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  todoActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    marginRight: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: SECONDARY,
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    backgroundColor: "#4A3780",

    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  dropdown: {
    marginTop: 30,
  },

  label: {
    marginBottom: 10,
  },
});
