import {CameraCapturedPicture, CameraType, CameraView} from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router'; 


export default function CameraScreen(){
  const cameraRef = useRef<CameraView | null>(null);
  let photo: CameraCapturedPicture | null = null;
  const router = useRouter();

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CameraView style={{flex: 1}} ref={cameraRef}>
        
      </CameraView>
      <View style={{backgroundColor: 'black', flex: 0.15, marginTop: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={async () => {
            try{
              if(cameraRef.current){
                photo = await cameraRef.current.takePictureAsync()
                router.push({
                  pathname: '/displayImage',
                  params: {from: 'CameraScreen', uri: photo.uri}
                });
              }
            }
            catch(error) {
              console.log(error)
            }
          }}>
            <View style={{backgroundColor: 'white', height: 70, width: 70, borderRadius: 50 }}>

            </View>
          </Pressable>
        </View>
    </View>
  );
}