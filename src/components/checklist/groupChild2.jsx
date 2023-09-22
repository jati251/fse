import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import CustChild from './card-customer-child'
import DocumentPicker from "react-native-document-picker";
const RNFS = require("react-native-fs");

const mapStateToProps = (state) => {
  return state;
};

const cardStatus = (props) => {
  const [multipleFile, setMultipleFile] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [docFile, setDoc] = useState([]);

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
          {props.el.nameParent}
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
          // onChangeText={text => console.log(text)}
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
        {/*Showing the data of selected Multiple files*/}
        {/* {
          multipleFile.length != 0 && multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))
        } */}
        {imageFile.length != 0 && <Text>{imageFile.length} Images file</Text>}
        {docFile.length != 0 && <Text>{docFile.length} Documents file</Text>}
      </ScrollView>
      <TouchableOpacity
        onPress={selectMultipleFile.bind(this)}
        style={{
          borderStyle: "solid",
          borderColor: "#1C87D8",
          borderWidth: 2,
          borderRadius: 3,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, color: "#1C87D8" }}>Attach File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps)(cardStatus);
