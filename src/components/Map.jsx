import { LocationMarkerIcon } from "@heroicons/react/solid";
import GoogleMapReact from "google-map-react";

const Marker = () => <LocationMarkerIcon className="h-8 w-8 text-red-500" />;

const SimpleMap = ({
  center = { lat: 59.955413, lng: 30.337844 },
  zoom = 11,
  marker,
}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyDP5l-BgagJI-v6pXQlx9Tw7noPi9EybIM" }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Marker {...marker} />
    </GoogleMapReact>
  );
};

export default SimpleMap;
