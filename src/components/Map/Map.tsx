import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet";
import type Coordinate from "./coordinate.model.ts";
import {useRef, useState} from "react";
import type {LatLngTuple} from "leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
export default function Map(props: MapProps){
    L.Icon.Default.mergeOptions({
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: shadowUrl,
    });
    const [coordinates, setCoordinates] = useState(props.coordinates);
    const first = coordinates?.[0];
    const CordinateArr: LatLngTuple | undefined = first ? [first.lat, first.lng] : undefined;
    const markerRef = useRef<LeafletMarker>(null);
    return (
        <MapContainer center={CordinateArr?? [41.32853580329582, 19.82266119258898]} zoom={12} scrollWheelZoom={true} style={{height:'500px'}}>
            <TileLayer attribution="React Movies" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {!props.notAllowClicks? <HandleMapClick setCoordinate={cordi=>{
                setCoordinates([cordi])
                if (props.CoordinateProp){
                    props.CoordinateProp(cordi)
                }
            }} /> : undefined}
            {coordinates?.map((coordinate) => <Marker ref={markerRef}  position={[coordinate.lat, coordinate.lng]} key={coordinate.lat + coordinate.lng}>
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