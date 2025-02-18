import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  Animated,
  useAnimatedValue,
} from "react-native";
import React, {useEffect, useState} from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MMKVLoader} from "react-native-mmkv-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {BACKGROUND_COLOR, DARK_COLOR, LIGHT_COLOR, LIGHT_COLOR2, PRIMARY_COLOR} from "../styles/colors";

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
      if (mmkvStorage) {
        setTodoList(mmkvStorage as Todo[]);
      }
    }
  }, []);

  useEffect(() => {
    if (todolist != undefined) {
      MMKV.setArray("todolist", todolist);
    }
  }, [todolist]);

  const onHandleAdd = () => {
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      const todoItem: Todo = {
        id: Date.now(),
        label: trimmedInput,
        mark: 0,
      };
      setTodoList(prev => {
        prev = [todoItem, ...prev];
        return prev;
      });
      setInput("");
    }
  };

  const onHandleDelete = (id: number) => {
    setTodoList(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      const _item = [...prev];
      _item.splice(index, 1);
      return _item;
    });
  };

  const onHandleMark = (id: number) => {
    setTodoList(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      const _item = [...prev];
      _item[index] = {..._item[index], mark: _item[index].mark === 0 ? 1 : 0};
      return _item;
    });
  };

  const renderTodoList = ({item, index}: {item: Todo; index: number}) => (
    <View style={[styles.card, {marginTop: index === 0 ? hp("2%") : 0}]}>
      <View style={{flex: 1}}>
        <BouncyCheckbox
          text={item.label}
          textStyle={{
            fontWeight: "600",
            fontSize: wp("5%"),
            color: item.mark === 0 ? DARK_COLOR : LIGHT_COLOR,
            textDecorationColor: "red",
          }}
          unFillColor={BACKGROUND_COLOR}
          fillColor={PRIMARY_COLOR}
          innerIconStyle={{borderWidth: 0}}
          useNativeDriver={true}
          isChecked={item.mark === 1}
          onPress={() => onHandleMark(item.id)}
          onLongPress={() => onHandleMark(item.id)}
        />
      </View>

      <View style={{flexDirection: "row", gap: wp("2%"), justifyContent: "center", padding: wp("1%")}}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require("../assets/icons/edit.png")} style={styles.edit_icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onHandleDelete(item.id)}>
          <Image source={require("../assets/icons/trash.png")} style={styles.delete_icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#fff", alignItems: "center", paddingVertical: hp("2%")}}>
        <Text style={styles.title}>To-Do List</Text>
        <View style={styles.rowInput}>
          <TextInput value={input} onChangeText={setInput} style={styles.input} cursorColor={PRIMARY_COLOR} />
          <TouchableOpacity onPress={onHandleAdd}>
            <Image source={require("../assets/icons/add.png")} style={styles.add_icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR, width: wp("100%")}}>
        <FlatList data={todolist} renderItem={renderTodoList} keyExtractor={(_, index) => index.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: DARK_COLOR,
  },
  rowInput: {
    width: wp("100%"),
    paddingTop: wp("5%"),
    paddingHorizontal: wp("3%"),
    flexDirection: "row",
    gap: wp("2%"),
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingHorizontal: wp("3%"),
    borderRadius: wp("4%"),
    backgroundColor: LIGHT_COLOR2,
    // width: wp("70%"),
    fontSize: wp("5%"),
    fontWeight: "600",
    color: DARK_COLOR,
  },
  label: {
    fontSize: wp("5%"),
  },

  card: {
    backgroundColor: "#fff",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("5%"),
  },
  add_icon: {
    width: wp("10%"),
    height: wp("10%"),
  },
  edit_icon: {
    width: wp("5.5%"),
    height: wp("5.5%"),
  },
  delete_icon: {
    width: wp("6%"),
    height: wp("6%"),
  },
});

export default App;
