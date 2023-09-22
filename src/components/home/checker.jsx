
import { CheckBox } from '@rneui/themed';
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state
}

function Checker(props) {
  const [checked, setChecked] = useState(props.data.checked)

  return (
    <View style={styles.container}>
      <CheckBox
        title={props.data.name}
        checked={checked}
        onPress={() => {
          setChecked(!checked)
          props.selectPart({ name: props.data.name, checked: !checked })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    borderRadius: 2,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  title: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  listCustomer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: "#D3E6EB"
  },
  detail: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: "#0000001F"
  }
})

const textStyles = StyleSheet.create({
  customer: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps)(Checker)