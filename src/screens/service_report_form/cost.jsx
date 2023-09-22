import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import IconFa from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import Header from "../../components/home/header";
import rupiah from "../../helpers/rupiah";
import { setReportService } from "../../stores/action";

const Cost = (props) => {
  // console.log('ini service report dari cost', props.serviceReport)
  function laborTime() {
    return props.serviceReport.laborTime;
  }
  function travelTime() {
    return Number(props.serviceReport.travelTime);
  }
  function totalTime() {
    let finishDate = new Date(props.serviceReport.finishTimeInstrument);
    let startDate = new Date(props.serviceReport.startTimeInstrument);
    let diffMin = (finishDate - startDate) / 60000;
    let diffHour = Math.round(diffMin / 60);
    return diffHour;
  }
  function setTravelTime() {
    let finishDate = new Date(props.selectedTask.finishDate);
    let startDate = new Date(props.selectedTask.startDate);
    let diffMin = (finishDate - startDate) / 60000;
    let diffHour = diffMin / 60;
    let diffDay = diffHour / 24;
    return diffDay;
  }
  function totalPartPrice() {
    // console.log('ini mau diiutng harga totalnya',props.serviceReport.part)
    let data = props.serviceReport.part;
    let totalPrice = 0;

    data.forEach((el) => {
      totalPrice += el.totalPrice;
    });
    return totalPrice;
  }
  function discount() {
    let percentage = props.serviceReport.persenDiscount;
    let discountTotal = (totalPartPrice() * percentage) / 100;

    return discountTotal;
  }
  function subTotal() {
    return totalPartPrice() - discount();
  }
  function tax() {
    let percentage = props.serviceReport.persenTax;
    return (subTotal() * percentage) / 100;
  }
  function totalCost() {
    return subTotal() + tax();
  }
  async function next() {
    try {
      await props.setReportService("sumTotalReal", totalPartPrice());
      await props.setReportService("sumDiscount", discount());
      await props.setReportService("travelTime", travelTime());
      await props.setReportService("subTotal", subTotal());
      await props.setReportService("totalTime", totalTime());
      await props.setReportService("sumTax", tax());
      await props.setReportService("sumTotalFinish", totalCost());
      // console.log('ini service report yang setelah diisi isi',props.serviceReport)
      props.navigation.navigate("ServiceEngineerScreen");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log('ini props selected Tasknya~~', props.selectedTask)
  // console.log('ini service report di cost-nya',props.serviceReport)

  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      behaviour={("padding", "position")}
      enabled
    >
      <Header navigation={props.navigation} title={"Service Report Form"} />
      <View style={viewStyles.content}>
        {/* <Text>{JSON.stringify(props.selectedInstrument, 'utf8', 2)}</Text> */}
        <View style={viewStyles.headerTitle}>
          <IconFa name={"shopping-cart"} size={25} color={"#333335"} />
          <Text style={textStyles.titleText}> Cost Summary</Text>
          <Text style={{ ...textStyles.titleText, fontWeight: "bold" }}>
            {" "}
            {props.selectedInstrument.data.merk} -{" "}
            {props.selectedInstrument.data.type}
          </Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Part Total</Text>
          <Text style={textStyles.value}>
            {rupiah(totalPartPrice(), "Rp.")}
          </Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Discount</Text>
          <Text style={textStyles.value}>{rupiah(discount(), "Rp.")}</Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Labor Time</Text>
          <Text style={textStyles.value}> {laborTime()} Hour </Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Travel Time</Text>
          <Text style={textStyles.value}>{travelTime()} Hour </Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Total Time</Text>
          <Text style={textStyles.value}>{totalTime()} Hour </Text>
        </View>
        <View style={viewStyles.hr} />
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Sub Total</Text>
          <Text style={textStyles.value}>{rupiah(subTotal(), "Rp.")}</Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>PPN 10%</Text>
          <Text style={textStyles.value}>{rupiah(tax(), "Rp.")}</Text>
        </View>
        <View style={viewStyles.wraper}>
          <Text style={textStyles.key}>Total Cost</Text>
          <Text style={textStyles.value}>{rupiah(totalCost(), "Rp.")}</Text>
        </View>
      </View>
      <View style={viewStyles.bottomBar}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={textStyles.next}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => next()}>
          <Text style={textStyles.next}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    height: hp("97%"),
    flex: 1,
  },
  content: {
    flex: 7,
    padding: 10,
    backgroundColor: "#fff",
  },
  bottomBar: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerTitle: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  hr: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  wraper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});

const textStyles = StyleSheet.create({
  next: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#707070",
  },
  key: {
    margin: 5,
    padding: 3,
    fontSize: 16,
    color: "gray",
  },
  value: {
    margin: 5,
    padding: 3,
    fontSize: 16,
    fontWeight: "bold",
  },
  titleText: {
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  // fetchData
  setReportService,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cost);
