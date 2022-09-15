import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState} from 'react';
import {Text,StyleSheet , View,TextInput,TouchableOpacity ,Alert} from 'react-native';


const Home = ({navigation })=>{
       const [name,setname] = useState('');
       const[primaryname,setprimaryname] = useState('');
             const[primaryphone,setprimaryphone] = useState('');
       const[phone,setphone] = useState('');
      const [picker,setpicker] = useState(true)
    useEffect(()=>{
getData()

    },[])
 
        const updateData = async()=>{
        if(primaryname.length<5 || primaryphone.length<5){
Alert.alert('Warning!','Please fill all fields')
        }else{
try {
   
    await AsyncStorage.setItem('Username',primaryname);
    await AsyncStorage.setItem('Phone',primaryphone);
    Alert.alert('Success!','Your data has been updated')
    setname(primaryname)
    setphone(primaryname)
    setpicker(true)
} catch (error) {
    console.log(error)
}
        }
    }
        const removeData = async()=>{
        
try {
    await AsyncStorage.removeItem('Username');
    navigation.navigate('login')
   
} catch (error) {
    console.log(error)
}
        }
    
    const  getData= async()=>{
   try{
   await AsyncStorage.getItem('Username')
    .then(value=>{
        if(value!=null){
           setname(value)
       
        }
    })
      await AsyncStorage.getItem('Phone')
    .then(value=>{
        if(value!=null){
           setphone(value)
          
        }
    })
     
    
   }
   catch(error){
   console.log(error)
   }
    }
    const send = async()=>{
       try{
     
        navigation.navigate('dishes');
       }catch(error){
console.log(error)
       }
    }
    return(
        <View style={styles.body}>
    <Text>welcome {name}!</Text>
                 <TextInput  style={styles.input}
                 placeholder={'E N T E R  N A M E'}
        
            
            onChangeText={(value)=>{if(value.length==0|| value.toUpperCase()==name.toUpperCase()){
                setpicker(true)
            }
            else{
                setprimaryname(value) 
                setpicker(false)
            }} }>
           
          </TextInput>
           <TextInput  style={styles.input}
            placeholder={'E N T E R  P H O N E N O.'}
             keyboardType={'number-pad'}
            onChangeText={(value)=>{
            if(value.length==0){
                setpicker(true)
            }
            else{
                setprimaryphone(value)
                setpicker(false)
            }}}>
           
          </TextInput>
          <View style={{display:'flex',flexDirection:'row'}}>
                <TouchableOpacity style={styles.button}
       title='UPDATE' onPress={updateData} ><Text style={{color:'white'}}>Update</Text></TouchableOpacity>
       {picker && <TouchableOpacity style={styles.button} 
       title='DELETE' onPress={removeData} ><Text style={{color:'white'}}>Logout</Text></TouchableOpacity>}
       {picker && <TouchableOpacity style={[styles.button]}
       title='NAVIGATETOHOME' onPress={send} >
       <Text style={{color:'white'}}>Home</Text></TouchableOpacity>}
       </View>
    
        </View>
    )
}

const styles = StyleSheet.create({
      body:{
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
    paddingLeft:15
    },
    button:{
        padding:5,
        borderRadius:10,
        backgroundColor:'#FC8019',
        width:'auto',
        margin:2
    }
})

export default Home;