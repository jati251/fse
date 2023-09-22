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
//       console.log(this.props.data);
//         let options = {
//             //Content to print
//             html:
//                 `<div style="border:1px">
//                 <table style="width: 100%">
//                     <tr>
//                         <td>
//                            <img
//                                 src="{{ $url_logo }}"
//                                 style="width:200px;height:80px;"
//                                 alt=""
//                             >
//                         </td>
//                         <td style="text-align: left;font-weight:bold;">
//                             <h2>SERVICE REPORT</h2>
//                         </td>
//                         <td style="text-align: right;">
//                             <span style="font-weight: bold;">
//                                 committed to serve better.<br>
//                                 NO: 000001
//                             </span>
//                         </td>
//                     </tr>
//                 </table>
    
//                 <table style="width: 100%;border-collapse: collapse;margin-top:10px;">
//                     <thead>
//                         <tr>
//                             <th
//                                 colspan="2"
//                                 style="text-align: left;width:50%;border-style: double;text-align: center;"
//                             >
//                                 CUSTOMER DATA
//                             </th>
//                             <th
//                                 colspan="4"
//                                 style="text-align: left;width:50%;border-style: double;text-align: center;"
//                             >
//                                 <span style="margin-left:10px;">
//                                     PROBLEM TYPE
//                                 </span>                
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td colspan="2">
//                                 <span style="margin-left:10px;">
//                                     CUSTOMER
//                                 </span>
//                                 <div style="margin-left:20px;">
    
//                                 </div>
//                             </td>
//                             <td>
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         Instrument
//                                     </label>
//                                 </div>
//                             </td>
//                             <td>
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         Accessories
//                                     </label>
//                                 </div>
//                             </td>
//                             <td colspan="2">
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         PM
//                                     </label>
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>  
//                             <td colspan="2">
//                                 <span style="margin-left:10px;">
//                                     ADDRESS
//                                 </span>
//                                 <span style="margin-left:20px;">
//                                     .......
//                                 </span>
//                             </td>
//                             <td>
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         Reagent
//                                     </label>
//                                 </div>
//                             </td>
//                             <td>
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         Other
//                                     </label>
//                                 </div>
//                             </td>
//                             <td colspan="2">
//                                 <div style="margin-left:10px;">
//                                     <input
//                                         type="checkbox"
//                                         style="width: 13px;height: 13px;padding: 0;margin-bottom:12px;vertical-align: bottom;position: absolute;top: -1px;"
//                                     />
//                                     <label style="margin-left:20px;">
//                                         ....
//                                     </label>
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>  
//                             <td colspan="2">
//                                 <span style="margin-left:10px;">
//                                     PHONE / FAX
//                                 </span>
//                                 <span style="margin-left:20px;">
//                                     ........
//                                 </span>
//                             </td>
//                             <td colspan="4">
//                                 <!--  -->
//                             </td>
//                         </tr>
//                         <tr>  
//                             <td valign="top">
//                                 <span style="margin-left:10px;">
//                                     REQUESTED BY
//                                 </span>
//                                 <div style="margin-left:20px;">
                                    
//                                 </div>
//                             </td>
//                             <td>
//                                 REQUESTED TIME
//                             <div>
//                                 DATE : 
//                             </div>
//                             <div>
//                                 TIME :
//                             </div>
//                             </td>
//                             <td colspan="1" valign="top">
//                                 <span style="margin-left:10px;">
//                                     INSTRUMENT
//                                 </span>
//                             </td>
//                             <td colspan="3" valign="top">
//                                 <span style="margin-left:10px;">
//                                     S.W VERSION
//                                 </span>
//                             </td>
//                         </tr>
//                         <tr>  
//                             <td>
//                                 <span style="margin-left:10px;">
//                                     STARTING TIME
//                                 </span>
//                                 <div style="margin-left:10px;">
//                                     DATE : 
//                                 </div>
//                                 <div style="margin-left:10px;">
//                                     TIME :
//                                 </div>
//                             </td>
//                             <td>
//                                 FINISHING TIME
//                                 <div>
//                                     DATE : 
//                                 </div>
//                                 <div>
//                                     TIME :
//                                 </div>
//                             </td>
//                             <td valign="top" colspan="4">
//                                 <span style="margin-left:10px;">
//                                     SERIAL NUMBER
//                                 </span>
//                                 <div style="margin-left:20px;">
//                                     ....
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td
//                                 colspan="2"
//                                 valign="top"
//                             >
//                                 <div style="margin-left:10px;">
//                                     PROBLEM
//                                 </div>                            
//                             </td>
//                             <td
//                                 colspan="4"
//                                 valign="top"
//                             >
//                                 <div style="margin-left:10px;">
//                                     SOLUTION/ACTION
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td
//                                 colspan="2"
//                                 valign="top"
//                                 height="25px"
//                             >
//                                 <div style="margin-left:10px;">
//                                     <table width="100%">
//                                         @for ($i = 1; $i <= 5; $i++)
//                                             <tr>
//                                                 <td>
//                                                     {{ $i }}
//                                                 </td>
//                                             </tr>
//                                         @endfor
//                                     </table>
//                                 </div>
//                             </td>
    
//                             <td
//                                 colspan="4"
//                                 valign="top"
//                                 height="25px"
//                             >
//                                 <div style="margin-left:10px;">
//                                     <table width="100%">
//                                         @for ($i = 1; $i <= 5; $i++)
//                                             <tr>
//                                                 <td>
//                                                     {{ $i }}
//                                                 </td>
//                                             </tr>
//                                         @endfor
//                                     </table>
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td
//                                 colspan="2"
//                                 valign="top"
//                             >
//                                 OBSERVED
//                             </td>
//                             <td
//                                 colspan="4"
//                                 valign="top"
//                             />
//                         </tr>
//                         <tr>
//                             <td
//                                 colspan="2"
//                                 valign="top"
//                                 height="25px"
//                             >
//                                 <div style="margin-left:10px;">
//                                     <table width="100%">
//                                         @for ($i = 1; $i <= 5; $i++)
//                                             <tr>
//                                                 <td>
//                                                     {{ $i }}
//                                                 </td>
//                                             </tr>
//                                         @endfor
//                                     </table>
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td class="text-center">
//                                 PART NO
//                             </td>
//                             <td class="text-center">
//                                 PART DESCRIPTION
//                             </td>
//                             <td class="text-center">
//                                 TYPE
//                             </td>
//                             <td class="text-center">
//                                 QTY
//                             </td>
//                             <td class="text-center">
//                                 PRICE
//                             </td>
//                             <td class="text-center">
//                                 TOTAL
//                             </td>
//                         </tr>
//                         @for ($i = 1; $i <= 5; $i++)
//                         <tr>
//                             <td              
//                                 valign="top"
//                                 height="25px"
//                             />
//                             <td
//                                 valign="top"
//                                 height="25px"
//                             />
//                             <td              
//                                 valign="top"
//                                 height="25px"
//                             />
//                             <td
//                                 valign="top"
//                                 height="25px"
//                             />
//                             <td              
//                                 valign="top"
//                                 height="25px"
//                             />
//                             <td
//                                 valign="top"
//                                 height="25px"
//                             />
//                         </tr>
//                         @endfor
//                         <tr>
//                             <td
//                                 valign="top"
//                                 rowspan="4"
//                             >
//                                 CUSTOMER SIGN
//                             </td>
//                             <td
//                                 rowspan="4"
//                                 valign="top"
//                             >
//                                 DATE
//                             </td>
//                             <td
//                                 colspan="3"
//                                 class="text-center"
//                             >
//                                 PART TOTAL
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td colspan="3">
//                                 <span class="ml-10">
//                                     DISCOUNT %
//                                 </span>
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td colspan="3">
//                                 <span class="ml-10">
//                                     LABOUR HOURS @
//                                 </span>
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td colspan="3">
//                                 <span class="ml-10">
//                                     TRAVEL TIME HOURS @
//                                 </span>
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td
//                                 valign="top"
//                                 rowspan="3"
//                             >
//                                 SERVICE ENGINEER
//                             </td>
//                             <td
//                                 rowspan="3"
//                                 valign="top"
//                             >
//                                 DATE
//                             </td>
//                             <td
//                                 colspan="3"
//                                 class="text-center"
//                             >
//                                 SUB TOTAL COST
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td colspan="3">
//                                 <span class="ml-10">
//                                     PPN %
//                                 </span>
//                             </td>
//                             <td />
//                         </tr>
//                         <tr>
//                             <td
//                                 colspan="3"
//                                 class="text-center"
//                             >
//                                 TOTAL COST
//                             </td>
//                             <td />
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>`,
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