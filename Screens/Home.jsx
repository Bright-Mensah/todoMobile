import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  BLACK,
  BORDER,
  GRAY,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../Components/Colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../Components/BottomSheet";
import service from "../Service";
import Container from "../Components/container";
import ActionBtn from "../Components/ActionBtn";
import ModalLoading from "../Components/ModalLoading";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-paper";
import Notification from "../Components/Notification";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [deletedTodo, setDeletedTodo] = useState([]);

  const [filters] = useState({
    filterBy: {
      "Not Started": "not started",
      Completed: "completed",
      "In Progress": "in progress",
    },

    sortBy: {
      "Created At": "created_at",
      Title: "title",
      Status: "status",
    },

    sortDirection: {
      Ascending: "asc",
      Descending: "desc",
    },
  });
  const [refresh, setRefresh] = useState(false);

  const isFocused = useIsFocused();

  const [byStatusSwitch, setByStatusSwitch] = useState("not started");

  const onToggleByStatusSwitch = (value) => {
    setByStatusSwitch((prevState) => (prevState == value ? null : value));
  };

  const [sortBySwitch, setSortBySwitch] = useState("created_at");

  const onToggleSortyBySwitch = (value) => {
    setSortBySwitch((prevState) => (prevState == value ? null : value));
  };

  const [sortDirectionSwitch, setSortDirectionSwitch] = useState("asc");

  const onToggleSortyDirectionSwitch = (value) => {
    setSortDirectionSwitch((prevState) => (prevState == value ? null : value));
  };

  const navigation = useNavigation();

  const fetchTask = () => {
    setLoading(true);

    const sendz = {
      url: "api/todos",
      params: new URLSearchParams({
        status: "not started",
        search: "",
        sort_by: "created_at",
        sort_direction: "asc",
      }).toString(),
    };

    service
      .getData(sendz)
      .then((response) => {
        switch (response.status) {
          case "success":
            setTodoData(response.data);
            break;

          case "error":
            setMessage(response.message);
            setShowNotification(true);

            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured");
        setShowNotification(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch tasks and deleted tasks when screen is focused or refreshed
  React.useEffect(() => {
    fetchTask(); // Re-fetch tasks when refreshed or screen is focused

    if (refresh || isFocused) {
      fetchTask();
      fetchDeletedTodos();
      setRefresh(false); // Reset the refresh flag to false after fetching
    }
  }, [refresh, isFocused]);

  // Re-fetch tasks when search term changes

  React.useEffect(() => {
    const sendz = {
      url: "api/todos",
      params: new URLSearchParams({
        status: byStatusSwitch ?? "",
        search: search,
        sort_by: sortBySwitch ?? "",
        sort_direction: sortDirectionSwitch ?? "",
      }).toString(),
    };

    service
      .getData(sendz)
      .then((response) => {
        switch (response.status) {
          case "success":
            setTodoData(response.data);
            break;

          case "error":
            setMessage(response.message);
            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured");
        setShowNotification(true);
      });
  }, [search]);

  const handleApplyFilter = () => {
    if (byStatusSwitch == null) {
      setMessage("Select a filter to filter by status.");
      setShowNotification(true);
      return;
    }
    if (sortBySwitch == null) {
      setMessage("Select a filter to sort by");
      setShowNotification(true);
      return;
    }
    if (sortDirectionSwitch == null) {
      setMessage("Select a filter for sorting direction.");
      setShowNotification(true);
      return;
    }
    setLoading(true);

    const sendz = {
      url: "api/todos",
      params: new URLSearchParams({
        status: byStatusSwitch ?? "",
        sort_by: sortBySwitch ?? "",
        sort_direction: sortDirectionSwitch ?? "",
      }).toString(),
    };

    service
      .getData(sendz)
      .then((response) => {
        setLoading(false);
        switch (response.status) {
          case "success":
            setShowModal(false);
            setTodoData(response.data);
            break;

          case "error":
            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured");
        setShowNotification(true);
      });
  };

  const getrefreshValue = (data) => {
    console.log("refresh value", data);
    if (data) setRefresh(true);
  };

  const handleSearch = () => {
    const sendz = {
      url: "api/todos",
      params: new URLSearchParams({
        status: byStatusSwitch ?? "",
        search: search,
        sort_by: sortBySwitch ?? "",
        sort_direction: sortDirectionSwitch ?? "",
      }).toString(),
    };

    service
      .getData(sendz)
      .then((response) => {
        switch (response.status) {
          case "success":
            setTodoData(response.data);
            break;

          case "error":
            setMessage(response.message);
            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured");
        setShowNotification(true);
      });
  };

  const fetchDeletedTodos = () => {
    setLoading(true);
    const sendz = {
      url: "api/todos/deleted",
    };

    service
      .getData(sendz)
      .then((response) => {
        console.log("deletedTodo ", response);
        setLoading(false);
        switch (response.status) {
          case "success":
            setDeletedTodo(response.data);
            break;

          case "error":
            setMessage(response.message);
            setShowNotification(true);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        setMessage("An error occured");
        setShowNotification(true);
      });
  };

  return (
    <Fragment>
      <Header title="Todo List" />
      <View style={styles.container}>
        {/* search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search todo..."
            value={search}
            onChangeText={(text) => setSearch(text)}
          ></TextInput>

          <ActionBtn
            body={
              <>
                <Ionicons
                  name="search"
                  size={30}
                  color={BLACK}
                  style={styles.seachIcon}
                />
              </>
            }
            action={handleSearch}
          />
        </View>

        {/* filter  */}
        <View style={styles.filters}>
          <Text>Filter</Text>

          <ActionBtn
            action={() => setShowModal(true)}
            body={
              <>
                <Ionicons name="filter" size={20} />
              </>
            }
          />
        </View>
        <View style={{ height: 250 }}>
          <Container todo={todoData} refresh={getrefreshValue} />
        </View>
        {/* container */}

        <View style={styles.fab}>
          <ActionBtn
            body={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add" color={WHITE} size={20} />
                <Text style={[styles.btnText, { marginLeft: 5 }]}>
                  Add New Task
                </Text>
              </View>
            }
            styles={styles.addBtn}
            action={() => navigation.navigate("AddTask")}
          />
          {deletedTodo.length > 0 && (
            <ActionBtn
              body={
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="trash" color={WHITE} size={20} />
                  <Text style={[styles.btnText, { marginLeft: 5, width: 80 }]}>
                    Bin
                  </Text>
                </View>
              }
              styles={styles.binBtn}
              action={() => navigation.navigate("Bin")}
            />
          )}
        </View>
      </View>

      <BottomSheet
        header={"Filter"}
        show={showModal}
        close={() => setShowModal(false)}
        body={
          <>
            <Text style={styles.sectionTitle}>By Status</Text>
            <FlatList
              data={Object.entries(filters.filterBy)}
              renderItem={({ item }) => {
                const [key, value] = item; // Destructure to get key and value

                return (
                  <View style={styles.menu}>
                    <Text style={styles.options}>{key}</Text>
                    <Switch
                      value={byStatusSwitch === value}
                      onValueChange={() => onToggleByStatusSwitch(value)}
                    />
                  </View>
                );
              }}
            />

            <Text style={styles.sectionTitle}>Sort By</Text>

            <FlatList
              data={Object.entries(filters.sortBy)}
              renderItem={({ item }) => {
                const [key, value] = item; // Destructure to get key and value

                return (
                  <View style={styles.menu}>
                    <Text style={styles.options}>{key}</Text>
                    <Switch
                      value={sortBySwitch === value}
                      onValueChange={() => onToggleSortyBySwitch(value)}
                    />
                  </View>
                );
              }}
            />
            <Text style={styles.sectionTitle}>Sort Direction</Text>

            <FlatList
              data={Object.entries(filters.sortDirection)}
              renderItem={({ item }) => {
                const [key, value] = item; // Destructure to get key and value

                return (
                  <View style={styles.menu}>
                    <Text style={styles.options}>{key}</Text>
                    <Switch
                      value={sortDirectionSwitch === value}
                      onValueChange={() => onToggleSortyDirectionSwitch(value)}
                    />
                  </View>
                );
              }}
            />

            {/* Apply Button */}
            <ActionBtn
              title="Apply"
              styles={styles.actionBtn}
              action={handleApplyFilter}
            />
          </>
        }
      />
      <ModalLoading visible={loading} />
      <Notification
        visible={showNotification}
        message={message}
        close={() => setShowNotification(false)}
      />
    </Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 30,
  },
  search: {
    backgroundColor: WHITE,
    width: 350,
    padding: 15,
    borderRadius: 5,
    borderColor: GRAY,
    borderWidth: 1,
  },
  seachIcon: {
    backgroundColor: GRAY,
    padding: 10,
    width: 50,
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 30,
  },
  fab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
    marginTop: 10,
    marginBottom: 50,
  },
  addBtn: {
    backgroundColor: PRIMARY,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  binBtn: {
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    color: WHITE,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 10,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  applyButton: {
    backgroundColor: "#4F73FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  actionBtn: {
    backgroundColor: PRIMARY,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
