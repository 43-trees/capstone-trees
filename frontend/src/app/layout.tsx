import type { Metadata } from 'next'
import './global.css'
import {NavBarIn} from "@/app/components/NavBarIn";
import {Foot} from "@/app/components/Foot";
import 'mapbox-gl/dist/mapbox-gl.css'


export const metadata: Metadata = {
    title: 'Urban Orchard',
    description: 'Fruit tree finder',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html data-theme="light" lang="en">
        <body className="min-h-screen relative">
        <NavBarIn/>
        {children}
        <Foot/>
        </body>
        </html>
    )
}