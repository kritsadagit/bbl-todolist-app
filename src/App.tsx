import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MMKVLoader, useMMKVStorage} from "react-native-mmkv-storage";

interface Todo {
  id: number;
  label: string;
  mark: number;
}

const App = () => {
  const [input, setInput] = useState<string>("");
  const [todolist, setTodoList] = useState<Todo[]>([]);

  const MMKV = new MMKVLoader().initialize();

  useEffect(() => {
    if (todolist.length === 0) {
      const mmkvStorage = MMKV.getArray("todolist");
      console.log("mmkvStorage: ", mmkvStorage);
      if (mmkvStorage) {
        setTodoList(mmkvStorage as Todo[]);
      }
    }
  }, []);

  useEffect(() => {
    if (todolist != undefined) {
      console.log("todo ", todolist);
      MMKV.setArray("todolist", todolist);

      const mmkvStorage = MMKV.getArray("todolist");
      console.log("mmkvStorage: ", mmkvStorage);
    }
  }, [todolist]);

  const onHandleAdd = () => {
    const itemTodo = {
      id: todolist.length + 1,
      label: input,
      mark: 0,
    };
    setTodoList(prev => [itemTodo, ...prev]);
    setInput("");
  };

  const onHandleDelete = (id: number) => {
    const updatedTodo = todolist.filter(item => item.id !== id);
    setTodoList(updatedTodo);
  };

  const onHandleMark = (item: Todo, index: number) => {
    const updatedTodos = todolist.map(todo => (todo.id === item.id ? {...todo, mark: todo.mark === 1 ? 0 : 1} : todo));

    setTodoList(updatedTodos);
  };

  const renderTodoList = ({item, index}: {item: Todo; index: number}) => (
    <View
      style={{
        width: wp("100%"),
        padding: wp("4%"),
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", gap: wp("2%")}}>
        <TouchableOpacity
          style={{
            backgroundColor: item.mark === 0 ? "lightgrey" : "lightgreen",
            padding: wp("2%"),
            borderRadius: wp("100%"),
          }}
          onPress={() => onHandleMark(item, index)}>
          <Text>{item.mark === 0 ? "Mark" : "Done"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onHandleDelete(item.id)}
          style={{
            backgroundColor: "red",
            padding: wp("2%"),
            borderRadius: wp("100%"),
          }}>
          <Text style={{color: "white"}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>To-Do List</Text>
      </View>
      <View style={styles.rowInput}>
        <TextInput value={input} onChangeText={setInput} style={styles.input} />
        <TouchableOpacity onPress={onHandleAdd} style={styles.button}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: hp("2%")}}>
        <FlatList data={todolist} renderItem={renderTodoList} keyExtractor={(_, index) => index.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentTitle: {
    paddingVertical: hp("2%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
  },
  rowInput: {
    flexDirection: "row",
    gap: wp("5%"),
    alignItems: "center",
  },
  input: {
    borderRadius: wp("4%"),
    backgroundColor: "lightgrey",
    width: wp("70%"),
    fontSize: wp("5%"),
  },
  label: {
    fontSize: wp("5%"),
  },
  button: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("5%"),
    backgroundColor: "lightblue",
    borderRadius: wp("100%"),
  },
});

export default App;
