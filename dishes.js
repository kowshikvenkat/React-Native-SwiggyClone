import React, { useEffect,useState ,useRef} from 'react';
import { Text,View,TouchableOpacity,StatusBar,StyleSheet,Dimensions,Alert,Animated,Image,FlatList,SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Menu,MenuOptions,MenuOption,MenuTrigger,MenuProvider} from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';
import swiggyblack from './swiggyblack.png'
import Swiggy from './swiggy.jpg'
import list from './list.png'
import pexel from './pexels.jpg';
import like from './like.png'
import rice from './rice.jpg'
import noodles from './noodles.jpg';
import salads from './salads.jpg';
import hotdogs from './hotdogs.jpg';
import burgers from './burgers.jpg'
import pizza from './pizza.jpg';
import snacks from './snacks.jpg';
import sushi from './sushi.jpg'
import desserts from './desserts.jpg'
import drinks from './drinks.jpg';
import man from './man.png'
import man2 from './man2.png'
import woman from './woman1.png'
import woman2 from './woman.png';
import fire from './fire.png';
import burger1 from './burgerinner.jpg'
import burger2 from './burgerinner2.jpg'
import burger3 from './burgerinner3.jpg';
import pizza1 from './pizzainner1.jpg';
import pizza2 from './pizzainner2.jpg';
import pizza3 from './pizzainner3.jpg';
import pizza4 from './pizzainner4.jpg';
import hotdogsinner from './hotdogsinner.jpg';
import sushiinerr from './sushiinner.jpg';
import cuisine from './cuisine.jpg';
import cuisine1 from './cuisine1.jpg'
import cuisine2 from './cuisine2.jpg';
import cuisine3 from './cuisine3.jpg';
import cuisine4 from './cuisine4.jpg';
import dessert1 from './dessertsinner1.jpg'
import dessert2 from './desertsinner2.jpg'
import dessert3 from './desertsinner3.jpg'
import gps from './map.png'
export default function Dishes({navigation , route}){
      
    
     const initialCurrentLocation = {
        streetName: "Kuching",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: rice,
        },
        {
            id: 2,
            name: "Noodles",
            icon: noodles,
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: hotdogs,
        },
        {
            id: 4,
            name: "Salads",
            icon: salads,
        },
        {
            id: 5,
            name: "Burgers",
            icon: burgers,
        },
        {
            id: 6,
            name: "Pizza",
            icon: pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: snacks,
        },
        {
            id: 8,
            name: "Sushi",
            icon: sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: desserts,
        },
        {
            id: 10,
            name: "Drinks",
            icon: drinks,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "KFC Burger",
            rating: 4.8,
            opacity:1,
            categories: [5, 7],
            priceRating: affordable,
            photo: burgers,
            duration: "30 - 45 min",
            fontWeight:'800',
            color:'black',
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,

            },
            courier: {
                avatar: woman,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: burger1,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: burger2,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: burger3,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "KFC Pizza",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
               opacity:1,
            photo: pizza,
            duration: "15 - 20 min",
            fontWeight:'800',
            color:'black',
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            courier: {
                avatar: man,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: pizza1,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: pizza2,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: pizza3,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: pizza4,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "PizzaHut Hotdogs",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
               opacity:1,
            photo: hotdogs,
            duration: "20 - 25 min",
            fontWeight:'800',
            color:'black',
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            courier: {
                avatar: man2,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: hotdogsinner,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "Dominoes Sushi",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            fontWeight:'800',
            color:'black',
            photo: sushi,
               opacity:1,
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            courier: {
                avatar: man,
                name: "Ahmad"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: sushiinerr,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "McDonalds Cuisine",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            fontWeight:'800',
            color:'black',
               opacity:1,
            photo: cuisine,
            duration: "15 - 20 min",
            location: {
                latitude: 1.558050496260768,
                longitude: 110.34743759630511,
            },
            courier: {
                avatar: man2,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: cuisine1,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: cuisine2,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: cuisine3,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: cuisine4,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "StarBucks Desserts",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
               opacity:1,
               fontWeight:'800',
            color:'black',
            photo: desserts,
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            courier: {
                avatar: woman2,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: dessert1,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: dessert2,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: dessert3,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    const[itemSelected,setitemSelected] = React.useState([]);
    const[itemSelectedArray,setselecteditemsarray] = React.useState([])
      
            
    function onSelectCategory(category){
        //filtering data
        let restaurantList = restaurantData.filter(a=>a.categories.includes(category.id))
          setRestaurants(restaurantList)
          console.log("this the restaurant selected",restaurants)
        setSelectedCategory(category)

    }


function getCategoryName(id){
    let category = categories.filter(a=>a.id==id)

    if(category.length>0){
        return category[0].name
    }else{
        return ""
    }
        
}

    const[name,setname]= useState('')
    const[newphone,setnewphone]=useState('')
    const[showMenu,setshowMenu] = useState(false)
      useEffect(()=>{
       getData()
             
  
     },[])
    useFocusEffect(()=>{
        getData()
       renderMainCategories()
       renderRestaurantList()
   
    })
const offset = useRef(new Animated.Value(-200)).current;

const getData= async()=>{
   try{
    
   await AsyncStorage.getItem('Username')
    .then(value=>{
        if(value!=null){
           setname(value)
           
        }
    })
    await AsyncStorage.getItem('CityName')
    .then(value=>{
        if(value!=null){
           setnewphone(value)
           
        }
    })
   }
   catch(error){
   console.log(error)
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


const update = async()=>{
            navigation.navigate('update')
        }
        const navigatetorestaurant = async()=>{
            navigation.navigate('restaurant')
        }
         const {width} = Dimensions.get("window");
    
    const height = width/1.2 ;
   
        const stylelogin = StyleSheet.create({
        body:{
            display:'flex',
            justifyContent:'flex-start',
           
            flex:1,
            
        },
        header:{
            height:'10%',
            backgroundColor:'#fc8019',
            position:'relative',
            marginTop:StatusBar.currentHeight+10,
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            flexDirection:'row'
                          
        },
        headerText:{
        fontWeight:'700',
        fontSize:20,
        marginLeft:3,
        marginRight:10,
        color:'white'
        },
        drawer:{
            flexGrow:1,
            position:'absolute',
            top:StatusBar.currentHeight+10,
            bottom:0,
            left:0,
            borderTopRightRadius:10,
            borderBottomRightRadius:10,
            backgroundColor:'white',
            width:'50%',
            transform:[{translateX:offset}],
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            paddingTop:'10%',
            
        },

    })
    function orderAndNavigate(it){
         if(itemSelectedArray.length>=0 && !itemSelectedArray.includes(it)){
            setselecteditemsarray(abcd =>[...abcd,it])
        console.log("This is the item",it)

       
 setitemSelected(prevnumber =>[...prevnumber,restaurantData[it-1]])
    
    }
    }

     console.log("this is mapped",itemSelected)
     console.log("this is no of items",itemSelectedArray)
    function renderRestaurantList(){
function stylingitem(it){
     if(itemSelectedArray.length>=0 && !itemSelectedArray.includes(it)){
       it.opacity=0.4     
            it.name=it.name+" Selected" 
            it.color="green"
            it.fontWeight="400"
      }
 }
        
        const renderItem = ({item})=>(
            <>
            <TouchableOpacity  style={{marginBottom:5,marginVertical:20,}} onLongPress={()=>{
                 stylingitem(item)
                orderAndNavigate(item.id);
             
              }}>
             <View>
                <Image source={item.photo} resizeMode="cover" style={{
                    width:"100%",height:150,borderRadius:20,marginBottom:12,borderRadius:10,opacity:item.opacity
                }} />
                <View
                 style={{position:'absolute',bottom:10,height:50,width:100,backgroundColor:'white',
                 borderTopRightRadius:10,borderBottomLeftRadius:10,alignItems:'center',justifyContent:'center',
                 }}>
        <Text style={{opacity:item.opacity}}>{item.duration}</Text>
                 </View>
             </View>
             <Text style={{fontWeight:'bold',marginBottom:10,color:item.color,fontWeight:item.fontWeight}}>{item.name}</Text>
  
  <View style={{
    marginTop:5,
    flexDirection:'row'
  }}>
    <Image source={like} style={{height:20,width:20,tintColor:'red',marginRight:10}}/>
    <Text style={{}}>{item.rating}</Text>
    <View style={{flexDirection:'row',marginLeft:10}}>{item.categories.map((categoryId)=>{
        return(
            <View style={{flexDirection:"row"}} key={categoryId}>
<Text>{getCategoryName(categoryId)}</Text>
<Text style={{color:'grey',bottom:3,marginHorizontal:5}}> . </Text>
            </View>
        )
    })}
    {
        [1,2,3].map((priceRating)=>(
            <Text key={priceRating} style={{color:(priceRating<=item.priceRating) ? 'black' :'grey'}}>$</Text>
        ))
    }
    </View>
  </View>

            </TouchableOpacity>
             
            </>
            
        )
return(
    <ScrollView contentContainerStyle={{alignItems:'center'}}>
    <FlatList 
        data={restaurants}
        keyExtractor={item=>`${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
            width,
            paddingHorizontal:10,
            paddingBottom:5,
            
        }}
    />
    <TouchableOpacity style={{backgroundColor:'#FC8019',height:40,width:width-100,marginVertical:50,alignItems:'center',justifyContent:'center',borderRadius:10,flexDirection:'row'}}
   onPress={()=>{
    if(itemSelected.length>0){
    navigation.navigate('restaurantbook',{itemSelected,currentLocation})
    }else{
           Alert.alert("Please select a food to order")
    }
    } 
    
   }
    >
    <Text style={{fontFamily:'monospace'}}>P L A C E  O R D E R</Text>
    <Image source={swiggyblack} resizeMode="contain" style={{width:25,height:25,borderRadius:20,marginLeft:10}} />
    </TouchableOpacity>
    </ScrollView>
)

    }
    function renderMainCategories(){
        const renderItem =({item})=>{
            return(
                <TouchableOpacity style={{padding:10,paddingBottom:2,backgroundColor:(selectedCategory?.id==item.id)?'#FC8019':'white',
alignItems:'center',marginRight:5,borderRadius:20,width:70}}
        onPress={()=>onSelectCategory(item)}>
              <View style={{width:50,height:50,borderRadius:25,alignItems:'center',justifyContent:'center',backgroundColor:(selectedCategory?.id==item.id)?'white':'transparent'}}>
              <Image source={item.icon} resizeMode="contain" style={{width:50,height:50,borderRadius:20}}/>
              </View>
              <Text style={{marginTop:12,padding:0,marginBottom:10,color:'white',fontSize:10,color:(selectedCategory?.id==item.id)?'white':'black'}}>{item.name}</Text>
                </TouchableOpacity>
            
        )
            }
        return(
            <View style={{padding:2,marginLeft:0}}>
                <Text style={{fontWeight:'bold',fontSize:20,marginLeft:2}}>Main</Text>
                        <Text style={{fontWeight:'bold',fontSize:20,marginLeft:2}}>Categories</Text>

                        <FlatList
                        data={categories}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        keyExtractor={item=>`${item.id}`}
                        renderItem={renderItem}
                        contentContainerStyle ={{padding:2}}
                         />
            </View>
        )
    } 

    return(
   


<>
<ImageBackground source={pexel} resizeMode="cover" style={stylelogin.body} imageStyle={{opacity:0.5}} >
<View style={stylelogin.header}>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:0.4,marginLeft:5}}>
    <Image source={man} resizeMode="contain" style={{width:30,height:30}} />
    <Text style={stylelogin.headerText}>{name}</Text>
</View>
<View style={{flexDirection:'row',flex:0.4,alignItems:'center'}}>
<Image source={gps} resizeMode="cover" style={{width:20,height:30,marginBottom:8,marginRight:4}} />
<Text style={{fontSize:15,color:'white',}}>{newphone}</Text>
</View>
<TouchableOpacity onPress={()=>{
    Animated.timing(offset,{
        toValue:0,
        useNativeDriver:true,
        duration:300
    })
    
    .start()
}} >
<View style={[stylelogin.headerText,{textAlign:'center',alignItems:'center'}]}>
<Image source={list} style={{width:25,height:25,tintColor:'black'}} resizeMode='contain' />
<Text style={{marginTop:0,fontSize:12,color:'white',fontWeight:'800'}}>Account</Text>
</View>
</TouchableOpacity>
</View>

       

       {renderMainCategories()}
       <View style={{borderBottomColor:'grey',borderBottomWidth:1,marginTop:5}}></View>
       {renderRestaurantList()}
   </ImageBackground>
   <Animated.View style={stylelogin.drawer}>
   <View style={{width:"100%"}}><TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>{
      Animated.timing(offset,{
        toValue:-200,
        useNativeDriver:true,
        duration:300
    })
    .start()
   
   }}><Text style={{paddingRight:20,paddingBottom:10,fontSize:20}}> X </Text></TouchableOpacity>
       <TouchableOpacity style={{backgroundColor:'#1F75FE',width:'100%',alignItems:'center',padding:'2%'}} onPress={update}><Text>Update</Text></TouchableOpacity></View>
       <TouchableOpacity style={{margin:10,backgroundColor:'red',width:'100%',alignItems:'center',padding:5}} 
       title='DELETE' onPress={removeData} ><Text>Logout</Text></TouchableOpacity>
   </Animated.View>
</>
    )
    

}
