import {CameraType, CameraView} from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

export default function CameraScreen(){
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView | null>(null);

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CameraView style={{flex: 1}} ref={cameraRef}>
        
      </CameraView>
      <View style={{backgroundColor: 'black', flex: 0.15, marginTop: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={async () => {
            try{
              if(cameraRef.current){
                let photo = await cameraRef.current.takePictureAsync()
                console.log(photo)
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