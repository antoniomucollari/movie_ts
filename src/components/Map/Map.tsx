import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet";
import type Coordinate from "./coordinate.model.ts";
import {useState} from "react";
import type {LatLngTuple} from "leaflet";

export default function Map(props: MapProps){
    const [coordinates, setCoordinates] = useState(props.coordinates);
    console.log(coordinates);
    const CordinateArr: LatLngTuple  | undefined = coordinates?.map((coordinate) => {
        return [coordinate.lat, coordinate.lng];
    })[0];
    return (
        <MapContainer center={CordinateArr?? [41.32853580329582, 19.82266119258898]} zoom={12} scrollWheelZoom={true} style={{height:'500px'}}>
            <TileLayer attribution="React Movies" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {!props.notAllowClicks? <HandleMapClick setCoordinate={cordi=>{
                setCoordinates([cordi])
                if (props.CoordinateProp){
                    props.CoordinateProp(cordi)
                }
            }} /> : undefined}
            {coordinates?.map((coordinate) => <Marker position={[coordinate.lat, coordinate.lng]} key={coordinate.lat + coordinate.lng}>
                {coordinate.message ?  <Popup> {coordinate.message}</Popup> : undefined}
            </Marker>)}
        </MapContainer>
    )
}

function HandleMapClick(props: {setCoordinate(coordinate: Coordinate):void}){
    useMapEvent('click',e=>{
        props.setCoordinate({lat: e.latlng.lat, lng: e.latlng.lng})
    })
    return null
}

interface MapProps {
    coordinates?: Coordinate[];
    CoordinateProp?: (coordinate: Coordinate) => void;
    notAllowClicks?: boolean;
}