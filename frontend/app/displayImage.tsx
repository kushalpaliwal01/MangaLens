import { View, Image, Text} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function displayImage(){
  const params = useLocalSearchParams();
  let uriString : string = "";
  for (let i: number = 0; i<params.uri.length; i++){
    uriString += params.uri[i];
  }
  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Image style={{flex: 1}}
      source={{uri: uriString}}/>
    </View>
  );
  
}