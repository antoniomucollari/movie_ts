import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet";
import type Coordinate from "./coordinate.model.ts";
import {useState} from "react";

export default function Map(props: MapProps){
    const [coordinates, setCoordinates] = useState<Coordinate[] | undefined>(props.coordinates);
    return (
        <MapContainer center={[41.32932371556236, 19.761665860502337]} zoom={14} scrollWheelZoom={true} style={{height:'500px'}}>
            <TileLayer attribution="React Movies" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            <HandleMapClick setCoordinate={coordinate=>{
                setCoordinates([coordinate])
                if (props.CoordinateProp){
                    props.CoordinateProp(coordinate)
                }
            }} />
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
}