import React from "react";
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator,BottomTabBar } from "@react-navigation/bottom-tabs";
import Dishes from "../dishes";

import restaurant from '../restaurant.png';
import search from '../transparency.png';
import like from '../like.png';
import user from '../user.png';
import Svg,{Path} from 'react-native-svg';

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({accessibilityState,children,onPress})=>{
   var isSelected = accessibilityState.selected
   if(isSelected){
   return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                    <Svg
                        width={70}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                             
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        
                 
                        borderBottomWidth:2,
                        borderLeftWidth:1,
                        borderRightWidth:1,
                        borderColor:'transparent',
                        borderBottomColor:'grey',
                        backgroundColor: 'white'
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: 'white'
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const Tabs = ()=>{
    return(
        <Tab.Navigator  screenOptions={{tabBarShowLabel:false,
        style:{borderTopWidth:0,backgroundColor:"transparent",elevation:0} }}
        >
         <Tab.Screen name="restaurant" component={Dishes} 
         options={{
            headerShown:false,
          tabBarIcon:({focused})=>(
           <Image 
            source={restaurant}
            resizeMode='contain'
            style={{
              width:25,
              height:25,
              tintColor: focused? '#FC8019':'grey'
            }}
           />

          ),
          tabBarButton:(props)=>(
            <TabBarCustomButton 
              {...props}
            />
          )

         }}/>
   
   <Tab.Screen name="search" component={Dishes} 
         options={{
            headerShown:false,
          tabBarIcon:({focused})=>(
               <Image 
            source={search}
            resizeMode='contain'
            style={{
              width:25,
              height:25,
              tintColor: focused? '#FC8019':'grey'
            }}
           />
          ),
          tabBarButton:(props)=>(
            <TabBarCustomButton 
              {...props}
            />
          )
         }}/>
   
   <Tab.Screen name="like" component={Dishes} 
         options={{
            headerShown:false,
          tabBarIcon:({focused})=>(
             <Image 
            source={like}
            resizeMode='contain'
            style={{
              width:25,
              height:25,
              tintColor: focused? '#FC8019':'grey'
            }}
           />
          ),
          tabBarButton:(props)=>(
            <TabBarCustomButton 
              {...props}
            />
          )
         }}/>
   
   <Tab.Screen name="user" component={Dishes} 
         options={{
            headerShown:false,
          tabBarIcon:({focused})=>(
             <Image 
            source={user}
            resizeMode='contain'
            style={{
              width:25,
              height:25,
              tintColor: focused? '#FC8019':'grey'
            }}
           />
          ),
          tabBarButton:(props)=>(
            <TabBarCustomButton 
              {...props}
            />
          )
         }}/>
   
        </Tab.Navigator>
    )
}

export default Tabs;