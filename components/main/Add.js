import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function Add({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ flex: 1, marginBottom: 20 }} />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
          // marginLeft: 5,
        }}
      >
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 70,
            height: 40,
            borderWidth: 2,
            borderRadius: 50,
            // justifyContent: "center",
            // paddingVertical: 7,
            // paddingHorizontal: 17,
            // borderRadius: 4,
            // elevation: 13,
            // marginBottom: 6,
            // backgroundColor: "black",
            // // margin: 60,/
            // // marginTop: 10,
            // shadowColor: "#52006A",
            // borderColor: "black",
            // borderRadius: 0,
            // borderWidth: 0.2,
            // width: 30,
            // height: 30,
          }}
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        >
          <Image
            source={{
              uri: "https://static.thenounproject.com/png/59139-200.png",
            }}
            style={{ flex: 1, aspectRatio: 1 / 1 }}
          />
          {/* <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "red",
            }}
          >
            Flip
          </Text> */}
        </Pressable>

        {/* <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
        }}
      ></Button> */}
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 70,
            height: 40,
            borderWidth: 2,
            borderRadius: 50,
            // alignItems: "center",
            // // justifyContent: "center",
            // // paddingVertical: 7,
            // // paddingHorizontal: 17,
            // borderRadius: 4,
            // // elevation: 3,
            // marginBottom: 6,
            // backgroundColor: "white",
            // // margin: 60,/
            // marginTop: 10,

            // shadowColor: "#52006A",
            // borderColor: "black",
            // borderRadius: 0,
            // borderWidth: 0.2,
          }}
          onPress={() => {
            takePicture();
          }}
        >
          <Image
            source={{
              uri: "https://w7.pngwing.com/pngs/187/938/png-transparent-pointing-finger-illustration-pointer-computer-icons-cursor-point-and-click-touch-miscellaneous-text-logo.png",
            }}
            style={{ flex: 1, aspectRatio: 1 / 1 }}
          />
        </Pressable>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 70,
            height: 40,
            borderWidth: 2,
            borderRadius: 50,
            // alignItems: "center",
            // // justifyContent: "center",
            // // paddingVertical: 7,
            // // paddingHorizontal: 17,
            // borderRadius: 4,
            // // elevation: 3,
            // marginBottom: 6,
            // backgroundColor: "white",
            // // margin: 60,/
            // marginTop: 10,

            // shadowColor: "#52006A",
            // borderColor: "black",
            // borderRadius: 0,
            // borderWidth: 0.2,
          }}
          onPress={() => {
            pickImage();
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyRoevcodO52aTsEqIhAeiXFtRrlLfFlPvUmBh5ae1BOCqh2zGxmOpc8rjPKj_DcfLK7g&usqp=CAU",
            }}
            style={{ flex: 1, aspectRatio: 1 / 1 }}
          />
        </Pressable>

        {/* <Button title="Take Picture" onPress={() => takePicture()} /> */}
        {/* <Button title="Upload" onPress={() => pickImage()} /> */}
        {/* <Button
        title="Save"
        onPress={() => navigation.navigate("Save", { image })}
      /> */}
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 70,
            height: 40,
            borderWidth: 2,
            borderRadius: 50,
            // alignItems: "center",
            // // justifyContent: "center",
            // // paddingVertical: 7,
            // // paddingHorizontal: 17,
            // borderRadius: 4,
            // // ele/vation: 3,
            // marginBottom: 6,
            // backgroundColor: "white",
            // // margin: 60,/
            // marginTop: 10,

            // shadowColor: "#52006A",
            // borderColor: "black",
            // borderRadius: 0,
            // borderWidth: 0.2,
          }}
          onPress={() => navigation.navigate("Save", { image })}
        >
          <Image
            source={{
              uri: "https://w7.pngwing.com/pngs/860/512/png-transparent-instagram-social-media-save-instagram-instagram-save-social-media-logo-icon-thumbnail.png",
            }}
            style={{ flex: 1, aspectRatio: 1 / 1 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
