'use client'

import {Tree} from "@/utils/models/trees";
import Mapbox, {Popup} from 'react-map-gl'
import {useState} from "react";
import {MapPin} from "@/app/components/Pin";

type MapProps = {
    trees: Tree[]
}
export function Map(props: MapProps) {
const trees = props.trees

    return (
        <>
            <Mapbox
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
                {trees.map((tree, index) => <MapPin tree={tree} index={index} key={index}/>)}

            </Mapbox>
        </>
    )
}