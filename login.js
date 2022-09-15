import React, { useState,useEffect,useRef } from 'react';
import {ScrollView, StyleSheet,View,Text,TextInput,Alert,Animated, Pressable,Image, Dimensions,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import swiggy1 from './swiggy1.png';
import swiggy2 from './swiggy2.webp';
import swiggy3 from './swiggy3.png';
import swiggyblack from './swiggyblack.png'
import Swiggy from './swiggy.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Login({navigation}){
    
    const [name,setname] = useState('');
    const [phone,setphone] = useState('');
      const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Kuching', value: 'Kuching'},
    {label: 'Malay', value: 'Malay'},
    {label:'Carpentner Street' ,value:'Carp.. Street'},
    {label:'Hong san Si Temple' , value:'Hong San Si'}
  ]);

     
    const images=[
       {header:'20% DISCOUNT DIWALI SPECIAL',
        realimage: swiggy1,
        title:" ' Respect your delivery man ' ",
        ad:<View style={{width:350,backgroundColor:'#92A8D1',flexDirection:'row',marginTop:38,height:50,alignItems:'center',justifyContent:'center'}}>
        <Text>Help and support : </Text><Pressable style={{padding:7,borderRadius:3,backgroundColor:'#FC8019',fontWeight:'300'}}>
        <Text style={{textDecorationLine:'underline',color:'white'}}>support@swiggy.in</Text></Pressable>
        </View>
       },
        {header:'Cashback for 1000Rs+ payments',
            realimage: swiggy2,
        title:" ' Shabbu , Ram & team are example of hard work ' ",
           ad:<View style={{width:350,backgroundColor:'#88B04B',flexDirection:'row',marginTop:38,height:50,alignItems:'center',justifyContent:'center'}}>
        <Text>Contact Us 24X7 : </Text><Pressable style={{padding:7,borderRadius:3,backgroundColor:'#FC8019',fontWeight:'300'}}>
        <Text style={{textDecorationLine:'underline',color:'white'}}>+91 806 746 6791</Text></Pressable>
        </View>
       },
        {header:'2000+ Satisfied customers',
            realimage: swiggy3,
        title:" ' Send us feedback on our services ' ",
           ad:<View style={{width:350,backgroundColor:'#DD4124',flexDirection:'row',marginTop:38,height:50,alignItems:'center',justifyContent:'center'}}>
        <Text>Reach us out : </Text><Pressable style={{padding:7,borderRadius:3,backgroundColor:'#FC8019',fontWeight:'300'}}>
        <Text style={{textDecorationLine:'underline',color:'white'}}>www.swiggy.com</Text></Pressable>
        </View>
       },
    ]
    const {width} = Dimensions.get("window");
    
    const height = width/1.2 ;
    const progress = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        console.log(phone,"phone from login")
        getData();
              Animated.timing(progress,{toValue:1,useNativeDriver:false,duration:2000}).start();
         Animated.timing(scale,{toValue:1,useNativeDriver:false,duration:2000}).start();
         
    })
  
 
      const  getData= async()=>{
   try{
   await AsyncStorage.getItem('Username')
    .then(value=>{
        if(value!=null){
          navigation.navigate('dishes')
       
        }
    })
   }
   catch(error){
   console.log(error)
   }
    }
    const setData = async()=>{
        if(name.length<5||phone.length<5){
Alert.alert('Warning!','Please enter all fields with minimum 5 characters ')
        }else{
try {
    await AsyncStorage.setItem('Username',name);
     await AsyncStorage.setItem('Phone','Kuching');
        await AsyncStorage.setItem('CityName',phone);    
    navigation.navigate('dishes',phone);
  
} catch (error) {
    console.log(error)
}
        }
    }





          
    return(
              
        <View style={styles.body} >
     
        <View style={{display:'flex',flexDirection:'row',flex:0.25,marginTop:70}}>
        <Text style={styles.header}>Swiggy Welcomes You  </Text>
        <Image source={Swiggy} style={{width:30,height:30,flex:0.2,marginBottom:50}}/>
        </View>
            <ScrollView
            pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={true}
              style={{width,marginTop:-50,flex:1}}>
{
    images.map((image,index)=>(
      
          <LinearGradient colors={['#FC8019','white','#FC8019' ]} style={{borderRadius:10,margin:6}}>
               <View style={{alignItems:'center',width:width/1.03}}>
             <MaskedView style={{marginTop:10,width:'100%',zIndex:3,backgroundColor:'transparent'}} maskElement={<View style={{alignItems:'center'}}><Text style={styles.heading}>{image.header}</Text></View>}>
                   <LinearGradient colors={['black','#FC8','white' ]} star={{x:0,y:0}} end={{x:1,y:0}} >
               <Text style={{opacity:0,fontWeight:'600',fontSize:18}}>{image.header}  </Text>
</LinearGradient>
             </MaskedView> 
             <Image source={swiggyblack} style={{marginTop:20,height:50,width:30}}></Image>
               <Image
        key={index}
            style={{width:width/1.1,height:height,resizeMode:'contain',marginTop:-45}}
             source={image.realimage}

             />
         
             <Text style={{color:'white',marginTop:-30,fontWeight:'300',textShadowColor:'rgba(0,0,0,0.75)',textShadowOffset:{width:-1,height:1},textShadowRadius:10}}>
                {image.title}
             </Text>
            <View>{image.ad}</View>
            </View>
       </LinearGradient>
      
     ) )
}
              </ScrollView>
           <Animated.View style={{display:'flex',backgroundColor:'#555555',width:'70%',paddingBottom:5,borderRadius:10,  alignItems:'center',
        justifyContent:'center',opacity: progress,transform:[{scale}]}}>
         <TextInput
         
         style={styles.input} placeholder={'Name'}
         onChangeText={(value)=> setname(value)}
          value={name} />
          <View>
        <DropDownPicker
        placeholder='Select Your City'
      open={open}
      value={phone}
      items={items}
      setOpen={setOpen}
      setValue={setphone}
      setItems={setItems}
      style={styles.input}
    />
           </View>  
           <Pressable style={styles.button}
       title='submit' onPress={setData} ><Text style={{color:'white',fontSize:10}}>LOGIN</Text></Pressable>
           </Animated.View>
                  
         </View>
       
    )
}

const styles = StyleSheet.create({
    body:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    input:{
      
    width:'65%',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:10,
    marginTop:10,
    paddingLeft:15,
    elevation:15
    },
    button:{
        marginTop:2,
        width:'auto',
        padding:5,
        borderWidth:1,
        borderRadius:5,
        borderColor:'transparent',
        backgroundColor:'#FC8019',   
    },
    header:{
        fontSize:20,
       
        fontFamily:'monospace',
        fontStyle:'italic',
    },
    heading:{
        fontSize:20,
        
        fontWeight:'300'  ,
    textShadowColor:'black',textShadowOffset:{width:0,height:0},textShadowRadius:2  }
})
