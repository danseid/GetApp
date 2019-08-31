import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";

import * as firebase from "firebase";
import { ScrollView } from "react-native";
import { Button, Overlay } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import UploadProgress from "./components/UploadProgress";

const firebaseConfig = {
  apiKey: "AIzaSyCSRndhSU3BA1fU-lwYhNFH98k_9kPQMpk",
  authDomain: "get-up-early-anna.firebaseapp.com",
  databaseURL: "https://get-up-early-anna.firebaseio.com",
  projectId: "get-up-early-anna",
  storageBucket: "get-up-early-anna.appspot.com",
  messagingSenderId: "877203294978",
  appId: "1:877203294978:web:a834e2de1ef2f985"
};

firebase.initializeApp(firebaseConfig);

const getStatus = async () => {
  const stat =
    (await Permissions.askAsync(Permissions.CAMERA)) &&
    (await Permissions.askAsync(Permissions.CAMERA_ROLL));
  return stat === "granted";
};

const App = () => {
  const [progressVisible, setProgressVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const status = getStatus();
  });

  takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5
    });
    if (!result.cancelled) {
      setProgressVisible(true);
      this.uploadImage(result.uri, "img-" + Date.now())
        .then(() => {
          setProgressVisible(false);
        })
        .catch(error => {
          setProgressVisible(false);
          Alert.alert(error);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    let uploadTask = ref.put(blob);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log(percent)
      setProgress(percent.toFixed(2));
    });
    
    return uploadTask;
  };

  if(progressVisible) return  (<UploadProgress progress={progress}/>);
  else return (
    <View style={styles.container} >
      <ScrollView style={styles.top}>
        <Text>body</Text>
      </ScrollView>
      <View style={styles.bottom}>
        <Button title="Встала!" type="solid" raised onPress={this.takePicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  top: {
    marginTop: 20
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});

export default App;
