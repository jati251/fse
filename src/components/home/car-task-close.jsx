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
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import IconFA from "react-native-vector-icons/FontAwesome";
import { setSelectedTask } from "../../stores/action";
// import moment from "moment";
import Popover from "react-native-popover-view";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setSelectedTask,
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function CardTask(props) {
  // console.log('ini adalah yang masuk ke task complete', Object.keys(props.task))
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [data, setData] = useState("");
  let checker = true;
  let phone = false;
  if (props.task.ppd && props.task.ppd.detail.length) {
    checker = props.task.ppd.detail.length == 0;
  }
  if (props.task.detail) {
    phone = props.task.detail[0].isPhone;
  }
  const [isPhone, setIsPhone] = useState(phone);
  const [isEmpty, setEmpty] = useState(checker);

  useEffect(() => {
    dataWanted();
  }, [props.task]);

  const dataWanted = () => {
    let data = {};
    if (props.task) {
      props.task.detail.forEach((element) => {
        if (!data[element.nameCustomer]) {
          // console.log(element.instrument_merk, 'ini mereknya');
          data[element.nameCustomer] = {
            instrument: [
              {
                merk: element.instrument[0].merk,
                type: element.instrument[0].type,
                sn: element.instrument[0].sn,
              },
            ],
          };
        } else {
          data[element.nameCustomer].instrument.push({
            merk: element.instrument[0].merk,
            type: element.instrument[0].type,
            sn: element.instrument[0].sn,
          });
        }
      });
    }
    setData(data);
  };

  // return(
  //   <View>
  //     <Text>
  //       {JSON.stringify(data)}
  //     </Text>
  //   </View>
  // )
  if (props.task && props.task.isCustomer) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setPopoverVisible(!popoverVisible);
          }}
          style={styles.container}
        >
          <View style={styles.title}>
            <View style={{ flexDirection: "row" }}>
              {props.nomer && (
                <Text
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Task{" "}
                  {props.nomer.toString().length < 2
                    ? `0${props.nomer}`
                    : props.nomer}
                </Text>
              )}
              {isPhone && <IconMat name="phone" size={16} />}
            </View>
            <Text style={{ fontSize: 14, color: "gray" }}>
              {props.task.startDate}
            </Text>
          </View>
          <View style={styles.listCustomer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconCustomer />
              </View>
              <Text style={textStyles.customer}>
                {Object.keys(data).length} Customers
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconParts />
              </View>
              <Text style={textStyles.customer}>
                {props.task.part.detail.length} Parts
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconFollow />
              </View>
              {props.task.ppd && props.task.ppd.detail.length ? (
                <Text style={textStyles.customer}>
                  {isEmpty ? 0 : props.task.ppd.detail[0].followers.length}{" "}
                  Followers
                </Text>
              ) : (
                <Text style={textStyles.customer}>0 Followers</Text>
              )}
            </View>
          </View>
          <View style={styles.detail}>
            <View>
              <Text style={textStyles.location}>Location</Text>
              {isEmpty == false && (
                <View style={{ flexDirection: "row" }}>
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 1 && (
                      <IconFA
                        name="car"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 2 && (
                      <IconFA5
                        name="car-side"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 3 && (
                      <IconFA5
                        name="bus-alt"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 4 && (
                      <IconFA5
                        name="train"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 5 && (
                      <IconMat
                        name="flight-land"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 6 && (
                      <IconFA5
                        name="motorcycle"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve ==
                      null && (
                      <IconFA5
                        name="walking"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd && props.task.ppd.detail.length && (
                    <Text
                      style={{
                        ...textStyles.date,
                        textTransform: "capitalize",
                      }}
                    >
                      {props.task.ppd.detail[0].placeOfDeparture.length < 12
                        ? props.task.ppd.detail[0].placeOfDeparture
                        : props.task.ppd.detail[0].placeOfDeparture.substr(
                            0,
                            9
                          ) + "..."}
                    </Text>
                  )}
                </View>
              )}
              {isEmpty == false && (
                <View style={{ flexDirection: "row" }}>
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 1 && (
                      <IconFA
                        name="car"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 2 && (
                      <IconFA5
                        name="car-side"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 3 && (
                      <IconFA5
                        name="bus-alt"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 4 && (
                      <IconFA5
                        name="train"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 5 && (
                      <IconMat
                        name="flight-takeoff"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 6 && (
                      <IconFA5
                        name="motorcycle"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve ==
                      null && (
                      <IconFA5
                        name="walking"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd && props.task.ppd.detail.length && (
                    <Text
                      style={{
                        ...textStyles.date,
                        textTransform: "capitalize",
                      }}
                    >
                      {props.task.ppd.detail[0].destination.length < 12
                        ? props.task.ppd.detail[0].destination
                        : props.task.ppd.detail[0].destination.substr(0, 9) +
                          "..."}
                    </Text>
                  )}
                </View>
              )}
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
            />
            <View>
              <Text style={textStyles.location}>Schedule</Text>
              {isEmpty == false && (
                <View style={{ flexDirection: "row" }}>
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 1 && (
                      <IconFA
                        name="car"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 2 && (
                      <IconFA5
                        name="car-side"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 3 && (
                      <IconFA5
                        name="bus-alt"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 4 && (
                      <IconFA5
                        name="train"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 5 && (
                      <IconMat
                        name="flight-land"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 6 && (
                      <IconFA5
                        name="motorcycle"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve ==
                      null && (
                      <IconFA5
                        name="walking"
                        color="green"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  <Text style={textStyles.date}>
                    {moment(new Date(props.task.startDate))
                      .format("dddd")
                      .substring(0, 3)}
                    , {props.task.startDate}
                  </Text>
                </View>
              )}
              {isEmpty == false && (
                <View style={{ flexDirection: "row" }}>
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 1 && (
                      <IconFA
                        name="car"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 2 && (
                      <IconFA5
                        name="car-side"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 3 && (
                      <IconFA5
                        name="bus-alt"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 4 && (
                      <IconFA5
                        name="train"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 5 && (
                      <IconMat
                        name="flight-takeoff"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve == 6 && (
                      <IconFA5
                        name="motorcycle"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  {props.task.ppd &&
                    props.task.ppd.detail.length &&
                    props.task.ppd.detail[0].id_transportation_approve ==
                      null && (
                      <IconFA5
                        name="walking"
                        color="blue"
                        backgroundColor="transparent"
                        size={23}
                        style={{ marginRight: "5%", opacity: 0.7 }}
                      />
                    )}
                  <Text style={textStyles.date}>
                    {moment(new Date(props.task.finishDate))
                      .format("dddd")
                      .substring(0, 3)}
                    , {props.task.finishDate}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Popover
          isVisible={popoverVisible}
          onRequestClose={() => setPopoverVisible(false)}
        >
          {props.task &&
            props.task.detail.map((el, i) => {
              return (
                <View style={{ padding: 20 }} key={i}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>{i + 1}.</Text>
                    <Text style={{ fontWeight: "bold" }}>Customer :</Text>
                    <Text>{JSON.stringify(el.nameCustomer)}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text> </Text>
                    <Text style={{ fontWeight: "bold" }}>Instrument :</Text>
                    {/* {<Text>{JSON.stringify(el.instrument)}</Text>} */}
                    <View>
                      {el.instrument.map((el2, i) => {
                        return (
                          <Text key={i}>
                            {" "}
                            {el2.merk} - {el2.type}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}
        </Popover>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setPopoverVisible(!popoverVisible);
          }}
          style={styles.container}
        >
          <View style={styles.title}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
              >
                Task{" "}
                {props.nomer.toString().length < 2
                  ? `0${props.nomer}`
                  : props.nomer}
              </Text>
              {isPhone && <IconMat name="phone" size={16} />}
            </View>
            <Text style={{ fontSize: 14, color: "gray" }}>
              {props.task.startDate}
            </Text>
          </View>
          <View style={styles.listCustomer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconCustomer />
              </View>
              <Text style={textStyles.customer}>
                {Object.keys(data).length} Customers
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconParts />
              </View>
              <Text style={textStyles.customer}>
                {props.task.part.detail.length} Parts
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <IconFollow />
              </View>
              {props.task.ppd && props.task.ppd.detail.length ? (
                <Text style={textStyles.customer}>
                  {props.task.ppd.detail[0].followers.length} Followers
                </Text>
              ) : (
                <Text style={textStyles.customer}>0 Followers</Text>
              )}
            </View>
          </View>
          <View style={styles.detailnull}>
            <Text style={{ fontSize: 20, paddingVertical: 15, opacity: 0.6 }}>
              {" "}
              Non Customer{" "}
            </Text>
            {/* <Text> Iscustomer : { `${props.task.isCustomer}`} </Text>
            <Text> Isphone : { `${props.task.detail[0].isPhone}` } </Text> */}
            {/* <Text>{JSON.stringify(props.task, 'utf8',2)}</Text> */}
          </View>
        </TouchableOpacity>
        <Popover
          isVisible={popoverVisible}
          onRequestClose={() => setPopoverVisible(!popoverVisible)}
        >
          {props.task &&
            props.task.detail.map((el, i) => {
              return (
                <View style={{ padding: 20 }} key={i}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>{i + 1}.</Text>
                    <Text style={{ fontWeight: "bold" }}>Customer :</Text>
                    <Text>{JSON.stringify(el.nameCustomer)}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text> </Text>
                    <Text style={{ fontWeight: "bold" }}>Instrument :</Text>
                    {/* {<Text>{JSON.stringify(el.instrument)}</Text>} */}
                    <View>
                      {el.instrument.map((el2, i) => {
                        return (
                          <Text key={i}>
                            {" "}
                            {el2.merk} - {el2.type}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}
        </Popover>
      </View>
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
  detailnull: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#0000001F",
    alignItems: "center",
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
