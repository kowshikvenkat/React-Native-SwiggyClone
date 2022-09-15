import React from "react";
import { requireNativeComponent } from "react-native";
import {View,Text,StyleSheet,SafeAreaView,Image,Animated,TouchableOpacity,StatusBar,Dimensions} from "react-native";
import list from '../list.png';
import back from '../back.png'
import Swiggy from '../swiggy.jpg';
import location from '../location.png';
import fire from '../fire.png';
import gps from '../map.png'
import { ScrollView } from "react-native-gesture-handler";
const Restaurant = ({navigation,route})=>{
    const scrollX = new Animated.Value(0);
    const[restaurant,setrestaurant] = React.useState([]);
    const[CurrentLocation,setCurrentLocation] = React.useState(null);
    const[OrderItem,setOrderItem] = React.useState([]);
      const {width} = Dimensions.get("window");
    React.useEffect(()=>{
    let {itemSelected,currentLocation} = route.params;
    setrestaurant(itemSelected)
    setCurrentLocation(currentLocation)

    })
  
    function editOrder(action,menuId,price){
               let orderList = OrderItem.slice()
        let item = orderList.filter(a=>a.menuId == menuId)
       if(action=="+"){
        if(item.length >0){
            let newQty = item[0].qty+1
            item[0].qty = newQty
            item[0].total  = item[0].qty*price
        }else{
            const newItem = {
                menuId:menuId,
                qty:1,
                price:price,
                total:price
            }
            orderList.push(newItem)
        }
        setOrderItem(orderList)
       }else{
           if(item.length>0){
            if(item[0]?.qty >0){
                let newQty = item[0].qty - 1
                item[0].qty = newQty
                item[0].total = newQty*price
            }
           }
           setOrderItem(orderList)
       }
    }

    function getOrderQty(menuId){
          let orderitems = OrderItem.filter(a=>a.menuId == menuId)
          if(orderitems.length>0){
            return orderitems[0].qty
          }else{
            return 0
          }
    }

    function getBasketItemCount(){
        let  itemCount = OrderItem.reduce((a,b)=> a+(b.qty || 0),0)
        return itemCount
    }
    function sumorder(){
        let total = OrderItem.reduce((a,b) => a+(b.total || 0),0)
        return total.toFixed(2)
    }
    function renderHeader(){
        return(
            <View style={{flexDirection:'row',marginTop:StatusBar.currentHeight*1.5}}>
            <TouchableOpacity style={{width:50,justifyContent:'center',padding:10}} onPress={()=>navigation.goBack()}>
<Image source={back} resizeMode="contain" style={{width:50,height:30}} />
            </TouchableOpacity>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
     <View style={{height:50,alignItems:'center',justifyContent:'center',padding:10,borderRadius:25,backgroundColor:'grey'}}>
        <Text style={{fontSize:13,fontWeight:'bold'}}>Place Order</Text>
     </View>
        </View>
        <TouchableOpacity style={{width:50,paddingRight:12,justifyContent:'center',marginRight:10}}>
        <Image source={list} resizeMode="contain" style={{width:50,height:30,tintColor:'#EC0D00'}} />
        </TouchableOpacity>
            </View>
        )
    }
    function renderDots(){
        const dotposition = Animated.divide(scrollX,width)
        return(
     <View style={{height:30,position:'absolute'}}>
<View style={{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:30

}}>{restaurant?.map((item2,index2)=>{
item2?.menu.map((item,index)=>{
           
    const opacity = dotposition.interpolate({
        inputRange:[index-1, index,index + 1],
        outputRange:[0.3,1,0.3],
        extrapolate:'clamp'
    })
    const dotsize = dotposition.interpolate({
      inputRange:[index-1,index,index + 1],
      outputRange:[4,10,4],
      extrapolate:'clamp'  
    })

    const dotcolor= dotposition.interpolate({
        inputRange:[index-1,index,index+1],
        outputRange:['grey','#FC8019','grey'],
        extrapolate:'clamp'
    })
    return(
           <Animated.View key={`dot-${index}`}
           opacity={opacity}
           style={{borderRadius:20,
           marginHorizontal:6,width:dotsize,height:dotsize,backgroundColor:dotcolor}} />


    )
})
})}</View>


     </View>
        )
    }
  

    function renderFoodInfo(){
   
        return(
            <ScrollView>
            { restaurant?.map((items,indexes)=>(
                <>
                <Text style={{position:'relative',left:"22%",fontSize:20,fontWeight:'700',marginTop:10,marginBottom:10}}>{items?.name}</Text>
            <Animated.ScrollView 
            key={`name-${indexes}`}
            horizontal
            pagingEnabled
            scrollEventThrottle={6}
            onScroll={Animated.event([
                {nativeEvent:{contentOffset:{x:scrollX}}}
            ],{useNativeDriver:false})}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{backgroundColor:'white',paddingBottom:10}}
            >
            
       {
        items?.menu.map((item,index)=>(
            <View key={`menu-${index}`}
            style={{alignItems:'center'}}>
                <View style={{height:200,marginTop:30,}}>
                    <Image source={item.photo} resizeMode="cover" style={{width:width-10,borderRadius:10,height:"100%"}} />
                    <View style={{position:'absolute',bottom:1,width,height:50,justifyContent:'center',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>editOrder("-",item.menuId,item.price)} style={{width:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderTopLeftRadius:25,borderBottomLeftRadius:25}}>
                            <Text style={{fontSize:36}}> - </Text>
                        </TouchableOpacity>
                        <View style={{width:30,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:16}}>{getOrderQty(item.menuId)}</Text></View>
                        <TouchableOpacity style={{
                            width:50,
                            backgroundColor:'white',
                            alignItems:'center',
                            justifyContent:'center',
                            borderTopRightRadius:25,
                            borderBottomRightRadius:25
                        }}
                        onPress={()=>editOrder("+",item.menuId,item.price)}>
                         <Text style={{fontSize:26}}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{width,alignItems:'center',marginTop:55,paddingHorizontal:5,}}>

                    <Text style={{marginVertical:10,textAlign:'center',fontSize:20}}>{item.name} - {item.price.toFixed(2)} $</Text>
                    <Text style={{fontSize:20,fontWeight:'100'}}>{item.description}</Text>
                    
                    
                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <Image source={fire} style={{width:20,height:20,marginRight:10}}/>
                    <Text style={{color:'grey'}}>{item.calories.toFixed(2)} cal</Text>
                </View>
            </View>
        ))
       
       }
      
            </Animated.ScrollView>
                </>) )
                } 
    
            </ScrollView>)
    }
    
    function renderOrder(){
        return(
            <View>
                {
          
            renderDots()
           }
                <View style={{backgroundColor:'white',borderTopLeftRadius:40,borderTopRightRadius:40}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,margin:10,paddingVertical:5,borderBottomColor:'grey',borderBottomWidth:1}}>

                        <Text style={{fontSize:20,}}>{getBasketItemCount()} Items in cart</Text>
                               <Text style={{fontSize:20,}}>${sumorder()}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:5,paddingHorizontal:15}}>
                    <View style={{flexDirection:'row'}}>
                    
                    <Image source={location}
                    style={{width:20,height:20,}}
                    resizeMode="contain"
                     />
                     <Text style={{marginLeft:10,fontSize:15}}>{CurrentLocation?.streetName}</Text>
                     </View>

                  <View style={{flexDirection:'row'}}>
                  
                    <Image source={gps} resizeMode='contain' style={{width:20,height:20,}} />
                    <Text style={{marginLeft:10,fontSize:10}}>....7878</Text>
                  </View>
                    </View>
                <View style={{padding:10,alignItems:'center',justifyContent:'center'}}>

                    <TouchableOpacity onPress={()=>{
                        if(getBasketItemCount()>0){
                        navigation.navigate('delivery',{restaurant:restaurant,currentLocation:CurrentLocation})
                        }
                    }} style={{width:200,padding:10,backgroundColor:'#FC8019',alignItems:'center',borderRadius:20}}>
                        <Text style={{color:'white',fontSize:20}}>Order</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
          {renderHeader()}
          {renderFoodInfo()}
          {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'whitesmoke'
    }
})
export default Restaurant;