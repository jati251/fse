// import React, { Component } from 'react';
// import {
//     Text,
//     TouchableOpacity,
//     View,
//     StyleSheet,
//     Image,
//     PermissionsAndroid,
//     Platform,
// } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs'


// export default class Example extends Component {
//     state = {
//         filePath: ''
//     };
//     constructor(props) {
//         super(props);
//     }


//     async _createBase64(path) {
//         let data = await RNFS.readFile(path, 'base64')
//         console.log('inidatanya', data);
//     }

//     _openFile(path) {
//         FileViewer.open(path)
//             .then(() => {
//                 // success
//                 this._createBase64(path)
//             })
//             .catch(error => {
//                 // error
//             });
//     }


//     askPermission() {
//         var that = this;
//         async function requestExternalWritePermission() {
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                     {
//                         title: 'CameraExample App External Storage Write Permission',
//                         message:
//                             'CameraExample App needs access to Storage data in your SD Card ',
//                     }
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     //If WRITE_EXTERNAL_STORAGE Permission is granted
//                     //changing the state to show Create PDF option
//                     that.createPDF();
//                 } else {
//                     alert('WRITE_EXTERNAL_STORAGE permission denied');
//                 }
//             } catch (err) {
//                 alert('Write permission err', err);
//                 console.warn(err);
//             }
//         }
//         //Calling the External Write permission function
//         if (Platform.OS === 'android') {
//             requestExternalWritePermission();
//         } else {
//             this.createPDF();
//         }
//     }

//     async createPDF() {
//         let options = {
//             //Content to print
//             html:
//                 `<div  style="text-align:center;" class="col-lg-12 tex-center">
//                 <div class="row">
//                   <div class="col-4">
//                     Logo
//                   </div>
//                   <div class="col-4">
//                     <h4>
//                       SERVICE REPORT
//                     </h4>
//                   </div>
//                   <div class="col-4">
//                     <label class="ml-20">
//                       committed to serve better
//                     </label> <br>
//                     <label class="ml-20">
//                       NO :
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <table width="100%">
//                   <thead>
//                     <tr>
//                       <th
//                         colspan="2"
//                         class="text-center"
//                         width="50%"
//                       >
//                         CUSTOMER DATA
//                       </th>
//                        <th colspan="4">
//                           <span class="ml-10">
//                             PROBLEM TYPE
//                           </span>                
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <!-- tr untuk customer -->
//                     <tr>
//                       <td colspan="2">
//                         <span class="ml-10">
//                           CUSTOMER
//                         </span>
//                         <div class="ml-20">
//                           {{ data.customerName }}
//                         </div>
//                       </td>
//                       <td>
//                         <span class="sp square">Instrument</span>
//                       </td>
//                       <td>
//                         <span class="sp square">Accessories</span>
//                       </td>
//                       <td colspan="2">
//                         <span class="sp square">PM</span>
//                       </td>
//                     </tr>
//                     <tr>  
//                       <td colspan="2">
//                         <span class="ml-10">
//                           ADDRESS
//                         </span>
//                         <div class="ml-20">
//                           {{ data.customerAdderss }}
//                         </div>
//                       </td>
//                       <td>
//                         <span class="sp square">Reagent</span>
//                       </td>
//                       <td>
//                         <span class="sp square">Other</span>
//                       </td>
//                       <td colspan="2">
//                         <span class="sp square">............</span>
//                       </td>
//                     </tr>
//                     <tr>  
//                       <td colspan="2">
//                         <span class="ml-10">
//                           PHONE / FAX
//                         </span>
//                         <div class="ml-20">
//                           {{ data.customerPhone }}
//                         </div>
//                         <div>
          
//                         </div>
//                       </td>
//                       <td colspan="4">
//                         <!--  -->
//                       </td>
//                     </tr>
//                     <tr>  
//                       <td valign="top">
//                         REQUESTED BY
//                         <div class="ml-20">
//                           {{ data.requestBy }}
//                         </div>
//                       </td>
//                       <td>
//                         REQUESTED TIME
//                         <div>
//                           DATE: {{ data.requestTime }}
//                         </div>
//                         <div>
//                           TIME:
//                         </div>
//                       </td>
//                       <td colspan="1" valign="top">
//                         INSTRUMENT
//                       </td>
//                       <td colspan="3" valign="top">
//                         S.W VERSION
//                       </td>
//                     </tr>
//                     <tr>  
//                       <td>
//                         STARTING TIME
//                         <div>
//                           DATE: {{ data.startingTime }}
//                         </div>
//                         <div>
//                           TIME:
//                         </div>
//                       </td>
//                       <td>
//                         FINISHING TIME
//                         <div>
//                           DATE: {{ data.finishingTime }}
//                         </div>
//                         <div>
//                           TIME:
//                         </div>
//                       </td>
//                       <td valign="top" colspan="4">
//                         <span class="ml-10">
//                           SERIAL NUMBER
//                         </span>
//                         <div class="ml-20">
//                           {{ data.serialNumber }}
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         colspan="2"
//                         valign="top"
//                       >
//                         PROBLEM
//                       </td>
//                       <td
//                         colspan="4"
//                         valign="top"
//                       >
//                         SOLUTION/ACTION
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         colspan="2"
//                         valign="top"
//                         height="25px"
//                       >
//                         <table width="100%">
//                           <tr
//                             v-for="i in data.problem"
//                             :key="i"
//                           >
//                             <td>
//                               masalah
//                             </td>
//                           </tr>
//                         </table>
//                       </td>
          
//                       <td
//                         colspan="4"
//                         valign="top"
//                         height="25px"
//                       >
//                         <table width="100%">
//                           <tr
//                             v-for="i in data.problem"
//                             :key="i"
//                           >
//                             <td>
//                               solusi
//                             </td>
//                           </tr>
//                         </table>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         colspan="2"
//                         valign="top"
//                       >
//                         OBSERVED
//                       </td>
//                       <td
//                         colspan="4"
//                         valign="top"
//                       />
//                     </tr>
//                     <tr>
//                       <td
//                         colspan="2"
//                         valign="top"
//                         height="25px"
//                       >
//                         <table width="100%">
//                           <tr
//                             v-for="i in data.problem"
//                             :key="i"
//                           >
//                             <td>
//                               observe
//                             </td>
//                           </tr>
//                         </table>
//                       </td>
//                     </tr>          
//                     <tr>
//                       <td class="text-center">
//                         PART NO
//                       </td>
//                       <td class="text-center">
//                         PART DESCRIPTION
//                       </td>
//                       <td class="text-center">
//                         TYPE
//                       </td>
//                       <td class="text-center">
//                         QTY
//                       </td>
//                       <td class="text-center">
//                         UNIT PRICE
//                       </td>
//                       <td class="text-center">
//                         TOTAL
//                       </td>
//                     </tr>
//                     <tr
//                       v-for="part in 4"
//                       :key="part"
//                     >
//                       <td              
//                         valign="top"
//                         height="25px"
//                       />
//                       <td
//                         valign="top"
//                         height="25px"
//                       />
//                       <td              
//                         valign="top"
//                         height="25px"
//                       />
//                       <td
//                         valign="top"
//                         height="25px"
//                       />
//                       <td              
//                         valign="top"
//                         height="25px"
//                       />
//                       <td
//                         valign="top"
//                         height="25px"
//                       />
//                     </tr>          
//                     <tr>
//                       <td
//                         valign="top"
//                         rowspan="4"
//                       >
//                         CUSTOMER APPROVAL
//                       </td>
//                       <td
//                         rowspan="4"
//                         valign="top"
//                       >
//                         DATE
//                       </td>
//                       <td
//                         colspan="3"
//                         class="text-center"
//                       >
//                         PART TOTAL
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td colspan="3">
//                         <span class="ml-10">
//                           DISCOUNT %
//                         </span>
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td colspan="3">
//                         <span class="ml-10">
//                           LABOUR HOURS @
//                         </span>
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td colspan="3">
//                         <span class="ml-10">
//                           TRAVEL TIME HOURS @
//                         </span>
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td
//                         valign="top"
//                         rowspan="3"
//                       >
//                         SERVICE ENGINEER
//                       </td>
//                       <td
//                         rowspan="3"
//                         valign="top"
//                       >
//                         DATE
//                       </td>
//                       <td
//                         colspan="3"
//                         class="text-center"
//                       >
//                         SUB TOTAL COST
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td colspan="3">
//                         <span class="ml-10">
//                           PPN %
//                         </span>
//                       </td>
//                       <td />
//                     </tr>
//                     <tr>
//                       <td
//                         colspan="3"
//                         class="text-center"
//                       >
//                         TOTAL COST
//                       </td>
//                       <td />
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div class="row">
//                   <div class="col-4">
//                     ADM = WHITE
//                   </div>
//                   <div class="col-4">
//                     SERVICE = BLUE
//                   </div>
//                   <div class="col-4">
//                     CUSTOMER = YELLOW
//                   </div>
//                 </div>
//               </div>`,
//             //File Name
//             fileName: 'test',
//             //File directory
//             directory: 'docs',
//         };
//         let file = await RNHTMLtoPDF.convert(options);
//         this.setState({ filePath: file.filePath });
//     }


//     render() {
//         return (
//             <View style={styles.MainContainer}>
//                 <TouchableOpacity onPress={this.askPermission.bind(this)}>
//                     <View>
//                         <Image
//                             //We are showing the Image from online
//                             source={{
//                                 uri:
//                                     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
//                             }}
//                             //You can also show the image from you project directory like below
//                             //source={require('./Images/facebook.png')}
//                             style={styles.ImageStyle}
//                         />
//                         <Text style={styles.text}>Create PDF</Text>
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => this._openFile(this.state.filePath)}
//                 >
//                     <Text style={styles.text}>{this.state.filePath.split('docs/')[1]}</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     MainContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2F3E9E',
//         borderWidth: 1,
//         borderColor: '#000',
//     },
//     text: {
//         color: 'white',
//         textAlign: 'center',
//         fontSize: 25,
//         marginTop: 16,
//     },
//     ImageStyle: {
//         height: 150,
//         width: 150,
//         resizeMode: 'stretch',
//     },
// });