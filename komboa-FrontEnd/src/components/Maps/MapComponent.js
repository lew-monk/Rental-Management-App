import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCordinates } from "./MapsSlice";

const libraries = ["places"];
const styles = {
  width: "100%",
  height: "380px",
};

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Maps is beign loaded";

  const handleMapClick = async (e) => {
    setMarkers({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const center = {
    lat: -1.286389,
    lng: 36.817223,
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  dispatch(addCordinates(markers));
  return (
    <div>
      <GoogleMap
        mapContainerStyle={styles}
        zoom={11}
        center={center}
        options={options}
        onClick={handleMapClick}
      >
        <Marker position={{ lat: markers.lat, lng: markers.lng }} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
