import React from "react";
import { Pressable, View } from "react-native";
import { Text, StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { useCameraPermissions } from "expo-camera";
import { useRouter } from 'expo-router';
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";



type UploadIconProps = {
  onPress: () => void,
  label: string
}

type ModalIconProps = {
  onPress: () => void,
  name: React.ComponentProps<typeof AntDesign>['name'];
  label: string
}

/* Custom component for the upload button on the center of Home Screen*/
const UploadIcon = ({onPress, label}: UploadIconProps) => {
  return(
 //   <View style={{backgroundColor: 'black', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={onPress}>
        <View style={{borderRadius: 15, height: 200, width: 200 , backgroundColor: '#663399', alignItems: 'center', justifyContent: "center"}}>
          <AntDesign name="upload" size={70} color="#fff"/>
          <Text style={{borderTopWidth: 10, borderBlockColor: '#663399', color: 'white', fontFamily: 'Arial'}}>{label}</Text>
        </View>
      </Pressable> 
//   </View>
  )
}

/* Custom component for the file upload options that appear in the modal on the bottom of the home screen*/
const ModalIcon = ({onPress, name, label}: ModalIconProps) => {
  let s = 40
  let m = 10
  if (name==='addfile'){
    s = 35
    m = 15
  }
  return(
    <Pressable onPress={onPress}>
      <View style={{backgroundColor:'#2F2F2F', borderRadius: 10, height: 80, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <AntDesign name={name} size={s} color={'white'}/>
        <Text style={{color: 'white', fontFamily: 'Arial', marginTop: m}}>{label}</Text>
      </View>
    </Pressable>
  )

}




export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [permission, requestPermission] = useCameraPermissions();
  const [status, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
  const router = useRouter();

  let file : string | null = null;
  

  return(
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={{backgroundColor: 'black', flex: 0.8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <UploadIcon 
          onPress={() => setModalVisible(true)}
          label="Upload File"
        />
      </View>
      <View style={{backgroundColor: 'black', flex: 0.2}}>
        <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        >
          <View style={{backgroundColor: '#262626', flex: 0.2, width: '100%', marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 15}}>
            <ModalIcon
              onPress={() => {
                
                while(!permission){
                  continue;
                }
                if (!permission.granted){
                  requestPermission(); 
                }
                if(permission.granted){
                  router.push('/cameraScreen');
                }
              }}
              name='camera'
              label='Camera'
            />
            <ModalIcon
              onPress={async () => {
                while(!status){
                  continue;
                }
                if(!status.granted){
                  requestLibraryPermission();
                }
                if (status.granted){
                  try{
                    let result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: 'images',
                      allowsEditing: true,
                      quality: 1
                    });
                    if(!result.canceled){
                      file = result.assets[0].uri;
                      console.log(file)
                      const response = await FileSystem.uploadAsync("http://172.20.10.3:8000/upload", file, {
                        httpMethod: 'POST',
                        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                        fieldName: 'file'
                      });
                    }
                  }
                  catch(error: unknown) {
                    if (error instanceof Error){
                      console.error(error.message)
                    }
                    else{
                      console.error("An unknown error occured", error);
                    }
                  };
                }    
                
              }}
              name='picture'
              label='Photo'
            />
            <ModalIcon
              onPress={async () => {
                let result = await DocumentPicker.getDocumentAsync();
                if (!result.canceled){
                  file = result.assets[0].uri;
                  console.log(typeof file)
                  const response = await FileSystem.uploadAsync("http://172.20.10.3:8000/upload", file, {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'file'
                  })
                }
              }}
              name='addfile'
              label='File'
            />
          </View>
        </Modal>
      </View>
    </View>

  );
}





