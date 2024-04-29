import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

const Markers = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } = useContext(SourceCordiContext);
  const { DestinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext);
  
  return (
    <div>
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="/location.png" width={"60px"} />
      </Marker>

      {/* source marker */}
     {sourceCordinates.length != 0? <Marker
        longitude={sourceCordinates?.lng}
        latitude={sourceCordinates?.lat}
        anchor="bottom"
      >
        <img src="/location.png" width={"60px"} />
      </Marker>:null}

      {/* destination marker */}
     
      {DestinationCordinates?.lng && DestinationCordinates?.lat && (
  <Marker
    longitude={DestinationCordinates.lng}
    latitude={DestinationCordinates.lat}
    anchor="bottom"
  ><img src="/location.png" width={"60px"} /></Marker>

)}

    </div>
  );
};

export default Markers;
