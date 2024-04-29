"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MapBox = () => {
  const mapRef = useRef<any>();
  const { userLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { DestinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirecrtionData } = useContext(DirectionDataContext);

  const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
  const MAPBOX_DRIVING_ENDPOINT =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";

  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  useEffect(() => {
    if (DestinationCordinates) {
      mapRef.current?.flyTo({
        center: [DestinationCordinates.lng, DestinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCordinates && DestinationCordinates) {
      getDirectionRoute();
    }
  }, [DestinationCordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCordinates.lng},${sourceCordinates.lat};${DestinationCordinates.lng},${DestinationCordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
        
      {
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);

    setDirecrtionData(result);
  };

  return (
    <div className="p-5 ">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="relative bottom-[47px] z-20 right-[-68.7%] hidden md:block ">
        <DistanceTime/>
      </div>
    </div>
  );
};

export default MapBox;
