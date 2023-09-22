import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import IconFont from "react-native-vector-icons/Fontisto";

import CustChild from "./card-customer-child";

const mapStateToProps = (state) => {
  return state;
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const cardStatus = (props) => {
  const [child, setChild] = useState(false);
  // console.log('ini bosque',Object.keys(props.data.customer))
  // console.log('ini bosque',props.data.customer)

  /**
   * ini digunakan ketika non customer dan akan dibuat bypass checklist
   * useEffect(() => {
      checkIsNonCustomers()
    },[])

    const checkIsNonCustomers = () => {
      if(props.data.customer.toLowerCase() === 'non customer'){
        props.setIsNonCustomers(true)
      }
    }
   */
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setChild(!child)}
      >
        <Text style={textStyles.title}>{props.data.customer}</Text>
        <View style={{ flexDirection: "row" }}>
          <IconFont
            name="player-settings"
            color="#707070"
            backgroundColor="transparent"
            size={10}
            style={{ marginRight: "2%", alignSelf: "center" }}
          />
          <Text style={textStyles.subtitle}>
            {+props.data.instrument.length} Instrument
          </Text>
        </View>
      </TouchableOpacity>
      {child &&
        props.data.instrument.map((el, i) => {
          // console.log(props.data, 'INI ADALAH DATA')
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
              phone={props.data.phone}
              address={props.data.addres}
              requestTime={props.data.requestTime}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: dimHeight * 0.09,
    width: "95%",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 1,
    shadowOpacity: 0.61,
    shadowRadius: 1,
    elevation: 1,
    alignSelf: "center",
    marginBottom: 10,
  },
  date: {
    flexDirection: "row",
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "100",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});

export default connect(mapStateToProps)(cardStatus);
