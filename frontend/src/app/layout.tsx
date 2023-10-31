import type { Metadata } from 'next'
import './global.css'


export const metadata: Metadata = {
    title: 'Title Goes Here',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html data-theme="light" lang="en">
        <body>{children}</body>
        </html>
    )
}