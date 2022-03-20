import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Task from './components/Task'

function App() {
  const [task, setTask] = useState<any>()
  const [taskItems, setTaskItems] = useState<any>([])

  useEffect(() => {
    console.log('REnder')

    parseData()
  }, [])

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('tasks_Data', value)
    } catch (err) {
      console.log(err)
    }
  }

  const parseData = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks_Data')
      if (value != null) {
        setTaskItems(JSON.parse(value))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    storeData(JSON.stringify([...taskItems, task]))
    setTask('')
  }

  const completeTask = (index: number) => {
    const itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
    storeData(JSON.stringify(itemsCopy))
  }

  return (
    <View style={styles.container}>
      {/* Today tasks */}
      <ScrollView style={{ marginBottom: 95 }}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today&lsquo;s Tasks</Text>
          <Text style={styles.subTitle}>By Umar</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go */}
            {taskItems.map((item: any, index: any) => (
              <TouchableOpacity onPress={() => completeTask(index)} key={index}>
                <Task text={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Empty task */}
      {taskItems.length < 1 ? (
        <View style={styles.emptyTask}>
          <Text style={styles.emptyText}>Create your tasks</Text>
        </View>
      ) : null}

      {/* Write task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Icon name="add" size={20} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  emptyTask: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 25,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#888',
    marginBottom: 15,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 60,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    flex: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
})
