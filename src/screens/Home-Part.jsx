import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action'

const dimHeight = Dimensions.get("screen").height
const dimWidth = Dimensions.get("screen").width

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  getTaskWaiting
}

const Home = (props) => {
  // console.log('[ini selected task]', props.selectedTask.part)
  // console.log('ini juga kepanggil ==> part')
  // console.log('ini hasil kiriman dari home', props.selectedTask.part)

  //useState
  const [isEmpty, setEmpty] = useState(props.selectedTask.part.detail.length == 0)

  // console.log('isEmpty part', isEmpty)
  if (isEmpty) {
    return <View>
      {/* <Text>Kosong boss partnya</Text>
      <Text>Kosong boss partnya</Text>
      <Text>Kosong boss partnya</Text>
      <Text>Kosong boss partnya</Text>
      <Text>Kosong boss partnya</Text>
      <Text>Kosong boss partnya</Text> */}
    </View>
  } else {
    return (
      <ScrollView style={styles.container}>
        {
          props.selectedTask.part.detail.map((el, i) => {
            return (
              <View key={i} style={styles.list}>
                <Text style={textStyles.name}>{el.part}</Text>
                <Text style={textStyles.qty}>{(el.qty_approval != null ? el.qty_approval : el.qty)}</Text>
              </View>
            )
          })
        }
        {/* <Text>{JSON.stringify(props.selectedTask.part, 'utf8', 2)}</Text> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: dimWidth,
    paddingTop: dimHeight * 0.03
  },
  list: {
    marginLeft: dimWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimHeight * 0.08,
    paddingRight: dimWidth * 0.05,
    borderStyle: 'solid',
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray'
  }
})

const textStyles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "300"
  },
  qty: {
    fontSize: 16,
    color: 'gray'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
