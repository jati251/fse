import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import IconCustomer from "../../assets/svg/customer";
import IconParts from "../../assets/svg/parts";
import IconFollow from "../../assets/svg/follower";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { setSelectedTask } from "../../stores/action";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import IconFA from "react-native-vector-icons/FontAwesome";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setSelectedTask,
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const dateFormat = (param) => {
  let z = param.split("/");
  let y = [z[1]].concat(z[0]).concat(z[2]).join("/");
  return y;
};

function CardTask(props) {
  console.log("ini tsk waiting dari server", props.task);
  // console.log('ini di task format waiting cuy', Object.keys(props.task))
  // console.log('ini di task format waiting cuy =>>', props.task)
  // console.log('ini di task format waiting cuy =>>', props.task.customers[0].is_phone)
  const [isPhone, setPhone] = useState(props.task.customers[0].is_phone);

  if (props.task.is_customer) {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('ini propstasknya bosqueeee', props.task)
          props.setSelectedTask(props.task);
          props.nav.navigate("TaskWaiting");
        }}
        style={styles.container}
      >
        {/* <Text>{JSON.stringify(props.task, 'utf8', 2)}</Text> */}
        <View style={styles.title}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 5, fontSize: 16, fontWeight: "bold" }}>
              Task{" "}
              {props.nomer.toString().length < 2
                ? `0${props.nomer}`
                : props.nomer}
            </Text>
            {isPhone && <IconMat name="phone" size={16} />}
          </View>
          <Text style={{ fontSize: 14, color: "gray" }}>
            {props.task.create_date}
          </Text>
        </View>
        <View style={styles.listCustomer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconCustomer />
            </View>
            <Text style={textStyles.customer}>
              {props.task.sum_customers} Customers
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconParts />
            </View>
            <Text style={textStyles.customer}>{props.task.parts} Parts</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconFollow />
            </View>
            <Text style={textStyles.customer}>
              {props.task.followers} Followers
            </Text>
          </View>
        </View>
        <View style={styles.detail}>
          <View>
            <Text style={textStyles.location}>Location</Text>
            <View style={{ flexDirection: "row" }}>
              {props.task.locations.departure_trans == 1 && (
                <IconFA
                  name="car"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 2 && (
                <IconFA5
                  name="car-side"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 3 && (
                <IconFA5
                  name="bus-alt"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 4 && (
                <IconFA5
                  name="train"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 5 && (
                <IconMat
                  name="flight-land"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 6 && (
                <IconFA5
                  name="motorcycle"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == null && (
                <IconFA5
                  name="walking"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              <Text style={{ ...textStyles.date, textTransform: "capitalize" }}>
                {props.task.locations.departure.length < 12
                  ? props.task.locations.departure
                  : props.task.locations.departure.substr(0, 9) + "..."}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {props.task.locations.departure_trans == 1 && (
                <IconFA
                  name="car"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 2 && (
                <IconFA5
                  name="car-side"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 3 && (
                <IconFA5
                  name="bus-alt"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 4 && (
                <IconFA5
                  name="train"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 5 && (
                <IconMat
                  name="flight-takeoff"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 6 && (
                <IconFA5
                  name="motorcycle"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == null && (
                <IconFA5
                  name="walking"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              <Text style={{ ...textStyles.date, textTransform: "capitalize" }}>
                {props.task.locations.destination.length < 12
                  ? props.task.locations.destination
                  : props.task.locations.destination.substr(0, 9) + "..."}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#A2A2A2",
              height: "75%",
              width: 1,
              alignSelf: "flex-end",
              marginHorizontal: 20,
              opacity: 0.7,
            }}
          ></View>
          <View>
            <Text style={textStyles.location}>Schedule</Text>
            <View style={{ flexDirection: "row" }}>
              {props.task.locations.departure_trans == 1 && (
                <IconFA
                  name="car"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 2 && (
                <IconFA5
                  name="car-side"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 3 && (
                <IconFA5
                  name="bus-alt"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 4 && (
                <IconFA5
                  name="train"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 5 && (
                <IconMat
                  name="flight-land"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 6 && (
                <IconFA5
                  name="motorcycle"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == null && (
                <IconFA5
                  name="walking"
                  color="green"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              <Text style={textStyles.date}>
                {moment(new Date(dateFormat(props.task.start_date)))
                  .format("dddd")
                  .substring(0, 3)}
                , {props.task.start_date}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {props.task.locations.departure_trans == 1 && (
                <IconFA
                  name="car"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 2 && (
                <IconFA5
                  name="car-side"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 3 && (
                <IconFA5
                  name="bus-alt"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 4 && (
                <IconFA5
                  name="train"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 5 && (
                <IconMat
                  name="flight-takeoff"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == 6 && (
                <IconFA5
                  name="motorcycle"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              {props.task.locations.departure_trans == null && (
                <IconFA5
                  name="walking"
                  color="blue"
                  backgroundColor="transparent"
                  size={23}
                  style={{ marginRight: "5%", opacity: 0.7 }}
                />
              )}
              <Text style={textStyles.date}>
                {" "}
                {moment(new Date(dateFormat(props.task.finish_date)))
                  .format("dddd")
                  .substring(0, 3)}
                , {props.task.finish_date}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          props.setSelectedTask(props.task);
          props.nav.navigate("TaskWaiting");
        }}
        style={styles.container}
      >
        {/* <Text>{JSON.stringify(props.task, 'utf8', 2)}</Text> */}
        <View style={styles.title}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 5, fontSize: 16, fontWeight: "bold" }}>
              Task{" "}
              {props.nomer.toString().length < 2
                ? `0${props.nomer}`
                : props.nomer}
            </Text>
            {isPhone && <IconMat name="phone" size={16} />}
          </View>
          <Text style={{ fontSize: 14, color: "gray" }}>
            {props.task.create_date}
          </Text>
        </View>
        <View style={styles.listCustomer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconCustomer />
            </View>
            <Text style={textStyles.customer}>
              {props.task.sum_customers} Customers
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconParts />
            </View>
            <Text style={textStyles.customer}>{props.task.parts} Parts</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignSelf: "center", marginRight: 5 }}>
              <IconFollow />
            </View>
            <Text style={textStyles.customer}>
              {props.task.followers} Followers
            </Text>
          </View>
        </View>
        <View style={styles.detailnonCustomer}>
          <Text> Non Customer </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxHeight: dimHeight * 0.3,
    width: "100%",
    flexDirection: "column",
    paddingVertical: 10,
    borderRadius: 2,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  listCustomer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#D3E6EB",
  },
  detail: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: "#0000001F",
  },
  detailnonCustomer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#0000001F",
    paddingVertical: 15,
  },
});

const textStyles = StyleSheet.create({
  customer: {
    fontSize: 12,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTask);
