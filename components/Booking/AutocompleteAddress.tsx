"use client"

import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import React, { useContext, useEffect, useState } from "react";

const AutocompleteAddress = () => {
  const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
  const MAPBOX_RETRIVE_URL =
    "https://api.mapbox.com/search/searchbox/v1/retrieve";

  const [source, setSource] = useState<any>("");
  const [source1, setSource1] = useState<any>("");
  const [addressList, setAddressList] = useState<any>([]);
  const [addressList1, setAddressList1] = useState<any>([]);
  const { sourceCordinates, setSourceCordinates } = useContext(SourceCordiContext);
const { DestinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext);

  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList(source, setAddressList);
    }, 1000);

    const delayDebounceFn1 = setTimeout(() => {
      getAddressList(source1, setAddressList1);
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
      clearTimeout(delayDebounceFn1);
    };
  }, [source, source1]);

  const getAddressList = async (query: any, setAddressList: any) => {
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await res.json();

    setAddressList(result);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    
      try {
        const res = await fetch(
          `${MAPBOX_RETRIVE_URL}/${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );
        const result = await res.json();
        setSourceCordinates({
          lng: result.features[0].geometry.coordinates[0],
          lat: result.features[0].geometry.coordinates[1],
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      
    }
  };

  const onDestinationAddressClick = async (item: any) => {
    setSource1(item.full_address);
    setAddressList1([]);
    
      try {
        const res = await fetch(
          `${MAPBOX_RETRIVE_URL}/${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );
        const result = await res.json();
        console.log(result);
        setDestinationCordinates({
          lng: result.features[0].geometry.coordinates[0],
          lat: result.features[0].geometry.coordinates[1],
        });
       
      } catch (error) {
        console.log(error);
      }
    
  };

  return (
    <div className="lists">
      <div className="relative">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="bg-white border-[1px] outline-none rounded-md w-full focus:border-yellow-300 p-1"
        />
        {addressList?.suggestions && source.length >= 1 ? (
          <div className="  text-sm p-1 rounded-md bg-white w-full absolute">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                onClick={() => {
                  onSourceAddressClick(item);
                }}
                className="mt-1 hover:bg-slate-100  cursor-pointer"
                key={index}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <label className="text-gray-400 mt-6">Where To?</label>
        <input
          type="text"
          value={source1}
          onChange={(e) => setSource1(e.target.value)}
          className="bg-white border-[1px] outline-none rounded-md w-full focus:border-yellow-300 p-1 mt-3"
        />
        {addressList1?.suggestions && source1.length >= 1 ? (
          <div className="  text-sm p-1 rounded-md bg-white w-full absolute">
            {addressList1?.suggestions.map((item: any, index: number) => (
              <h2
                onClick={() => {
                  onDestinationAddressClick(item);
                  
                }}
                className="mt-1 hover:bg-slate-100  cursor-pointer"
                key={index}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutocompleteAddress;
