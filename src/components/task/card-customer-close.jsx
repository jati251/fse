import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import IconIO from 'react-native-vector-icons/Ionicons'
import CustChild from './card-customer-close-child'

const mapStateToProps = state => {
  return state
}

const dimHeight = Dimensions.get("window").height
const dimWidth = Dimensions.get("window").width

const cardStatus = (props) => {
  const [child, setChild] = useState(false)
  // console.log('ini bosque', props.data)

  return (
    <View>
      <TouchableOpacity style={styles.container}
        onPress={() => setChild(!child)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={textStyles.title}>{props.data.customer}</Text>
          {
            child ? <IconIO
              name="ios-arrow-up"
              size={25}
              style={{ alignSelf: 'center' }}
            /> : <IconIO
              name="ios-arrow-down"
              size={25}
              style={{ alignSelf: 'center' }}
            />
          }
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={textStyles.subtitle}>{+props.data.instrument.length} Instrument</Text>
        </View>
      </TouchableOpacity>
      {
        child && props.data.instrument.map((el, i) => {
          // console.log(props.data.idService[i], 'ini id service nya hmmm')
          return (
            <CustChild
              key={i}
              el={el}
              nomer={i + 1}
              navigation={props.navigation}
              idService={props.data.idService[i]}
              customer={props.data.customer}
              serviceNumber={props.data.serviceNumber[i]}
              report={props.data.report}
              idCustomer={props.data.idCustomer[i]}
              checklist={props.data.checklist}
            />
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: dimHeight * 0.09,
    width: "95%",
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 1,
    shadowOpacity: 0.61,
    shadowRadius: 1,
    elevation: 1,
    alignSelf: 'center',
    marginBottom: 10
  },
  date: {
    flexDirection: 'row'
  }
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '100'
  },
  subtitle: {
    fontSize: 12,
    color: 'gray'
  }
})

export default connect(mapStateToProps)(cardStatus)
