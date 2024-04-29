'use client'
import Booking from "@/components/Booking/Booking";
import MapBox from "@/components/Map/MapBox";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";

import { UserLocationContext } from "@/context/UserLocationContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [userLocation,setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>([]);
  const [DestinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directionData, setDirecrtionData] = useState<any>([]);
  const [carAmount, setCarAmount ] = useState<any>();
 
  useEffect(()=>{
    getUserLocation();
  },[])

  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude}
      )
      // console.log(userLocation,"hello");
      
    })
  }
  return (
   <div>
     <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <SourceCordiContext.Provider value={{sourceCordinates,setSourceCordinates}}>
        <DestinationCordiContext.Provider value={{DestinationCordinates,setDestinationCordinates}}>
          <DirectionDataContext.Provider value={{directionData,setDirecrtionData}}>
            <SelectCarAmountContext.Provider value={{carAmount , setCarAmount}}>
   <div className="grid grid-cols-1 md:grid-cols-3 ">
    <div>
      <Booking/>
    </div>
    <div className="col-span-2">
    <MapBox/>
    </div>

   </div>
   </SelectCarAmountContext.Provider>
   </DirectionDataContext.Provider>
   </DestinationCordiContext.Provider>
   </SourceCordiContext.Provider>
   </UserLocationContext.Provider>
   </div>
  );
}

