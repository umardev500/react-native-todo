import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface TaskProps {
  text: string
}

function Task({ text }: TaskProps) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square} />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.circular} />
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    backgroundColor: 'rgba(85, 188, 246, 0.4)',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  itemText: {
    marginLeft: 15,
  },
  circular: {
    width: 13,
    height: 13,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#55BCF6',
  },
})
