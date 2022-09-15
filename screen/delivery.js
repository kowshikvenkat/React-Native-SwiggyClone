import React from "react";
import MapViewDirections from "react-native-maps-directions";
import {View,Text,Image,TouchableOpacity,Dimensions} from "react-native";
import MapView,{PROVIDER_GOOGLE,Marker} from "react-native-maps";
import locationpng from '../location.png';
import car from '../car.png'
import GOOGLE_API_KEY from '../maps';
import locationmap from '../locationmap.png'
import { ZoomIn, ZoomOut } from "react-native-reanimated";
const Delivery = ({route,navigation})=>{
     const [Restaurant,setRestaurant] = React.useState(null);
     const [streetName,setstreetName] = React.useState("");
     const [fromLocation,setfromLocation] = React.useState(null)
     const [toLocation,settoLocation] = React.useState(null)
     const [region,setregion] = React.useState(null)
  const {width} = Dimensions.get("window");
  const mapView = React.useRef()
     React.useEffect(()=>{
        let {restaurant,currentLocation} = route.params;
        
        let fromLoc = currentLocation.gps;
        let toLoc = restaurant[0].location;
        let street = currentLocation.streetName;
          console.log(toLoc)
        let mapRegion = {
            latitude:(fromLoc.latitude + toLoc.latitude)/2,
            longitude:(fromLoc.longitude + toLoc.longitude) /2,
            latitudeDelta : Math.abs(fromLoc.latitude - toLoc.latitude) *2,
            longitudeDelta:Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }
        setRestaurant(restaurant[0])
        setstreetName(street)
        setfromLocation(fromLoc)
        settoLocation(toLoc)
        setregion(mapRegion)
     },[])
         function zoomIn(){
        let newRegion ={
            latitude :region.latitude,
            longitude:region.longitude,
            latitudeDelta: region.latitudeDelta/2,
            longitudeDelta:region.longitudeDelta/2
    }
     setregion(newRegion)
     console.log(newRegion)
     mapView.current.animateToRegion(newRegion,200)
}
   function zoomOut(){
        let newRegion ={
            latitude :region.latitude,
            longitude:region.longitude,
            latitudeDelta: region.latitudeDelta*2,
            longitudeDelta:region.longitudeDelta*2
    }
     setregion(newRegion)
     mapView.current.animateToRegion(newRegion,200)
}
    function renderMap(){
        const destinationMarker =() =>(
<Marker coordinate={toLocation}>
<View style={{height:60,width:60,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>

    <View style={{height:40,width:40,borderRadius:15,alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:10}}>Your location</Text>
        <Image source={locationmap} style={{width:25,height:25,}} />
   
    </View>
</View>
</Marker>
        )

        const carIcon = () =>(
            <Marker coordinate={fromLocation} anchor={{x:0.4,y:-0.5}} flat ={true}>
            <Image source={locationmap} style={{width:25,height:25}} />
                    <Image source={car} style={{width:25,height:25}} />
            </Marker>
        )
        return(
            <View style={{flex:1}}>
                <MapView
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                 style={{flex:1}}>
                 <MapViewDirections origin={fromLocation} destination={toLocation} apikey={GOOGLE_API_KEY}
                    strokeWidth={5} strokeColor="#FC8019" optimizeWaypoints={true}
                 />
                  {destinationMarker()}
                  {carIcon()}
                 </MapView>
            </View>
        )
    }

    function renderDestinationHeader(){
        return(
            <View style={{position:'absolute',top:50,left:0,right:0,bottom:0,height:50,alignItems:'center',justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',width:width-50,padding:10,borderRadius:15,backgroundColor:'white'}}>
                    <Image source={locationpng} style={{width:30,height:30,marginRight:10}} />
                    <View style={{flex:1}}>
                        <Text style={{fontSize:15}}>{streetName}</Text>
                    </View>
                    <Text> 7 mins</Text>
                </View>
            </View>
        )
    }
    function renderDeliveryInfo(){
        return(
            <View style={{
                position:'absolute',
                bottom:"5%",
                left:0,right:0,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <View style={{paddingVertical:10,paddingHorizontal:10, width:width-10,borderRadius:10,backgroundColor:'white'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={Restaurant?.courier.avatar} style={{width:50,height:50,borderRadius:25}}/>
                        <View style={{flex:1,marginLeft:10}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontSize:12}}>{Restaurant?.courier.name}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={locationpng} style={{width:18,height:18,tintColor:'#FC8019',marginRight:10}}/>
                                    <Text>{Restaurant?.rating}</Text>

                                </View>
                            </View>
                            <Text style={{color:'grey',fontSize:15}}>{Restaurant?.name}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                        <TouchableOpacity style={{height:50,flex:1,margin:5,backgroundColor:'#FC8019',alignItems:'center',justifyContent:'center',borderRadius:15}}>
                            <Text style={{color:'white'}}>Call</Text>
                        </TouchableOpacity>
                         <TouchableOpacity onPress={()=> navigation.goBack()} style={{height:50,flex:1,margin:5,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius:15}}>
                            <Text style={{color:'white'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

   
    return(
        <View style={{flex:1,}}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
           
        </View>
    )
}
export default Delivery;