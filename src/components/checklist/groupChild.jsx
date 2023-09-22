import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DocumentPicker from "react-native-document-picker";
import CustChild from "./groupChild2";
const RNFS = require("react-native-fs");

const mapStateToProps = (state) => {
  return state;
};

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const cardStatus = (props) => {
  const [child, setChild] = useState(false);
  // console.log(props.data, 'ini datany');
  const [multipleFile, setMultipleFile] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [docFile, setDoc] = useState([]);
  const [value, setValue] = useState("");

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        // console.log('res : ' + JSON.stringify(res));
        // console.log('URI : ' + res.uri);
        // console.log('Type : ' + res.type);
        // console.log('File Name : ' + res.name);
        // console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
      let images = [];
      let docs = [];
      results.forEach((el) => {
        if (el.type.match(new RegExp("image"))) {
          images.push(el);
        } else {
          docs.push(el);
        }
      });
      setDoc(docFile.concat(docs));
      setImageFile(imageFile.concat(images));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert("Canceled from multiple doc picker");
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View>
      {props.data[1].length == 0 && (
        <View
          style={{
            minHeight: hp("30%"),
            width: wp("100%"),
            justifyContent: "space-evenly",
            backgroundColor: "#ECECEC",
            opacity: 0.7,
            marginVertical: 10,
            flex: 1,
            padding: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
              {props.data[0]}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              opacity: 1,
              borderRadius: 3,
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <TextInput
              onChangeText={(text) => setValue(text)}
              placeholder={"Input"}
              // value={value}
            />
          </View>
          <View
            style={{
              backgroundColor: "gray",
              width: "100%",
              height: 1,
              marginVertical: 15,
            }}
          />
          <ScrollView>
            {imageFile.length != 0 && (
              <Text>{imageFile.length} Images file</Text>
            )}
            {docFile.length != 0 && (
              <Text>{docFile.length} Documents file</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={{
              borderStyle: "solid",
              borderColor: "#1C87D8",
              borderWidth: 2,
              borderRadius: 3,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={selectMultipleFile.bind(this)}
          >
            <Text style={{ fontSize: 14, color: "#1C87D8" }}>
              Lampirkan File
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {props.data[1].length != 0 && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => setChild(!child)}
        >
          <Text style={textStyles.title}>{props.data[0]}</Text>
        </TouchableOpacity>
      )}
      {child &&
        props.data[1].map((el, i) => {
          return <CustChild key={i} el={el} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: dimHeight * 0.09,
    width: "100%",
    backgroundColor: "#7D7D7D",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: "center",
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
    marginBottom: dimHeight * 0.01,
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
