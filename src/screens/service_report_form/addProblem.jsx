import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  AsyncStorage,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";

import IconEv from "react-native-vector-icons/EvilIcons";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconFa from "react-native-vector-icons/FontAwesome";
import IconSim from "react-native-vector-icons/SimpleLineIcons";
import DocumentPicker from "react-native-document-picker";
import Header from "../../components/home/header";

import { dirPictures } from "../../helpers/savePicture";
import { setReportService, setPending } from "../../stores/action";

const moment = require("moment");
const RNFS = require("react-native-fs");

const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPictures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            // console.log('FILE MOVED', filePath, newFilepath);
            resolve(true);
          })
          .catch((error) => {
            // console.log('moveFile error', error);
            reject(error);
          });
      })
      .catch((err) => {
        // console.log('mkdir error', err);
        reject(err);
      });
  });
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setReportService,
  setPending,
};

const addProblem = (props) => {
  const [modalDone, setModalDone] = useState(false);
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [observed, sertObserved] = useState("");
  const [multipleFile, setMultipleFile] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [docFile, setDoc] = useState([]);
  const [allAttachment, setAllAttachment] = useState(null);

  const selectMultipleFileDoc = async () => {
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
      setDoc(docFile.concat(results));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectMultipleFileImage = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
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
      setImageFile(imageFile.concat(results));

      setMultipleFile(results);
      // let images = []
      // let docs = []
      // results.forEach(el => {
      //     if (el.type.match(new RegExp('image'))) {
      //         images.push(el)
      //     } else {
      //         docs.push(el)
      //     }
      // })
      // setDoc(docFile.concat(docs))
      // setImageFile(imageFile.concat(images))
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

  const deleteImage = async (param) => {
    let data = imageFile;
    let wantedData = data.filter((el) => el !== param);
    setImageFile(wantedData);
  };

  const deleteDoc = async (param) => {
    let data = docFile;
    let wantedData = data.filter((el) => el !== param);
    setDoc(wantedData);
  };

  const saveImage = async (filePath) => {
    try {
      // set new image name and filepath
      const newImageName = `${moment().format("DDMMYY_HHmmSSS")}.jpg`;
      const newFilepath = `${dirPictures}/${newImageName}`;
      // move and save image to new filepath
      const imageMoved = await moveAttachment(filePath, newFilepath);
      // console.log('image moved', imageMoved);
    } catch (error) {
      console.error(error);
    }
  };

  const _saveAll = function () {
    imageFile.forEach((el) => {
      saveImage(el.uri);
    });
  };

  const _setBase64 = async (param) => {
    let newPic = param.map(async (pic) => {
      // console.log('ini pic',pic)
      pic.base64 = await RNFS.readFile(pic.uri, "base64");
      let type = pic.name.split(".");
      pic.type = type[type.length - 1];
      return pic;
    });
    return await Promise.all(newPic);
  };

  async function next() {
    try {
      let base64Image = await _setBase64(imageFile);
      let base64Doc = await _setBase64(docFile);
      await props.setReportService("problem", problem);
      await props.setReportService("solution", solution);
      await props.setReportService("observed", observed);
      await props.setReportService("problemattachment", {
        pictures: JSON.stringify(base64Image),
        documents: JSON.stringify(base64Doc),
      });

      props.navigation.navigate("PartScreen");
    } catch (error) {
      console.error(error);
    }
  }

  async function pending() {
    try {
      await props.setReportService("status", "6");
      await props.setReportService("problem", problem);
      await props.setReportService("solution", solution);
      await props.setReportService("observed", observed);
      // console.log('ini all attachment',allAttachment)
      await props.setReportService("problemattachment", {
        pictures: imageFile,
        documents: docFile,
      });
      props.navigation.navigate("PartScreen");
      await props.setPending({
        instrument: props.selectedInstrument,
        problem: problem,
        solution: solution,
      });
      AsyncStorage.setItem(
        "pending-task",
        JSON.stringify(
          props.instrumentPending.concat([
            {
              instrument: props.selectedInstrument,
              problem: problem,
              solution: solution,
            },
          ])
        )
      );
    } catch (error) {}
  }
  return (
    <KeyboardAvoidingView behaviour={("padding", "position")} enabled>
      <View style={viewStyles.container}>
        <Header navigation={props.navigation} title={"Service Report Form"} />
        <View style={viewStyles.content}>
          <ScrollView>
            <Text style={textStyles.problem}> Problem </Text>
            <TextInput
              placeholder={"Type problem here"}
              style={viewStyles.problemInput}
              multiline={true}
              onChangeText={(text) => setProblem(text)}
              value={problem}
            />
            <ScrollView style={viewStyles.attachment}>
              {imageFile.length != 0 && (
                <View>
                  <Text style={{ marginBottom: 30 }}>Image Attachment</Text>
                  {imageFile.map((el, i) => {
                    return (
                      <View style={{ flexDirection: "row" }} key={i}>
                        <Image
                          style={{ width: 40, height: 40, marginRight: 20 }}
                          source={{ uri: el.uri }}
                        />
                        {/* <Text>{JSON.stringify(el.uri)}</Text> */}
                        <View style={{ flexGrow: 1 }}>
                          <Text style={{ fontSize: 19 }}>
                            {el.name.substring(0, 20)}...
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            deleteImage(el);
                          }}
                        >
                          <IconMCI
                            name="do-not-disturb"
                            size={20}
                            color="rgba(248, 93, 93, 1)"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
              {docFile.length != 0 && (
                <View style={{ marginTop: 20 }}>
                  <Text style={{ marginBottom: 30 }}>File Attachment</Text>
                  {docFile.map((el, i) => {
                    return (
                      <View style={{ flexDirection: "row" }} key={i}>
                        <IconSim
                          name="doc"
                          size={22}
                          style={{ marginRight: 20 }}
                        />
                        <View style={{ flexGrow: 1 }}>
                          <Text style={{ fontSize: 19 }}>
                            {el.name.substring(0, 20)}...
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            deleteDoc(el);
                          }}
                        >
                          <IconMCI
                            name="do-not-disturb"
                            size={20}
                            color="rgba(248, 93, 93, 1)"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
            <Text style={textStyles.problem}> Solution </Text>
            <TextInput
              placeholder={"Type solution here"}
              style={viewStyles.problemInput}
              multiline={true}
              onChangeText={(text) => setSolution(text)}
              value={solution}
            />
            <Text style={textStyles.problem}> Observation </Text>
            <TextInput
              placeholder={"Type Observation here"}
              style={viewStyles.problemInput}
              multiline={true}
              onChangeText={(text) => sertObserved(text)}
              value={observed}
            />
          </ScrollView>

          {problem.length != 0 && solution.length != 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#F9A602",
                padding: 5,
                borderRadius: 3,
                marginRight: wp("20%"),
                marginTop: hp("20%"),
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: "42.5%",
                bottom: "2%",
              }}
              onPress={() => setModalDone(!modalDone)}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  alignSelf: "center",
                }}
              >
                {" "}
                Pending Task{" "}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: "#8e9490",
                padding: 5,
                borderRadius: 3,
                marginRight: wp("20%"),
                marginTop: hp("20%"),
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: "42.5%",
                bottom: "2%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  alignSelf: "center",
                }}
              >
                {" "}
                Pending Task{" "}
              </Text>
            </View>
          )}
          <Modal
            animationType="none"
            transparent={true}
            visible={modalDone}
            onRequestClose={() => {
              setModalDone(!modalDone);
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                backgroundColor: "rgba(100,100,100, 0.5)",
                padding: 20,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  width: wp("70%"),
                  height: hp("25%"),
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    width: "100%",
                    paddingLeft: "5%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginBottom: 20,
                    }}
                  >
                    {" "}
                    Pending Instrument Report ?{" "}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flex: 1,
                    width: "100%",
                    flexDirection: "row",
                    paddingRight: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => setModalDone(!modalDone)}>
                    <Text
                      style={{
                        color: "#299BE8",
                        fontWeight: "bold",
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                  <View style={{ margin: 20 }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalDone(!modalDone);
                      pending();
                    }}
                  >
                    <Text
                      style={{
                        color: "#299BE8",
                        fontWeight: "bold",
                      }}
                    >
                      YES
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableWithoutFeedback
            onPress={() => this.RBSheet.open()}
            style={viewStyles.addAttachment}
          >
            <View style={viewStyles.addAttachment}>
              <IconEv name={"paperclip"} size={36} color={"white"} />
            </View>
          </TouchableWithoutFeedback>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={180}
            animationType={"fade"}
            closeOnDragDown={true}
            duration={250}
          >
            <View style={viewStyles.bottomSheet}>
              <TouchableOpacity onPress={selectMultipleFileDoc.bind(this)}>
                <View style={viewStyles.iconSheet}>
                  <IconMCI
                    name={"file-document-outline"}
                    size={40}
                    color={"white"}
                  />
                </View>
                <Text style={textStyles.bottomSheetText}>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectMultipleFileImage.bind(this)}>
                <View style={viewStyles.iconSheet}>
                  <IconFa name={"image"} size={40} color={"white"} />
                </View>
                <Text style={textStyles.bottomSheetText}> Image </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>

        <View style={viewStyles.bottomBar}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={textStyles.next}>PREVIOUS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => next()}>
            <Text style={textStyles.next}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    height: hp("97%"),
  },
  content: {
    flex: 7,
    padding: 10,
  },
  bottomBar: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  problemInput: {
    minHeight: hp("5%"),
    maxHeight: hp("25%"),
    borderBottomWidth: 1,
    borderBottomColor: "#353535",
    opacity: 0.6,
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addAttachment: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    borderBottomRightRadius: 0,
    backgroundColor: "steelblue",
    alignItems: "center",
    justifyContent: "center",
    left: "85%",
    top: "90%",
  },
  bottomSheet: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconSheet: {
    backgroundColor: "skyblue",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  attachment: {
    // minHeight: hp('40%'),
    width: "100%",
    marginVertical: 15,
    paddingTop: 25,
  },
});

const textStyles = StyleSheet.create({
  next: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#707070",
  },
  problem: {
    paddingVertical: 5,
    color: "#707070",
  },
  bottomSheetText: {
    width: 60,
    marginHorizontal: 20,
    textAlign: "center",
    justifyContent: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(addProblem);
