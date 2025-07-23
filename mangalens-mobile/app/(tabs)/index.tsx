import React from "react";
import { Pressable, View } from "react-native";
import { Text, Button} from "react-native";
import { AntDesign } from '@expo/vector-icons';


export default function HomeScreen() {
  return(
    <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={() => console.log("Button pressed")}>
        <View style={{borderRadius: 15, height: 200, width: 200, backgroundColor: '#663399', alignItems: 'center', justifyContent: "center"}}>
          <AntDesign name="upload" size={70} color="#fff"/>
          <Text style={{borderTopWidth: 10, borderBlockColor: '#663399', color: 'white', fontFamily: 'Arial'}}>Upload File</Text>
        </View>
      </Pressable>
    </View>
  );
}

