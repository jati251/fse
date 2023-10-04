import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosx from 'axios';
import { baseURL } from '../../config';
import { Alert, ToastAndroid, Linking } from 'react-native';
// import RNBackgroundDownloader from 'react-native-background-downloader';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';
// import Clipboard from '@react-native-community/clipboard';

// const urgentURL = ''
// const baseURL = urgentURL
const axios = axiosx.create({
  timeout: 7000,
});


const _retrieveData = async (param) => {
  try {
    const value = await AsyncStorage.getItem(param);
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export function setLoading(loader) {
  return dispatch => {
    dispatch({
      type: 'SET_LOADING',
      payload: loader,
    });
  };
}

export function login(getdata) {
  return dispatch => {
    return new Promise((res, rej) => {
      axios({
        method: 'POST',
        data: {
          username: getdata.username.toLowerCase().trim(),
          password: getdata.password,
          client_id: 2,
          client_secret: 'ezz3jgmISz5GoMKZe4aiQSgrQQWRTltN2f7F44Bh',
          grant_type: 'password',
        },
        url: `${baseURL}oauth/token`,
      })
        .then(({ data }) => {
          AsyncStorage.setItem('access_token', data.access_token);
          AsyncStorage.setItem('refresh_token', data.refresh_token);
          return axios({
            method: 'GET',
            url: baseURL + 'getUser',
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });
        })
        .then(({ data }) => {
          dispatch({
            type: 'SET_USER',
            payload: data,
          });
          AsyncStorage.setItem('logged-user', JSON.stringify(data));
          res();
        })
        .catch(err => {
          console.log('ini errornya');
          console.log(err);
          rej(err);
        });
    });
  };
}

export function getTaskWaiting() {
  // console.log('keepanggil')
  return dispatch => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    _retrieveData('access_token')
      .then(async token => {
        try {
          let { data } = await axios({
            method: 'GET',
            url: baseURL + `mobile/v2/task/waiting/user`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log('ini data ask waiting', data)
          dispatch({
            type: 'TASK_WAITING',
            payload: data.data,
          });
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        } catch (error) {
          if (error.isAxiosError && !error.response) {
            ToastAndroid.show('No Internet Connection', ToastAndroid.BOTTOM);
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
          } else {
            Alert.alert(`Season Expired, please logout and re-login`);
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// menentukan selectedTask
export function setSelectedTask(param) {
  // console.log('gak kepanggil', param);
  // console.log('ini param dari action', param)
  return dispatch => {
    dispatch({
      type: 'SET_SELECTED_TASK',
      payload: param,
    });
  };
}

export function setSelectedInstrument(param) {
  return dispatch => {
    dispatch({
      type: 'SET_SELECTED_INSTRUMENT',
      payload: param,
    });
  };
}

export function getOfflineUser() {
  return dispatch => {
    _retrieveData(`logged-user`)
      .then(data => {
        if (data) {
          // console.log('ini kepanggil pas langsung login', data)
          dispatch({
            type: 'SET_USER',
            payload: JSON.parse(data),
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function logout() {
  return dispatch => {
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('refresh_token');
    AsyncStorage.removeItem('logged-user');
    // AsyncStorage.clear()
    dispatch({
      type: 'CHANGE_LOGIN',
      payload: {
        access_token: null,
        refresh_token: null,
      },
    });
  };
}

export function setNav(nav) {
  return dispatch => {
    dispatch({
      type: 'SET_NAVIGATION',
      payload: nav,
    });
  };
}

// dari waiting mau ke active pakenya function ini
export function postTaskActive(taskID) {
  return dispatch => {
    // console.log('masuk active sini');
    return new Promise((resolve, reject) => {
      _retrieveData('access_token')
        .then(async token => {
          // console.log(token, 'ini token');
          try {
            let { data } = await axios({
              method: 'POST',
              url: baseURL + `mobile/v2/active/task`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                id_task: taskID,
              },
            });
            // console.log('========= ini datanyaaaa', Object.keys(data));
            // console.log('========= watiing to task ini datanyaaaa', data);
            if (data.data.length != 0) {
              let dataActive = await _retrieveData('task-active');
              let dataToSend;
              let parseActive = JSON.parse(dataActive);
              // console.log(parseActive, 'ini dia data activenya')
              if (dataActive) {
                dataToSend = JSON.parse(dataActive).concat(data.data);
              } else {
                dataToSend = data.data;
              }
              // console.log('ini data tosend',Object.keys(dataToSend));
              // console.log('ini data tosend', dataToSend);
              dispatch({
                type: 'TASK_ACTIVE',
                payload: dataToSend,
              });
              AsyncStorage.setItem(`task-active`, JSON.stringify(dataToSend));
              // console.log(' ini data to sendnya', dataToSend)
              resolve(dataToSend);
            } else {
              // console.log('masuk sini karena datanya kosong')
              reject();
            }
          } catch (error) {
            throw error;
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function setAfterClearCache() {
  return dispatch => {
    dispatch({
      type: 'SET_PENDING_FIRST',
      payload: [],
    });
    dispatch({
      type: 'SET_COMPLETE_FIRST',
      payload: [],
    });
  };
}

export function getTaskActive(idLoggedUser) {
  return dispatch => {
    _retrieveData(`task-active`)
      .then(data => {
        let activeData = data ? JSON.parse(data) : [];
        let sentData = activeData.filter((el, i) => {
          return el.idTaskAssign == idLoggedUser;
        });
        // console.log('ini data yang difilter',sentData)
        if (data) {
          dispatch({
            type: 'TASK_ACTIVE',
            payload: sentData,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function setWaitingTask(filteredWaiting) {
  return dispatch => {
    dispatch({
      type: 'TASK_WAITING',
      payload: filteredWaiting,
    });
  };
}

export function setReportService(field, value) {
  return dispatch => {
    let payload = {};
    payload[field] = value;
    // console.log(payload, 'ini payloadnya~~')
    dispatch({
      type: 'SET_REPORT_SERVICE',
      payload: payload,
    });
  };
}

export function initServiceReport(found) {
  return dispatch => {
    // console.log('ini adalah found di action', found)
    dispatch({
      type: 'SET_SERVICE_REPORT',
      payload: found,
    });
  };
}

export function setImage(param) {
  return dispatch => {
    dispatch({
      type: 'SET_IMAGE',
      payload: param,
    });
  };
}

export function setImage2(param) {
  return dispatch => {
    dispatch({
      type: 'SET_IMAGE2',
      payload: param,
    });
  };
}

//mengirim report dari Close Task Wizard
export function sendReport(input, nav) {
  // delete input.report[0].checklist.checklistData
  // console.log('[INI INPUTNYA]', input.report[0].checklist)
  // console.log('[INI CHECKLISTNYA]', x);
  return dispatch => {
    // return console.log('BERHENTI DULU CEK YANG DI SEND');
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    _retrieveData('access_token')
      .then(async token => {
        // console.log('ini token cuk', token);
        try {
          // console.log('masuk sini dulu');
          let { data } = await axios({
            method: 'POST',
            url: `${baseURL}mobile/v2/report/service`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: input,
          });
          // console.log(data, 'ini data pas kirim report');
          return _retrieveData('task-active');
        } catch (error) {
          console.log('ini error pas kirim report', error.message);

          throw JSON.stringify(error);
          //  return Alert.alert(JSON.stringify(error))
        }
        // nav.navigate('Home')
      })
      .then(async data => {
        if (data) {
          // console.log('kedua');
          let dataWant = JSON.parse(data);
          let x = dataWant.filter(el => el.idTask != input.idTask);
          let y = dataWant.find(el => el.idTask == input.idTask);

          AsyncStorage.setItem('task-active', JSON.stringify(x));

          let z = await _retrieveData('task-closed');

          if (z) {
            // console.log('masuk karena di async sudah ada ');
            let parse = JSON.parse(z);
            let newArray = parse.concat([y]);
            AsyncStorage.setItem('task-closed', JSON.stringify(newArray));
            dispatch({
              type: 'TASK_COMPLETE',
              payload: newArray,
            });
            dispatch({
              type: 'TASK_ACTIVE',
              payload: x,
            });
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
            ToastAndroid.show('Task Completed', ToastAndroid.BOTTOM);
            nav.navigate('Home');
          } else {
            // console.log('masuknya kesini karena blom ada asyncnya');
            dispatch({
              type: 'TASK_COMPLETE',
              payload: [y],
            });
            dispatch({
              type: 'TASK_ACTIVE',
              payload: x,
            });
            AsyncStorage.setItem('task-closed', JSON.stringify([y]));
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
            ToastAndroid.show('Task Completed', ToastAndroid.BOTTOM);
            nav.navigate('Home');
          }
        } else {
          Alert.alert('Data Error');
        }
      })
      .catch(err => {
        // Alert.alert('DATA ERROR')
        // console.log('MASUK SINI COK');
        // const Clipboard = require('@react-native-community/clipboard');


        Alert.alert(
          'Oops...',
          'Server Error',
          [
            {
              text: 'COPY Request',
              onPress: () => Clipboard.setString(JSON.stringify(err)),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      });
  };
}

export function setPending(input) {
  return dispatch => {
    dispatch({
      type: 'SET_PENDING',
      payload: input,
    });
    ToastAndroid.show('Task Pending', ToastAndroid.BOTTOM);
  };
}

export function setFirstPending(input) {
  return dispatch => {
    dispatch({
      type: 'SET_PENDING_FIRST',
      payload: input,
    });
  };
}

export function setFirstComplete(input) {
  return dispatch => {
    dispatch({
      type: 'SET_COMPLETE_FIRST',
      payload: input,
    });
  };
}

//untuk fungsi urgent URL
export function inputURL(input) {
  // console.log(input);
  urgentURL = input;
}

export function trigger() {
  return dispatch => {
    dispatch({
      type: 'SET_TRIGGER',
      payload: new Date(),
    });
  };
}

export function downloadPDF(idService, name) {
  // console.log('masuk sini cuk', idService, name);
  return async dispatch => {
    try {
      let token = await _retrieveData('access_token');
      let newName =
        `${idService}_${name.split(' ').join('_')}_${new Date()
          .toLocaleDateString()
          .split('/')
          .join('_')}` || new Date().toString();
      let path = `${RNBackgroundDownloader.directories.documents
        }/${newName}.pdf`;
      // console.log(newName)

      //   console.log(token, 'ini tokenny');

      await RNBackgroundDownloader.download({
        id: 'DP' + new Date(),
        url: `${baseURL}mobile/v2/report/service/pdf?id_service=${idService}`,
        destination: path,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .begin(expectedBytes => {
          console.log(`Going to download ${expectedBytes} bytes!`);
        })
        .progress(percent => {
          console.log(`Downloaded: ${percent * 100}%`);
        })
        .done(() => {
          console.log('Download is done!');
          console.log('[PATH]', path);
          FileViewer.open(path);
        })
        .error(error => {
          console.log('Download canceled due to error: ', error);
        });
    } catch (error) {
      console.log(error, 'ini errnya');
    }
  };
}

function change64_pic(pictures) {
  return new Promise((res, rej) => {
    let newPic = pictures.map(async (elPicture, i) => {
      if (!elPicture.base64) {
        elPicture.base64 = await RNFS.readFile(elPicture.uri, 'base64');
        elPicture.type.includes('/')
          ? (elPicture.type = elPicture.type.split('/')[1])
          : elPicture.type;
      }
      // console.log('ini elPicturenya', elPicture)
      return elPicture;
    });
    res(Promise.all(newPic));
  });
}

//untuk ngeprint data jadi pdf, dikirim ke backend
export function printPDF(input, name) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      _retrieveData('access_token')
        .then(async token => {
          // console.log('pertama======inputnya', token);
          // console.log('pertama======inputnya', input);
          try {
            // console.log('masuk try, mau cek data')
            let sentData = { ...input };
            // console.log('[INI SEND]', sentData);
            if (sentData.problemattachment) {
              if (!Array.isArray(sentData.problemattachment.pictures)) {
                sentData.problemattachment.pictures = JSON.parse(
                  input.problemattachment.pictures,
                );
              }
              if (!Array.isArray(sentData.problemattachment.documents)) {
                sentData.problemattachment.documents = JSON.parse(
                  input.problemattachment.documents,
                );
              }
            }

            // console.log(JSON.stringify(input))

            let { data } = await axios({
              method: 'POST',
              url: `${baseURL}mobile/v2/report/per/service`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: sentData,
            });

            // console.log('ini datanya cok', data);
            // console.log('kedua======ini hasil data yang dibalikinnya', data);

            if (data) {
              // console.log('ketiga======ini sebelum diambil lagi')
              let newName =
                `${input.idService}_${name.split(' ').join('_')}_${new Date()
                  .toLocaleDateString()
                  .split('/')
                  .join('_')}` || new Date().toString();
              let path = `${RNBackgroundDownloader.directories.documents
                }/${newName}.pdf`;

              // console.log('keteiga titik tiga', path)

              await RNBackgroundDownloader.download({
                id: 'file123',
                url: `${baseURL}mobile/v2/report/service/pdf?id_service=${input.idService
                  }`,
                destination: path,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .begin(expectedBytes => {
                  console.log(`Going to download ${expectedBytes} bytes!`);
                })
                .progress(percent => {
                  console.log(`Downloaded: ${percent * 100}%`);
                })
                .done(() => {
                  console.log('Download is done!');
                  ToastAndroid.showWithGravityAndOffset(
                    'Your file has been downloaded !',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
                  resolve(path);
                })
                .error(error => {
                  console.log('Download canceled due to error: ', error);
                  reject(error);
                });
            }
          } catch (error) {
            console.log('[ERROR - TRY I]', error);
            reject(error);
          }
        })
        .catch(error => {
          console.log('[ERROR - TRY II]', error);
          reject(error);
        });
    });
  };
}

//untuk ngeprint data jadi pdf, dikirim ke backend
export function donePerService(input, name) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });
      _retrieveData('access_token')
        .then(async token => {
          // console.log('pertama======inputnya', token);
          // console.log('pertama======inputnya', input);
          try {
            // console.log('masuk try, mau cek data')
            let sentData = { ...input };
            // console.log('[INI SEND]', sentData);
            if (sentData.problemattachment) {
              if (!Array.isArray(sentData.problemattachment.pictures)) {
                sentData.problemattachment.pictures = JSON.parse(
                  input.problemattachment.pictures,
                );
              }
              if (!Array.isArray(sentData.problemattachment.documents)) {
                sentData.problemattachment.documents = JSON.parse(
                  input.problemattachment.documents,
                );
              }
            }

            console.log(JSON.stringify(sentData), 'ini ')

            // return 
            let { data } = await axios({
              method: 'POST',
              url: `${baseURL}mobile/v2/report/per/service`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: sentData,
            });

            // console.log('ini datanya cok', data);
            // console.log('kedua======ini hasil data yang dibalikinnya', data);
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
            resolve(data);
          } catch (error) {
            console.log('[ERROR - TRY I]', error);
            dispatch({
              type: 'SET_LOADING',
              payload: false,
            });
            // reject(error);
            ToastAndroid.show('Data Not Saved to Backend', ToastAndroid.BOTTOM);

          }
        })
        .catch(error => {
          console.log('[ERROR - TRY II]', error);
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
          // reject(error);
          ToastAndroid.show('Data Not Saved to Backend', ToastAndroid.BOTTOM);
        });
    });
  };
}

export function readjustMaxCap(idTask, reportpart) {
  return async dispatch => {
    let taskActive = await AsyncStorage.getItem(`task-active`);
    let found = JSON.parse(taskActive).find(element => {
      return element.idTask === idTask;
    });
    // console.log('ini found awal',found.part.detail)
    // console.log('-----=====-----')
    // console.log('ini report part : ', reportpart)
    found.part.detail.forEach(partDetail => {
      reportpart.forEach(reportPart => {
        if (partDetail.idMaterial == reportPart.idPart) {
          partDetail.qty_approval =
            +partDetail.qty_approval - (+reportPart.qty - +reportPart.pastQty);
          // partDetail.qty_approval = 10
        }
      });
    });
    // console.log('ini found modif',found.part.detail[0])
    let newTaskActive = JSON.parse(taskActive).map(ele => {
      return ele.idTask == found.idTask ? found : ele;
    });
    // console.log('ini new Task active',newTaskActive[0].part.detail)
    dispatch({
      type: 'TASK_ACTIVE',
      payload: newTaskActive,
    });
    AsyncStorage.setItem(`task-active`, JSON.stringify(newTaskActive));
  };
}

export function refresh_selectedTask(input) {
  return dispatch => {
    // console.log('ini refresh_selectedtask', input.selectedTask.part.detail[0]);
    // console.log('ini refresh_selectedtask', input.reportPart);
    let newSelected = input.selectedTask.part.detail.map(elSelected => {
      input.reportPart.forEach(elReport => {
        if (elSelected.idMaterial == elReport.idPart) {
          // console.log('ahay', elSelected.idMaterial)
          elSelected.qty_approval =
            elReport.maxCap -
            elReport.pastQty -
            (elReport.qty - elReport.pastQty);
          input.reportPart[0].maxCap = elSelected.qty_approval;
          // } else {
          //   console.log('something wrong',elSelected.idMaterial)
        }
      });
      return elSelected;
    });
    // console.log('ini newSelectednya', newSelected);
    // console.log('ini report partnya', input.reportPart);
    input.selectedTask.part.detail = newSelected;
    AsyncStorage.setItem(
      `selectedPart-${input.selectedTask.idTask}-${input.idService}`,
      JSON.stringify(input.reportPart),
    );
    dispatch({
      type: 'SET_SELECTED_TASK',
      payload: input.selectedTask,
    });
  };
}

export function sendLocation(idUser, position) {
  return async dispatch => {
    // console.log('ini posiitonnya ya',idUser)
    // console.log('ini posiitonnya ya',position)
    let {
      accuracy,
      altitude,
      bearing,
      latitude,
      longitude,
      provider,
      fused,
      speed,
      time,
    } = position;
    let locationToSend = {
      idTaskAsign: idUser,
      location: {
        latitude,
        longitude,
      },
    };
    try {
      let access_token = await _retrieveData('access_token');
      await axios({
        method: 'POST',
        url: baseURL + 'mobile/v2/postLocation',
        data: locationToSend,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log('berhasil dikirim ke backend');
    } catch (error) {
      console.log('gagal cuy');
      console.log(error);
    }
  };
}

export function versionCheck(idUser, version) {
  return async dispatch => {
    try {
      axios({
        method: 'POST',
        url: baseURL + 'postVersion',
        data: {
          idTaskAsign: idUser,
          version,
        },
      })
        .then(({ data }) => {
          if (data.message === 'Upgrade Version Success' || data.status) {
            let urlResponse = data.linkPath;
            Linking.openURL(urlResponse).catch(err =>
              console.error('An error occurred', err),
            );

          }
        })
        .catch(error => {

          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
}
