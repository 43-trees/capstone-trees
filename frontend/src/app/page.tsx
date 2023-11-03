'use client'
import {NavBarOut} from "@/app/components/NavBarOut";
import {NavBarIn} from "@/app/components/NavBarIn";
import Map from 'react-map-gl'
import {Pin} from "@/app/components/Pin";
import {useState} from "react";

export default function Home() {

    const [points] = useState([
        { lat: 35.332, lng: -106.652 },
        { lat: 35.339, lng: -106.656 },
        { lat: 35.40, lng: -106.666 },
        { lat: 35.23, lng: -106.4444 }
    ])

    console.log(process.env["NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"])
    return (
        <>
            <NavBarOut/>


            <Map
                initialViewState={{
                    latitude: 35.126561,
                    longitude: -106.602690,
                    zoom: 9
                }}
                mapboxAccessToken={process.env["NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"]}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/jderaad/cloire14b003b01qsbhjp5r7i"
                // mapbox://styles/jderaad/cloire14b003b01qsbhjp5r7i
            >
                {points.map((point, index) => <Pin lat={point.lat} lng={point.lng} index={index} key={index}/>)}
            </Map>
        </>
    )
}