'use client'
import {NavBarOut} from "@/app/components/NavBarOut";
import {NavBarIn} from "@/app/components/NavBarIn";
import Map, {Popup} from 'react-map-gl'
import {MapPin} from "@/app/components/Pin";
import {useState} from "react";
import {Tree} from "../../../backend/src/apis/tree/tree.model";


export default function Home() {

    const [points] = useState([
        { lat: 35.332, lng: -106.652 },
        { lat: 35.339, lng: -106.656 },
        { lat: 35.40, lng: -106.666 },
        { lat: 35.23, lng: -106.4444 }
    ])

    const tree: Tree = {
        treeId: "d11dfebd-14bf-4862-babe-c7259624d504",
        treeProfileId: "c92ab4bc-7e4f-479e-b7e8-54d2c2882ae2",
        treeAddress: "1701 Mountain Rd NW, Albuquerque, NM 87104",
        treeEndDate: null,
        treeDate: null,
        treeInfo: "this is an apple tree outside explora",
        treeImage: "https://img.freepik.com/free-vector/isolated-tree-white-background_1308-26130.jpg?w=2000",
        treeLat: 35.09746,
        treeLng: -106.664003,
        treeTitle: "Explora Apples!",
        treeSpecies: "apple"
    }

    return (
        <>
            <div className="flex justify-center">
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
                {points.map((point, index) => <MapPin tree={tree} index={index} key={index}/>)}
            </Map>
            </div>
        </>
    )
}